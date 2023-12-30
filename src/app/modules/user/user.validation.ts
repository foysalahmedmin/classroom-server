import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    username: z.string({
      invalid_type_error: 'Username must be a string and unique',
      required_error: 'Username is required',
    }),
    email: z
      .string({
        invalid_type_error: 'Email must be a string and email format',
        required_error: 'Email is required',
      })
      .email({ message: 'Email must be email format' }),
    password: z
      .string({
        invalid_type_error:
          'Password must be a sting, strong, and at least 6 characters long',
        required_error: 'Password is required',
      })
      .min(6, { message: 'Password length must be at least 6 characters' })
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s])/.test(value),
        {
          message:
            'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
        },
      ),
    role: z.enum(['user', 'admin'], {
      invalid_type_error: 'Role must be user or admin',
      required_error: 'Role is required',
    }),
  }),
});

export const UserValidations = {
  createUserValidationSchema: userValidationSchema,
};
