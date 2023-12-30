import { number, z } from 'zod';

const courseReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    rating: number().max(5),
    review: z.string(),
    createdBy: z.string({
      invalid_type_error: 'CreatedBy must be string',
      required_error: 'CreatedBy is required',
    }),
  }),
});

const updateCourseReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string().optional(),
    rating: number().max(5).optional(),
    createdBy: z.string({
      invalid_type_error: 'CreatedBy must be string',
    }),
    review: z.string().optional().optional(),
  }),
});

export const CourseReviewValidations = {
  createCourseReviewValidationSchema: courseReviewValidationSchema,
  updateCourseReviewValidationSchema,
};
