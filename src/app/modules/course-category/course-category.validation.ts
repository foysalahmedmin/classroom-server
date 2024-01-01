import { z } from 'zod';

const courseCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
      required_error: 'Name is required',
    }),
  }),
});

const updateCourseCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string',
      })
      .optional(),
  }),
});

export const CourseCategoryValidations = {
  createCourseCategoryValidationSchema: courseCategoryValidationSchema,
  updateCourseCategoryValidationSchema,
};
