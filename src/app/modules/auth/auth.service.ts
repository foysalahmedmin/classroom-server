import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../builder/errors/AppError';
import config from '../../config';
import User from '../user/user.model';
import { TLogin, TUpdatePassword } from './auth.interface';
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
    username: user.username,
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
    jwtPayload,
  };
};

const updatePassword = async (
  userData: JwtPayload,
  payload: TUpdatePassword,
) => {
  const user = await User.isUserExist(userData._id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (
    !(await User.isPasswordMatched(payload?.currentPassword, user?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  }

  if (
    user?.oldPasswords.length > 0 &&
    (await User.isPasswordMatchedWithOldPasswords(
      payload?.currentPassword,
      user?.oldPasswords?.slice(-2),
    ))
  ) {
    throw new AppError(
      400,
      `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${user?.passwordChangedAt})`,
    );
  }

  const hashedNewPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const updatedResult = await User.findByIdAndUpdate(
    userData._id,
    {
      password: hashedNewPassword,
      passwordChangedAt: new Date(),
      $push: { oldPasswords: user.password },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  const result = await User.findById(updatedResult?._id);

  return result;
};

export const AuthServices = {
  loginUser,
  updatePassword,
};
