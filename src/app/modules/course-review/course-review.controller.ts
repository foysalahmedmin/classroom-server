import AppResponse from '../../builder/responses/AppResponse';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseReviewServices } from './course-review.service';

const createCourseReview = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await CourseReviewServices.createCourseReviewIntoDB(payload);

  sendResponse(
    res,
    new AppResponse(true, 201, 'Review created successfully', result),
  );
});

const getAllCourseReview = catchAsync(async (req, res) => {
  const result = await CourseReviewServices.getAllCourseReviewFromDB();

  sendResponse(
    res,
    new AppResponse(true, 200, 'Categories retrieved successfully', result),
  );
});

export const CourseReviewControllers = {
  createCourseReview,
  getAllCourseReview,
};
