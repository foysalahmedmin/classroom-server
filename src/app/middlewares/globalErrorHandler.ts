import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleCastError from '../errors/handleCastError';
import handleUnauthorizeError from '../errors/handleUnauthorizeError';
import handleZodError from '../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err?.statusCode || 500;
  let message = 'Something went wrong!';
  let errorMessage = err?.message || '';
  let errorDetails = { err };
  let stack = err?.stack || null;

  if (err instanceof ZodError) {
    const modifiedError = handleZodError(err);
    statusCode = modifiedError.statusCode;
    message = modifiedError.message;
    errorMessage = modifiedError.errorMessage;
    errorDetails = modifiedError.errorDetails;
  }

  if (err?.name == 'castError') {
    const modifiedError = handleCastError(err);
    statusCode = modifiedError.statusCode;
    message = modifiedError.message;
    errorMessage = modifiedError.errorMessage;
    errorDetails = modifiedError.errorDetails;
  }

  if (err?.statusCode == 401) {
    const modifiedError = handleUnauthorizeError(err);
    statusCode = modifiedError.statusCode;
    message = modifiedError.message;
    errorMessage = modifiedError.errorMessage;
    errorDetails = modifiedError.errorDetails;
    stack = null;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: config.NODE_ENV === 'development' ? stack : null,
  });
};

export default globalErrorHandler;
