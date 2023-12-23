import { TCourseReview } from './course-review.interface';
import CourseReview from './course-review.model';

const createCourseReviewIntoDB = async (payload: TCourseReview) => {
  const result = await CourseReview.create(payload);
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
