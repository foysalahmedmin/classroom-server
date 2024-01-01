import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../builder/errors/AppError';
import config from '../config';
import { TUserRole } from '../interface/middleware.interface';
import User from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You do not have the necessary permissions to access this resource.',
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { _id, email, role, iat, exp } = decoded;

    const user = await User.isUserExist(_id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    if (
      user?.passwordChangedAt &&
      (await User.isJWTIssuedBeforeChangedPassword(
        user.passwordChangedAt,
        iat as number,
      ))
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You do not have the necessary permissions to access this resource.',
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You do not have the necessary permissions to access this resource.',
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
