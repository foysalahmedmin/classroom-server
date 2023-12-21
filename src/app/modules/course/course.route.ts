import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

export const CourseRoute = router;
