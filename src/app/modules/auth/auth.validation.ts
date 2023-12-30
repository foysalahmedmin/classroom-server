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
          'Password must be a sting, strong, and at least 6 characters long',
        required_error: 'Password is required',
      })
      .min(6, { message: 'Password length must be at least 6 characters' }),
  }),
});

const updatePasswordValidationSchema = z.object({
  body: z
    .object({
      currentPassword: z
        .string({
          invalid_type_error:
            'Current Password must be a sting, strong, and at least 6 characters long',
          required_error: 'Current Password is required',
        })
        .min(6, {
          message: 'Current Password length must be at least 6 characters',
        })
        .refine(
          (value) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s])/.test(value),
          {
            message:
              'Current password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
          },
        ),
      newPassword: z
        .string({
          invalid_type_error:
            'New password must be a sting, strong, and at least 6 characters long',
          required_error: 'New Password is required',
        })
        .min(6, {
          message: 'New Password length must be at least 6 characters',
        })
        .refine(
          (value) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s])/.test(value),
          {
            message:
              'New password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
          },
        ),
    })
    .refine((value) => value.currentPassword !== value.newPassword, {
      message: 'New password must be unique',
    }),
});

export const AuthValidations = {
  loginValidationSchema,
  updatePasswordValidationSchema,
};
