import { z } from 'zod';

const courseTagsValidationSchema = z.array(
  z.object({
    name: z.string({
      invalid_type_error: 'Tag name must be a string',
      required_error: 'Tag name is required',
    }),
    isDeleted: z.boolean(),
  }),
);

const updateCourseTagsValidationSchema = z.array(
  z.object({
    name: z
      .string({ invalid_type_error: 'Tag name must be a string' })
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
);

const courseDetailsValidationSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
    invalid_type_error:
      'Level must be "Beginner", "Intermediate" or "Advanced"',
    required_error: 'Level is required',
  }),
  description: z.string({
    invalid_type_error: 'Description must be a string',
    required_error: 'Description is required',
  }),
});

const updateCourseDetailsValidationSchema = z.object({
  level: z
    .enum(['Beginner', 'Intermediate', 'Advanced'], {
      invalid_type_error:
        'Level must be "Beginner", "Intermediate" or "Advanced"',
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Description must be a string',
    })
    .optional(),
});

const courseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'Title must be a string',
      required_error: 'Title is required',
    }),
    instructor: z.string({
      invalid_type_error: 'Instructor must be a string',
      required_error: 'Instructor is required',
    }),
    categoryId: z.string({
      invalid_type_error: 'Category ID must be a Object ID',
      required_error: 'Category ID is required',
    }),
    price: z.number({
      invalid_type_error: 'Price must be a number',
      required_error: 'Price is required',
    }),
    tags: courseTagsValidationSchema,
    startDate: z.string({
      invalid_type_error:
        'Start date must be a string, make sure the format YYYY-MM-DD}',
      required_error: 'Start date is required, make sure the format YYYY-MM-DD',
    }),
    endDate: z.string({
      invalid_type_error: 'End date must be a string',
      required_error: 'End date is required',
    }),
    language: z.string({
      invalid_type_error: 'Language must be a string',
      required_error: 'Language is required',
    }),
    provider: z.string({
      invalid_type_error: 'Provider must be a string',
      required_error: 'Provider is required',
    }),
    details: courseDetailsValidationSchema,
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'Title must be a string',
      })
      .optional(),
    instructor: z
      .string({
        invalid_type_error: 'Instructor must be a string',
      })
      .optional(),
    categoryId: z
      .string({
        invalid_type_error: 'Category ID must be a Object ID',
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .optional(),
    tags: updateCourseTagsValidationSchema.optional(),
    startDate: z
      .string({
        invalid_type_error:
          'Start date must be a string, make sure the format YYYY-MM-DD}',
      })
      .optional(),
    endDate: z
      .string({
        invalid_type_error: 'End date must be a string',
      })
      .optional(),
    language: z
      .string({
        invalid_type_error: 'Language must be a string',
      })
      .optional(),
    provider: z
      .string({
        invalid_type_error: 'Provider must be a string',
      })
      .optional(),
    details: updateCourseDetailsValidationSchema.optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema: courseValidationSchema,
  updateCourseValidationSchema,
};
