import { number, z } from 'zod';

const courseReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    rating: number().max(5),
    review: z.string(),
  }),
});

const updateCourseReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string().optional(),
    rating: number().max(5).optional(),
    review: z.string().optional().optional(),
  }),
});

export const CourseReviewValidations = {
  createCourseReviewValidationSchema: courseReviewValidationSchema,
  updateCourseReviewValidationSchema,
};
