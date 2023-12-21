import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = courseServices.createCourseIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    messages: 'Course created successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
};
