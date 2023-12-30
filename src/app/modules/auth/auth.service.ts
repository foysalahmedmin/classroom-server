import httpStatus from 'http-status';
import AppError from '../../builder/errors/AppError';
import config from '../../config';
import User from '../user/user.model';
import { TLogin } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLogin) => {
  const user = await User.isUserExistByUsername(payload.username);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  }

  const jwtPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_secret_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};
