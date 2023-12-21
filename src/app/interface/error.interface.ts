export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails: Record<string, unknown>;
};

export type TErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails: Record<string, unknown>;
  stack?: string | null | undefined;
};
