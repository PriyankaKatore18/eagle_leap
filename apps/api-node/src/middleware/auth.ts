import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { db } from "../lib/store.js";
import { ApiError } from "../lib/http.js";
import type { UserRecord, UserRole } from "../types/domain.js";

export type AuthenticatedRequest = Request & {
  user?: UserRecord;
};

type TokenPayload = {
  userId: string;
  role: UserRole;
};

export function signAccessToken(user: UserRecord) {
  const payload: TokenPayload = {
    userId: user.id,
    role: user.role
  };

  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d"
  });
}

export function authenticate(request: AuthenticatedRequest, _response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return next(new ApiError(401, "Authorization token is required."));
  }

  try {
    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    const user = db.users.find((record) => record.id === payload.userId);

    if (!user || user.status !== "active") {
      return next(new ApiError(401, "Invalid or inactive user."));
    }

    request.user = user;
    return next();
  } catch {
    return next(new ApiError(401, "Invalid or expired token."));
  }
}

export function authorize(...roles: UserRole[]) {
  return (request: AuthenticatedRequest, _response: Response, next: NextFunction) => {
    if (!request.user) {
      return next(new ApiError(401, "Authentication is required."));
    }

    if (!roles.includes(request.user.role)) {
      return next(new ApiError(403, "You do not have access to this resource."));
    }

    return next();
  };
}
