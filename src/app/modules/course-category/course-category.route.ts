import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseCategoryControllers } from './course-category.controller';
import { CourseCategoryValidations } from './course-category.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(
    CourseCategoryValidations.createCourseCategoryValidationSchema,
  ),
  CourseCategoryControllers.createCourseCategory,
);

router.get('/', CourseCategoryControllers.getAllCourseCategory);

export const CourseCategoryRoute = router;
