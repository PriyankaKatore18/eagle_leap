import { Router } from "express";
import { z } from "zod";

import { asyncHandler } from "../../lib/async-handler.js";
import { ApiError, createOkResponse } from "../../lib/http.js";
import { notifyChannels } from "../../lib/notifications.js";
import { db, pushActivity } from "../../lib/store.js";
import { createId, matchesSearch, now, paginate, toNumber } from "../../lib/utils.js";
import { authenticate, authorize } from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";
import { validateBody } from "../../middleware/validate.js";
import type { ContactRecord } from "../../types/domain.js";

const router = Router();

const publishRequestSchema = z.object({
  fullName: z.string().min(2),
  mobile: z.string().min(10),
  email: z.string().email(),
  bookTitle: z.string().min(2),
  numberOfPages: z.coerce.number().min(1),
  language: z.string().optional(),
  bookType: z.string().min(2),
  selectedPackage: z.string().min(2),
  message: z.string().optional()
});

const publishStatusSchema = z.object({
  status: z.enum(["new", "contacted", "in-discussion", "payment-pending", "in-process", "completed"])
});

const printingSchema = z.object({
  name: z.string().min(2),
  organization: z.string().optional(),
  mobile: z.string().min(10),
  serviceType: z.string().min(2),
  quantity: z.coerce.number().min(1),
  message: z.string().optional()
});

const printingStatusSchema = z.object({
  status: z.enum(["new", "quoted", "approved", "in-production", "delivered"])
});

const contactSchema = z.object({
  source: z.enum(["contact", "publish-my-book", "call-for-paper", "printing"]).default("contact"),
  name: z.string().min(2),
  email: z.string().email().optional(),
  mobile: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional()
});

const contactUpdateSchema = z.object({
  status: z.enum(["new", "contacted", "closed"]).optional(),
  notes: z.string().optional()
});

router.post(
  "/publish-requests",
  upload.single("manuscript"),
  validateBody(publishRequestSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof publishRequestSchema>;
    const createdAt = now();
    const record = {
      id: createId("publish"),
      ...payload,
      manuscriptFile: request.file ? `/uploads/${request.file.filename}` : undefined,
      status: "new" as const,
      createdAt,
      updatedAt: createdAt
    };

    db.publishRequests.unshift(record);
    db.contacts.unshift({
      id: createId("lead"),
      source: "publish-my-book",
      name: payload.fullName,
      email: payload.email,
      mobile: payload.mobile,
      subject: payload.bookTitle,
      message: payload.message,
      status: "new",
      createdAt,
      updatedAt: createdAt
    });

    pushActivity(`New book enquiry received for ${payload.bookTitle}`);
    await notifyChannels({
      title: "New book publishing enquiry",
      message: `${payload.fullName} submitted "${payload.bookTitle}"`,
      emailTo: payload.email,
      whatsappNumber: payload.mobile
    });

    response.status(201).json(createOkResponse(record, "Publish book enquiry created."));
  }),
);

router.post(
  "/printing-enquiries",
  upload.single("attachment"),
  validateBody(printingSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof printingSchema>;
    const createdAt = now();
    const record = {
      id: createId("printing"),
      ...payload,
      attachmentFile: request.file ? `/uploads/${request.file.filename}` : undefined,
      status: "new" as const,
      createdAt,
      updatedAt: createdAt
    };

    db.printingEnquiries.unshift(record);
    db.contacts.unshift({
      id: createId("lead"),
      source: "printing",
      name: payload.name,
      mobile: payload.mobile,
      subject: payload.serviceType,
      message: payload.message,
      status: "new",
      createdAt,
      updatedAt: createdAt
    });

    pushActivity(`New printing enquiry received from ${payload.name}`);
    await notifyChannels({
      title: "New printing enquiry",
      message: `${payload.name} requested ${payload.serviceType}`,
      whatsappNumber: payload.mobile
    });

    response.status(201).json(createOkResponse(record, "Printing enquiry created."));
  }),
);

