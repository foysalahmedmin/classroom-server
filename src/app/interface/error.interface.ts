export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails: any;
};

export type TErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails: any;
  stack?: string | null | undefined;
};
