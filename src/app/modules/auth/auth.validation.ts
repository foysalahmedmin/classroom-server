import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({
      invalid_type_error: 'Username must be a string',
      required_error: 'Username is required',
    }),
    password: z
      .string({
        invalid_type_error:
          'Password must be sting, strong and minimum 6 character',
        required_error: 'Password is required',
      })
      .min(6, { message: 'Password length must be minimum 6' }),
  }),
});

const updatePasswordValidationSchema = z.object({
  body: z
    .object({
      currentPassword: z
        .string({
          invalid_type_error:
            'Current Password must be sting, strong and minimum 6 character',
          required_error: 'Current Password is required',
        })
        .min(6, { message: 'Current Password length must be minimum 6' })
        .refine((value) => /^A-Z/.test(value), {
          message: 'Must be use !,@,#,$,%,^,& or * in current password',
        }),
      newPassword: z
        .string({
          invalid_type_error:
            'New password must be sting, strong and minimum 6 character',
          required_error: 'New Password is required',
        })
        .min(6, { message: 'New Password length must be minimum 6' })
        .refine((value) => /^A-Z/.test(value), {
          message: 'Must be use !,@,#,$,%,^,& or * in new password',
        }),
    })
    .refine((value) => value.currentPassword !== value.newPassword, {
      message: 'New password must be unique',
    }),
});

export const AuthValidations = {
  loginValidationSchema,
  updatePasswordValidationSchema,
};
