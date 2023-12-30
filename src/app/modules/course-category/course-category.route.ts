import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseCategoryControllers } from './course-category.controller';
import { CourseCategoryValidations } from './course-category.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(
    CourseCategoryValidations.createCourseCategoryValidationSchema,
  ),
  CourseCategoryControllers.createCourseCategory,
);

router.get('/', CourseCategoryControllers.getAllCourseCategory);

export const CourseCategoryRoute = router;
