import { Router } from "express";
import { z } from "zod";

import { asyncHandler } from "../../lib/async-handler.js";
import { ApiError, createOkResponse } from "../../lib/http.js";
import { notifyChannels } from "../../lib/notifications.js";
import { db, pushActivity } from "../../lib/store.js";
import { createId, matchesSearch, now, paginate, toNumber } from "../../lib/utils.js";
import { authenticate, authorize, type AuthenticatedRequest } from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";
import { validateBody } from "../../middleware/validate.js";

const router = Router();

const productSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  authorName: z.string().min(2),
  category: z.string().min(2),
  format: z.enum(["Ebook", "Hard Copy", "Both"]),
  price: z.coerce.number().min(0),
  description: z.string().min(10),
  isbn: z.string().optional(),
  stock: z.coerce.number().min(0),
  featured: z.coerce.boolean().default(false),
  newArrival: z.coerce.boolean().default(false),
  popular: z.coerce.boolean().default(false),
  viewerAccessEnabled: z.coerce.boolean().default(true),
  watermarkEnabled: z.coerce.boolean().default(true)
});

const orderSchema = z.object({
  customerId: z.string().min(2),
  productId: z.string().min(2),
  quantity: z.coerce.number().min(1),
  address: z.string().min(8)
});

const orderUpdateSchema = z.object({
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]).optional(),
  shippingStatus: z.enum(["new-order", "processing", "packed", "shipped", "delivered", "cancelled"]).optional(),
  trackingId: z.string().optional()
});

router.get(
  "/products",
  asyncHandler(async (request, response) => {
    const category = typeof request.query.category === "string" ? request.query.category : undefined;
    const format = typeof request.query.format === "string" ? request.query.format : undefined;
    const search = typeof request.query.search === "string" ? request.query.search : undefined;
    const filtered = db.products
      .filter((item) => (!category ? true : item.category === category))
      .filter((item) => (!format ? true : item.format === format || item.format === "Both"))
      .filter((item) => matchesSearch([item.title, item.authorName, item.category], search));

    response.json(createOkResponse(filtered, "Products loaded."));
  }),
);

router.get(
  "/products/featured",
  asyncHandler(async (_request, response) => {
    response.json(createOkResponse(db.products.filter((item) => item.featured), "Featured products loaded."));
  }),
);

router.get(
  "/products/:id",
  asyncHandler(async (request, response) => {
    const record = db.products.find((item) => item.id === request.params.id) ?? db.products.find((item) => item.slug === request.params.id);
    if (!record) {
      throw new ApiError(404, "Product not found.");
    }
    response.json(createOkResponse(record, "Product loaded."));
  }),
);

router.post(
  "/orders",
  validateBody(orderSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof orderSchema>;
    const product = db.products.find((item) => item.id === payload.productId);

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    if (product.stock < payload.quantity) {
      throw new ApiError(400, "Insufficient stock for this product.");
    }

    product.stock -= payload.quantity;

    const createdAt = now();
    const record = {
      id: createId("order"),
      customerId: payload.customerId,
      productId: payload.productId,
      quantity: payload.quantity,
      address: payload.address,
      paymentStatus: "pending" as const,
      shippingStatus: "new-order" as const,
      createdAt,
      updatedAt: createdAt
    };

    db.orders.unshift(record);
    pushActivity(`New order placed for ${product.title}`);
    await notifyChannels({
      title: "New store order",
      message: `Order ${record.id} created for ${product.title}`
    });

    response.status(201).json(createOkResponse(record, "Order created."));
  }),
);

router.use("/orders", authenticate);

router.get(
  "/orders",
  asyncHandler(async (request: AuthenticatedRequest, response) => {
    const page = toNumber(request.query.page, 1);
    const limit = toNumber(request.query.limit, 10);

    const data =
      request.user?.role === "buyer"
        ? db.orders.filter((item) => item.customerId === request.user!.id)
        : db.orders;

    response.json(createOkResponse(paginate(data, page, limit), "Orders loaded."));
  }),
);

