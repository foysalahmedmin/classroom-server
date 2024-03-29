import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseReviewControllers } from './course-review.controller';
import { CourseReviewValidations } from './course-review.validation';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(CourseReviewValidations.createCourseReviewValidationSchema),
  CourseReviewControllers.createCourseReview,
);

router.get('/', CourseReviewControllers.getAllCourseReview);

export const CourseReviewRoute = router;
