import { RequestHandler } from 'express';

const notFound: RequestHandler = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: 'API not found!',
    errorMessage: `${req.originalUrl} is not found!`,
    errorDetails: {},
  });
};

export default notFound;
