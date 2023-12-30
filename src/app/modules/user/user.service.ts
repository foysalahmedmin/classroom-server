import { TUser } from './user.interface';
import User from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const createdResult = await User.create(payload);
  const result = await User.findById(createdResult._id);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
