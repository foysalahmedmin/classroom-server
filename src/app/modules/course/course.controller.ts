import AppResponse from '../../builder/responses/AppResponse';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await CourseServices.createCourseIntoDB(payload);

  sendResponse(
    res,
    new AppResponse(true, 201, 'Course created successfully', result),
  );
});

const getAllCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CourseServices.getAllCourseFromDB(query);

  sendResponse(
    res,
    new AppResponse(true, 200, 'Courses retrieved successfully', result),
  );
});

const getAllCourseWithReviews = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await CourseServices.getSingleCourseWithReviewsFromDB(_id);

  sendResponse(
    res,
    new AppResponse(
      true,
      200,
      'Courses retrieved with reviews successfully',
      result,
    ),
  );
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getAllCourseWithReviews,
};
