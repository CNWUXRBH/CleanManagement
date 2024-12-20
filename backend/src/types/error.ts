export class AppError extends Error {
  constructor(
    public statusCode: number,
    public status: string,
    public message: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, 'fail', message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, 'fail', message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(401, 'fail', message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(403, 'fail', message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, 'fail', message);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(500, 'error', message);
  }
}

export interface ErrorResponse {
  status: string;
  message: string;
  stack?: string;
} 