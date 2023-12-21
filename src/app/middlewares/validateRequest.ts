import { RequestHandler } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (validationSchema: AnyZodObject) => {
  const validator: RequestHandler = async (req, res, next) => {
    try {
      await validationSchema.parseAsync({ body: req.body });
      next();
    } catch (err) {
      next(err);
    }
  };

  return validator;
};

export default validateRequest;
