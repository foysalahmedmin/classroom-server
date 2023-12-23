import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/course',
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
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.getUpdateCourse,
);

export const CourseRoute = router;
