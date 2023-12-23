import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error.interface';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const message = `Invalid ${err?.path == '_id' ? 'ID' : err?.path}`;
  const errorMessage = `${err?.value} is not a valid ${
    err?.path == '_id' ? 'ID' : err?.path
  }!`;

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails: err,
  };
};

export default handleCastError;