router.get(
  "/orders/:id",
  asyncHandler(async (request: AuthenticatedRequest, response) => {
    const record = db.orders.find((item) => item.id === request.params.id);
    if (!record) {
      throw new ApiError(404, "Order not found.");
    }

    if (request.user?.role === "buyer" && record.customerId !== request.user.id) {
      throw new ApiError(403, "You cannot access this order.");
    }

    response.json(createOkResponse(record, "Order loaded."));
  }),
);

router.get(
  "/ebook-access/:productId",
  asyncHandler(async (request: AuthenticatedRequest, response) => {
    const product = db.products.find((item) => item.id === request.params.productId || item.slug === request.params.productId);
    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    const hasPurchased = db.orders.some(
      (order) => order.customerId === request.user?.id && order.productId === product.id && order.paymentStatus === "paid",
    );

    const allowedRoles = ["author", "super-admin", "admin", "sub-admin"];
    const accessGranted = product.viewerAccessEnabled && (hasPurchased || allowedRoles.includes(request.user?.role ?? ""));

    response.json(
      createOkResponse(
        {
          accessGranted,
          watermarkEnabled: product.watermarkEnabled,
          message: accessGranted ? "Secure reader session granted." : "Purchase or administrative access required."
        },
        "Ebook access evaluated.",
      ),
    );
  }),
);

router.use(authenticate, authorize("super-admin", "admin", "sub-admin", "store-manager"));

router.post(
  "/products",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "ebookFile", maxCount: 1 }
  ]),
  validateBody(productSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof productSchema>;
    const files = request.files as Record<string, Express.Multer.File[]> | undefined;
    const createdAt = now();
    const record = {
      id: createId("product"),
      ...payload,
      coverImage: files?.coverImage?.[0] ? `/uploads/${files.coverImage[0].filename}` : undefined,
      ebookFile: files?.ebookFile?.[0] ? `/uploads/${files.ebookFile[0].filename}` : undefined,
      createdAt,
      updatedAt: createdAt
    };
    db.products.unshift(record);
    pushActivity(`New store product added: ${record.title}`);
    response.status(201).json(createOkResponse(record, "Product created."));
  }),
);

router.patch(
  "/products/:id",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "ebookFile", maxCount: 1 }
  ]),
  validateBody(productSchema.partial()),
  asyncHandler(async (request, response) => {
    const record = db.products.find((item) => item.id === request.params.id);
    if (!record) {
      throw new ApiError(404, "Product not found.");
    }
    const files = request.files as Record<string, Express.Multer.File[]> | undefined;
    Object.assign(record, request.body, {
      coverImage: files?.coverImage?.[0] ? `/uploads/${files.coverImage[0].filename}` : record.coverImage,
      ebookFile: files?.ebookFile?.[0] ? `/uploads/${files.ebookFile[0].filename}` : record.ebookFile,
      updatedAt: now()
    });
    response.json(createOkResponse(record, "Product updated."));
  }),
);

router.delete(
  "/products/:id",
  asyncHandler(async (request, response) => {
    const index = db.products.findIndex((item) => item.id === request.params.id);
    if (index === -1) {
      throw new ApiError(404, "Product not found.");
    }
    const [record] = db.products.splice(index, 1);
    response.json(createOkResponse(record, "Product deleted."));
  }),
);

router.patch(
  "/orders/:id",
  validateBody(orderUpdateSchema),
  asyncHandler(async (request, response) => {
    const record = db.orders.find((item) => item.id === request.params.id);
    if (!record) {
      throw new ApiError(404, "Order not found.");
    }
    Object.assign(record, request.body, { updatedAt: now() });
    pushActivity(`Order updated: ${record.id}`);
    response.json(createOkResponse(record, "Order updated."));
  }),
);

export default router;
