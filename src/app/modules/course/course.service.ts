import AppQuery from '../../builder/oparations/AppQuery';
import { searchableFields, sortableFields } from './course.constant';
import { TCourse } from './course.interface';
import Course from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new AppQuery(Course.find(), query)
    .search(searchableFields)
    .filter()
    .sort(sortableFields)
    .paginate()
    .fields();
  const result = await courseQuery.queryModel;
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
};
