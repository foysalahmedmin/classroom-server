import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/course',
  auth('admin'),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/courses', CourseControllers.getAllCourse);
router.get(
  '/courses/:_id/reviews',
  CourseControllers.getSingleCourseWithReviews,
);

router.get('/course/best', CourseControllers.getBesCourse);

router.put(
  '/courses/:_id',
  auth('admin'),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.getUpdateCourse,
);

export const CourseRoute = router;
