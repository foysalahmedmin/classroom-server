// import { AppQueryCourse } from '../../builder/operations/AppQuery';
import mongoose from 'mongoose';
import AppError from '../../builder/errors/AppError';
import courseQueryModifier from '../../utils/queryModifier';
import CourseReview from '../course-review/course-review.model';
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

const getSingleCourseWithReviewsFromDB = async (_id: string) => {
  console.log(_id);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const course = await Course.findById({ _id: _id });

    if (!course) {
      throw new AppError(404, 'Course not found');
    }
    const reviews = await CourseReview.find({ courseId: course._id });
    session.commitTransaction();

    return { course, reviews: reviews || [] };
  } catch (err) {
    session.abortTransaction();
    throw new AppError(500, 'Failed to get course with');
  } finally {
    session.endSession();
  }
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseWithReviewsFromDB,
};
