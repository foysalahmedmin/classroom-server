export type TResponse<T> = {
  success: boolean;
  statusCode: number;
  messages?: string;
  data: T;
};
