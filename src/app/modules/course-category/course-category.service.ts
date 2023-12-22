import { TCourseCategory } from './course-category.interface';
import CourseCategory from './course-category.model';

const createCourseCategoryIntoDB = async (payload: TCourseCategory) => {
  const result = await CourseCategory.create(payload);
  return result;
};

const getAllCourseCategoryFromDB = async () => {
  const result = await CourseCategory.find();
  return result;
};

export const CourseCategoryServices = {
  createCourseCategoryIntoDB,
  getAllCourseCategoryFromDB,
};
