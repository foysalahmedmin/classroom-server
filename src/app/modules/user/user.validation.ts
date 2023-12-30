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
          'Password must be sting, strong and minimum 6 character',
        required_error: 'Password is required',
      })
      .min(6, { message: 'Password length must be minimum 6' })
      .refine((value) => /^A-Z/.test(value), {
        message: 'Must be use !,@,#,$,%,^,& or * in password',
      }),
    role: z.enum(['user', 'admin'], {
      invalid_type_error: 'Role must be user or admin',
      required_error: 'Role is required',
    }),
  }),
});

export const UserValidations = {
  createUserValidationSchema: userValidationSchema,
};
