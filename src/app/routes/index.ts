import express from 'express';
import { CourseRoute } from '../modules/course/course.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/course',
    route: CourseRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
