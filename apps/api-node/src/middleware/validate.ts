import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";

import { ApiError } from "../lib/http.js";

export function validateBody(schema: ZodTypeAny) {
  return (request: Request, _response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      return next(new ApiError(400, result.error.issues.map((issue) => issue.message).join(", ")));
    }

    request.body = result.data;
    return next();
  };
}
