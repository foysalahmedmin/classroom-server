import { Response } from 'express';
import { TResponse } from '../interface/response.interface';

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data?.statusCode).json(data);
};

export default sendResponse;
