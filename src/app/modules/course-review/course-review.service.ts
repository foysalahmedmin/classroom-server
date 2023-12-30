import { TCourseReview } from './course-review.interface';
import CourseReview from './course-review.model';

const createCourseReviewIntoDB = async (payload: TCourseReview) => {
  const createdResult = await CourseReview.create(payload);
  const result = await CourseReview.findById(createdResult._id).populate({
    path: 'createdBy',
    select: '-password',
  });
  return result;
};

const getAllCourseReviewFromDB = async () => {
  const result = await CourseReview.find();
  return result;
};

export const CourseReviewServices = {
  createCourseReviewIntoDB,
  getAllCourseReviewFromDB,
};
