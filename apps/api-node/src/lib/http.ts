export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function createOkResponse<T>(data: T, message = "Request completed successfully.") {
  return {
    success: true,
    message,
    data
  };
}
