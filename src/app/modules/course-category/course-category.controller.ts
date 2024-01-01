import AppResponse from '../../builder/responses/AppResponse';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseCategoryServices } from './course-category.service';

const createCourseCategory = catchAsync(async (req, res) => {
  const result = await CourseCategoryServices.createCourseCategoryIntoDB(
    req.user,
    req.body,
  );

  sendResponse(
    res,
    new AppResponse(true, 201, 'Category created successfully', result),
  );
});

const getAllCourseCategory = catchAsync(async (req, res) => {
  const result = await CourseCategoryServices.getAllCourseCategoryFromDB();

  sendResponse(
    res,
    new AppResponse(true, 200, 'Categories retrieved successfully', result),
  );
});

export const CourseCategoryControllers = {
  createCourseCategory,
  getAllCourseCategory,
};
