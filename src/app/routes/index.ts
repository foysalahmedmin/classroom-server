import express from 'express';
import { CourseCategoryRoute } from '../modules/course-category/course-category.route';
import { CourseRoute } from '../modules/course/course.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/course',
    route: CourseRoute,
  },
  {
    path: '/categories',
    route: CourseCategoryRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
