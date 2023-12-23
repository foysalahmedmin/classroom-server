import { ZodError } from 'zod';
import { TGenericErrorResponse } from '../interface/error.interface';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Validation Error';
  let errorMessage = '';
  err.issues.forEach((el) => {
    errorMessage = `${errorMessage}${el.message}. `;
  });

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails: err,
  };
};

export default handleZodError;
