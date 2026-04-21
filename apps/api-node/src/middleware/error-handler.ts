import type { NextFunction, Request, Response } from "express";
import multer from "multer";

import { ApiError } from "../lib/http.js";

export function notFoundHandler(_request: Request, _response: Response, next: NextFunction) {
  next(new ApiError(404, "The requested API resource was not found."));
}

export function errorHandler(error: unknown, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof multer.MulterError) {
    return response.status(400).json({
      success: false,
      message: error.message
    });
  }

  if (error instanceof ApiError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message
    });
  }

  const fallback = error instanceof Error ? error.message : "Unexpected server error.";

  return response.status(500).json({
    success: false,
    message: fallback
  });
}
