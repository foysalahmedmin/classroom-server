import AppResponse from '../../builder/responses/AppResponse';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseCategoryServices } from './course-category.service';

const createCourseCategory = catchAsync(async (req, res) => {
  const payload = req.body;
  const result =
    await CourseCategoryServices.createCourseCategoryIntoDB(payload);

  sendResponse(
    res,
    new AppResponse(true, 201, 'Course created successfully', result),
  );
});

export const CourseCategoryControllers = {
  createCourseCategory,
};
