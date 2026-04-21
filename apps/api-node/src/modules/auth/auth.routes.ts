import bcrypt from "bcryptjs";
import { Router } from "express";
import { z } from "zod";

import { authenticate, signAccessToken, type AuthenticatedRequest } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { createOkResponse, ApiError } from "../../lib/http.js";
import { db, pushActivity } from "../../lib/store.js";
import { createId, now } from "../../lib/utils.js";
import { asyncHandler } from "../../lib/async-handler.js";
import type { UserRole } from "../../types/domain.js";

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  role: z.enum(["buyer", "author", "distributor"])
}).superRefine((value, ctx) => {
  if (value.role === "distributor" && !value.businessName?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["businessName"],
      message: "Business name is required for distributor registration."
    });
  }
});

const loginSchema = z.object({
  role: z.enum(["buyer", "author", "distributor"]).optional(),
  email: z.string().email(),
  password: z.string().min(6)
});

function sanitizeUser(userId: string) {
  const user = db.users.find((record) => record.id === userId);
  if (!user) {
    return null;
  }

  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
}

router.post(
  "/register",
  validateBody(registerSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof registerSchema>;
    const normalizedEmail = payload.email.toLowerCase();

    if (db.users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
      throw new ApiError(409, "A user with this email already exists.");
    }

    const createdAt = now();
    const role = payload.role as UserRole;
    const user = {
      id: createId("user"),
      name: payload.name,
      email: normalizedEmail,
      phone: payload.phone,
      role,
      passwordHash: await bcrypt.hash(payload.password, 10),
      status: "active" as const,
      businessName: payload.role === "distributor" ? payload.businessName : undefined,
      discountLevel: payload.role === "distributor" ? 30 : undefined,
      createdAt,
      updatedAt: createdAt
    };

    db.users.unshift(user);
    pushActivity(`New ${role} registered: ${user.name}`);

    const token = signAccessToken(user);
    response.status(201).json(
      createOkResponse(
        {
          token,
          user: sanitizeUser(user.id)
        },
        "User registered successfully.",
      ),
    );
  }),
);

router.post(
  "/login",
  validateBody(loginSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof loginSchema>;
    const normalizedEmail = payload.email.toLowerCase();
    const user = db.users.find((record) => record.email.toLowerCase() === normalizedEmail);

    if (!user || !(await bcrypt.compare(payload.password, user.passwordHash))) {
      throw new ApiError(401, "Invalid email or password.");
    }

    if (payload.role && user.role !== payload.role) {
      throw new ApiError(403, "This account is not registered for the selected login role.");
    }

    if (user.status !== "active") {
      throw new ApiError(403, "This account is not active.");
    }

    response.json(
      createOkResponse(
        {
          token: signAccessToken(user),
          user: sanitizeUser(user.id)
        },
        "Login successful.",
      ),
    );
  }),
);

router.post(
  "/refresh",
  authenticate,
  asyncHandler(async (request: AuthenticatedRequest, response) => {
    const user = request.user;

    if (!user) {
      throw new ApiError(401, "Authentication required.");
    }

    response.json(
      createOkResponse(
        {
          token: signAccessToken(user),
          user: sanitizeUser(user.id)
        },
        "Token refreshed.",
      ),
    );
  }),
);

router.get(
  "/me",
  authenticate,
  asyncHandler(async (request: AuthenticatedRequest, response) => {
    response.json(createOkResponse(sanitizeUser(request.user!.id), "Authenticated user loaded."));
  }),
);

export default router;
