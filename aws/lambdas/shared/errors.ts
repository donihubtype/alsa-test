export interface MiddlewareError extends Error {
  status: number
}

export const httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TIMEOUT: 408,
  INTERNAL_SERVER_ERROR: 500,
  REDIRECT: 302,
}

export class BadRequestError extends Error implements MiddlewareError {
  readonly status: number
  constructor(message: string) {
    super(message)
    this.status = httpStatusCodes.BAD_REQUEST
  }
}

export class NotFoundError extends Error implements MiddlewareError {
  readonly status: number
  constructor(message: string) {
    super(message)
    this.status = httpStatusCodes.NOT_FOUND
  }
}

export class InternalServerError extends Error implements MiddlewareError {
  readonly status: number
  constructor(message: string) {
    super(message)
    this.status = httpStatusCodes.INTERNAL_SERVER_ERROR
  }
}

export class UnauthorizedError extends Error implements MiddlewareError {
  readonly status: number
  constructor(message: string) {
    super(message)
    this.status = httpStatusCodes.UNAUTHORIZED
  }
}
