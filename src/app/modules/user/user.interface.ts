import { Model, Types } from 'mongoose';

export interface TUser {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  oldPasswords: string[];
  role: 'user' | 'admin';
  isDeleted?: boolean;
}

export interface TUserModel extends Model<TUser> {
  isUserExist(_id: string): Promise<TUser>;
  isUserExistByUsername(username: string): Promise<TUser>;
  isPasswordMatched(password: string, hashedPassword: string): Promise<boolean>;
  isPasswordMatchedWithOldPasswords(
    password: string,
    hashedOldPasswords: string[],
  ): Promise<boolean>;
  isJWTIssuedBeforeChangedPassword(
    passwordChangedTimestamp: Date,
    JWTIssuedTimestamp: number,
  ): Promise<boolean>;
}
