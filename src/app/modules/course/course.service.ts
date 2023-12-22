// import { AppQueryCourse } from '../../builder/operations/AppQuery';
import courseQueryModifier from '../../utils/queryModifier';
import { TCourse } from './course.interface';
import Course from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

// const getAllCourseFromDB = async (query: Record<string, unknown>) => {
//   const courseQuery = new AppQueryCourse(Course.find(), query)
//     .search(searchableFields)
//     .filter()
//     .sort(sortableFields)
//     .paginate()
//     .fields();
//   const result = await courseQuery.queryModel;
//   return result;
// };

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const { filterModifiedQuery, sortModifiedQuery } = courseQueryModifier(query);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit);
  const skip = (page - 1) * limit;
  const result = await Course.find(filterModifiedQuery)
    .sort(sortModifiedQuery)
    .skip(skip)
    .limit(limit);
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
};
