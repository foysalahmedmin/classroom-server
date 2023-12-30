import { TGenericErrorResponse } from '../interface/error.interface';

const handleUnauthorizeError = (err: any): TGenericErrorResponse => {
  const statusCode = 401;
  const message = `Unauthorized Access`;
  const errorMessage = `You do not have the necessary permissions to access this resource.`;

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails: null,
  };
};

export default handleUnauthorizeError;
