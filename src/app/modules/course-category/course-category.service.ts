import { JwtPayload } from 'jsonwebtoken';
import { TCourseCategory } from './course-category.interface';
import CourseCategory from './course-category.model';

const createCourseCategoryIntoDB = async (
  user: JwtPayload,
  payload: TCourseCategory,
) => {
  payload.createdBy = user._id;
  const result = await CourseCategory.create(payload);
  return result;
};

const getAllCourseCategoryFromDB = async () => {
  const result = await CourseCategory.find().populate({
    path: 'createdBy',
    select: '-password -createdAt -updatedAt -__v',
  });
  return result;
};

export const CourseCategoryServices = {
  createCourseCategoryIntoDB,
  getAllCourseCategoryFromDB,
};