router.post(
  "/contacts",
  validateBody(contactSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof contactSchema>;
    const createdAt = now();
    const record: ContactRecord = {
      id: createId("contact"),
      ...payload,
      status: "new",
      createdAt,
      updatedAt: createdAt
    };

    db.contacts.unshift(record);
    pushActivity(`Contact lead received from ${payload.name}`);

    await notifyChannels({
      title: "New contact lead",
      message: `${payload.name} submitted a ${payload.source} enquiry.`,
      emailTo: payload.email,
      whatsappNumber: payload.mobile
    });

    response.status(201).json(createOkResponse(record, "Contact lead created."));
  }),
);

router.use(authenticate, authorize("super-admin", "admin", "sub-admin", "publication-manager", "accounts-admin-support"));

router.get(
  "/publish-requests",
  asyncHandler(async (request, response) => {
    const page = toNumber(request.query.page, 1);
    const limit = toNumber(request.query.limit, 10);
    const status = typeof request.query.status === "string" ? request.query.status : undefined;
    const search = typeof request.query.search === "string" ? request.query.search : undefined;

    const filtered = db.publishRequests.filter((item) => (!status ? true : item.status === status)).filter((item) =>
      matchesSearch([item.fullName, item.bookTitle, item.email, item.mobile], search),
    );

    response.json(createOkResponse(paginate(filtered, page, limit), "Publish requests loaded."));
  }),
);

router.patch(
  "/publish-requests/:id",
  validateBody(publishStatusSchema),
  asyncHandler(async (request, response) => {
    const record = db.publishRequests.find((item) => item.id === request.params.id);
    if (!record) {
      throw new ApiError(404, "Publish request not found.");
    }
    record.status = (request.body as z.infer<typeof publishStatusSchema>).status;
    record.updatedAt = now();
    pushActivity(`Publish request updated: ${record.bookTitle}`);
    response.json(createOkResponse(record, "Publish request updated."));
  }),
);

router.get(
  "/publish-requests-export",
  asyncHandler(async (_request, response) => {
    response.json(
      createOkResponse(
        db.publishRequests.map((item) => ({
          id: item.id,
          name: item.fullName,
          email: item.email,
          mobile: item.mobile,
          bookTitle: item.bookTitle,
          status: item.status
        })),
        "Publish requests export prepared.",
      ),
    );
  }),
);

router.get(
  "/printing-enquiries",
  asyncHandler(async (request, response) => {
    const page = toNumber(request.query.page, 1);
    const limit = toNumber(request.query.limit, 10);
    const search = typeof request.query.search === "string" ? request.query.search : undefined;

    const filtered = db.printingEnquiries.filter((item) =>
      matchesSearch([item.name, item.organization, item.mobile, item.serviceType], search),
    );

    response.json(createOkResponse(paginate(filtered, page, limit), "Printing enquiries loaded."));
  }),
);

router.patch(
  "/printing-enquiries/:id",
  validateBody(printingStatusSchema),
  asyncHandler(async (request, response) => {
    const record = db.printingEnquiries.find((item) => item.id === request.params.id);
    if (!record) {
      throw new ApiError(404, "Printing enquiry not found.");
    }
    record.status = (request.body as z.infer<typeof printingStatusSchema>).status;
    record.updatedAt = now();
    pushActivity(`Printing enquiry updated: ${record.name}`);
    response.json(createOkResponse(record, "Printing enquiry updated."));
  }),
);

router.get(
  "/contacts",
  asyncHandler(async (request, response) => {
    const page = toNumber(request.query.page, 1);
    const limit = toNumber(request.query.limit, 10);
    const source = typeof request.query.source === "string" ? request.query.source : undefined;
    const search = typeof request.query.search === "string" ? request.query.search : undefined;

    const filtered = db.contacts
      .filter((item) => (!source ? true : item.source === source))
      .filter((item) => matchesSearch([item.name, item.email, item.mobile, item.subject], search));

    response.json(createOkResponse(paginate(filtered, page, limit), "Contact leads loaded."));
  }),
);

router.patch(
  "/contacts/:id",
  validateBody(contactUpdateSchema),
  asyncHandler(async (request, response) => {
    const record = db.contacts.find((item) => item.id === request.params.id);
    if (!record) {
      throw new ApiError(404, "Contact lead not found.");
    }

    Object.assign(record, request.body, {
      updatedAt: now()
    });

    response.json(createOkResponse(record, "Contact lead updated."));
  }),
);

export default router;
