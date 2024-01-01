import { JwtPayload } from 'jsonwebtoken';
import { TCourseReview } from './course-review.interface';
import CourseReview from './course-review.model';

const createCourseReviewIntoDB = async (
  user: JwtPayload,
  payload: TCourseReview,
) => {
  payload.createdBy = user._id;
  const createdResult = await CourseReview.create(payload);
  const result = await CourseReview.findById(createdResult._id).populate({
    path: 'createdBy',
    select: '-password -createdAt -updatedAt -__v',
  });
  return result;
};

const getAllCourseReviewFromDB = async () => {
  const result = await CourseReview.find().populate({
    path: 'createdBy',
    select: '-password -createdAt -updatedAt -__v',
  });
  return result;
};

export const CourseReviewServices = {
  createCourseReviewIntoDB,
  getAllCourseReviewFromDB,
};
