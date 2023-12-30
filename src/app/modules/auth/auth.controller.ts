import AppResponse from '../../builder/responses/AppResponse';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken, jwtPayload } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(
    res,
    new AppResponse(true, 200, 'User login successful', {
      user: jwtPayload,
      token: accessToken,
    }),
  );
});

const updatePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.updatePassword(req.user, req.body);

  sendResponse(
    res,
    new AppResponse(true, 200, 'Password changed successfully', result),
  );
});

export const AuthController = {
  loginUser,
  updatePassword,
};
