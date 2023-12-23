import express from 'express';
import { CourseCategoryRoute } from '../modules/course-category/course-category.route';
import { CourseReviewRoute } from '../modules/course-review/course-review.route';
import { CourseRoute } from '../modules/course/course.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: CourseRoute,
  },
  {
    path: '/categories',
    route: CourseCategoryRoute,
  },
  {
    path: '/reviews',
    route: CourseReviewRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
