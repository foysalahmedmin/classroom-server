class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, messages: string, stack = '') {
    super(messages);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
