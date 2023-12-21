class AppResponse<T> {
  public success: boolean;
  public statusCode: number;
  public messages?: string;
  public data: T;

  constructor(
    success: boolean,
    statusCode: number,
    message: string = '',
    data: T,
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.messages = message;
    this.data = data;
  }
}

export default AppResponse;
