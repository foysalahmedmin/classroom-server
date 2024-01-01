import AppResponse from '../../builder/responses/AppResponse';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.user, req.body);

  sendResponse(
    res,
    new AppResponse(true, 201, 'Course created successfully', result),
  );
});

const getAllCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const { meta, result } = await CourseServices.getAllCourseFromDB(query);

  sendResponse(res, {
    meta,
    ...new AppResponse(true, 200, 'Courses retrieved successfully', result),
  });
});

const getSingleCourseWithReviews = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await CourseServices.getSingleCourseWithReviewsFromDB(_id);

  sendResponse(
    res,
    new AppResponse(
      true,
      200,
      'Course and Reviews retrieved successfully',
      result,
    ),
  );
});

const getBesCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getBestCourseFromDB();

  sendResponse(
    res,
    new AppResponse(true, 200, 'Best course retrieved successfully', result),
  );
});

const getUpdateCourse = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const payload = req.body;
  const result = await CourseServices.updateCourseIntoDB(_id, payload);

  sendResponse(
    res,
    new AppResponse(true, 200, 'Course updated successfully', result),
  );
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourseWithReviews,
  getBesCourse,
  getUpdateCourse,
};
