import bcrypt from 'bcrypt';
import mongoose, { Query, Schema } from 'mongoose';
import config from '../../config';
import { TUser, TUserModel } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, min: 6, required: true, select: 0 },
    passwordChangedAt: { type: Date, select: 0 },
    oldPasswords: { type: [String], select: 0 },
    role: { type: String, enum: ['user', 'admin'], min: 6, required: true },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.pre(/^find/, function (this: Query<TUser, Document>, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function () {
  this.pipeline().unshift({
    $match: { isDeleted: { $ne: true } },
  });
});

userSchema.statics.isUserExist = async function (_id: string) {
  return await User.findById(_id).select(
    '+password +passwordChangedAt +oldPasswords',
  );
};

userSchema.statics.isUserExistByUsername = async function (username: string) {
  return await User.findOne({ username: username }).select(
    '+password +passwordChangedAt +oldPasswords',
  );
};

userSchema.statics.isPasswordMatched = async function (
  password: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(password, hashedPassword);
};

userSchema.statics.isPasswordMatchedWithOldPasswords = async function (
  password: string,
  hashedOldPasswords: string[],
) {
  for (let i = 0; i < hashedOldPasswords.length; i++) {
    if (await bcrypt.compare(password, hashedOldPasswords[i])) {
      return true;
    }
  }
  return false;
};

userSchema.statics.isJWTIssuedBeforeChangedPassword = async function (
  passwordChangedTimestamp: Date,
  JWTIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > JWTIssuedTimestamp;
};

const User = mongoose.model<TUser, TUserModel>('User', userSchema);

export default User;
