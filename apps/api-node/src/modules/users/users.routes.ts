import bcrypt from "bcryptjs";
import { Router } from "express";
import { z } from "zod";

import { asyncHandler } from "../../lib/async-handler.js";
import { ApiError, createOkResponse } from "../../lib/http.js";
import { db, pushActivity } from "../../lib/store.js";
import { matchesSearch, now, paginate, toNumber, createId } from "../../lib/utils.js";
import { authenticate, authorize } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import type { UserRecord, UserRole } from "../../types/domain.js";

const router = Router();

const writeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.custom<UserRole>(),
  status: z.enum(["active", "pending", "disabled"]).default("active"),
  password: z.string().min(6).optional(),
  businessName: z.string().optional(),
  discountLevel: z.coerce.number().optional()
});

const updateSchema = writeSchema.partial();

function sanitizeUser(user: UserRecord) {
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
}

router.use(authenticate, authorize("super-admin", "admin", "sub-admin"));

router.get(
  "/",
  asyncHandler(async (request, response) => {
    const role = typeof request.query.role === "string" ? request.query.role : undefined;
    const status = typeof request.query.status === "string" ? request.query.status : undefined;
    const search = typeof request.query.search === "string" ? request.query.search : undefined;
    const page = toNumber(request.query.page, 1);
    const limit = toNumber(request.query.limit, 10);

    const filtered = db.users
      .filter((user) => (!role ? true : user.role === role))
      .filter((user) => (!status ? true : user.status === status))
      .filter((user) => matchesSearch([user.name, user.email, user.phone], search))
      .map(sanitizeUser);

    response.json(createOkResponse(paginate(filtered, page, limit), "Users loaded."));
  }),
);

router.get(
  "/:id",
  asyncHandler(async (request, response) => {
    const user = db.users.find((record) => record.id === request.params.id);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    response.json(createOkResponse(sanitizeUser(user), "User loaded."));
  }),
);

router.post(
  "/",
  validateBody(writeSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof writeSchema>;

    if (db.users.some((user) => user.email === payload.email)) {
      throw new ApiError(409, "A user with this email already exists.");
    }

    const createdAt = now();
    const user: UserRecord = {
      id: createId("user"),
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
      passwordHash: await bcrypt.hash(payload.password ?? "password123", 10),
      status: payload.status,
      businessName: payload.businessName,
      discountLevel: payload.discountLevel,
      createdAt,
      updatedAt: createdAt
    };

    db.users.unshift(user);
    pushActivity(`User created from admin panel: ${user.name}`);

    response.status(201).json(createOkResponse(sanitizeUser(user), "User created."));
  }),
);

router.patch(
  "/:id",
  validateBody(updateSchema),
  asyncHandler(async (request, response) => {
    const user = db.users.find((record) => record.id === request.params.id);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    const payload = request.body as z.infer<typeof updateSchema>;
    Object.assign(user, payload, {
      updatedAt: now()
    });

    if (payload.password) {
      user.passwordHash = await bcrypt.hash(payload.password, 10);
    }

    pushActivity(`User updated: ${user.name}`);
    response.json(createOkResponse(sanitizeUser(user), "User updated."));
  }),
);

router.post(
  "/:id/reset-password",
  asyncHandler(async (request, response) => {
    const user = db.users.find((record) => record.id === request.params.id);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    user.passwordHash = await bcrypt.hash("password123", 10);
    user.updatedAt = now();
    pushActivity(`Password reset for ${user.email}`);

    response.json(createOkResponse({ temporaryPassword: "password123" }, "Password reset successfully."));
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (request, response) => {
    const user = db.users.find((record) => record.id === request.params.id);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    user.status = "disabled";
    user.updatedAt = now();
    pushActivity(`User disabled: ${user.email}`);

    response.json(createOkResponse(sanitizeUser(user), "User disabled."));
  }),
);

export default router;
