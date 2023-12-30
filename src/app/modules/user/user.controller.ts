import AppResponse from '../../builder/responses/AppResponse';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await UserServices.createUserIntoDB(payload);

  sendResponse(
    res,
    new AppResponse(true, 201, 'User registered successfully', result),
  );
});

export const UserControllers = {
  createUser,
};
