import { Types } from 'mongoose';
export interface TLogin {
  username: string;
  password: string;
}

export interface TUpdatePassword {
  currentPassword: string;
  newPassword: string;
}

export interface TJwtPayload {
  _id: Types.ObjectId;
  email: string;
  role: 'user' | 'admin';
}
