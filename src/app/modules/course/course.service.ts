import mongoose from 'mongoose';
import AppError from '../../builder/errors/AppError';
import courseQueryModifier from '../../utils/queryModifier';
import CourseReview from '../course-review/course-review.model';
import { TCourse } from './course.interface';
import Course from './course.model';
import { courseUpdateDataModifier } from './course.utils';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

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

const getBestCourseFromDB = async () => {
  const bestCourseData = await Course.aggregate([
    {
      $lookup: {
        from: 'course-reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $match: {
        reviews: { $exists: true, $not: { $size: 0 } },
      },
    },
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
        reviewCount: { $size: '$reviews' },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        course: {
          _id: '$_id',
          title: '$title',
          instructor: '$instructor',
          categoryId: '$categoryId',
          price: '$price',
          tags: '$tags',
          language: '$language',
          provider: '$provider',
          startDate: '$startDate',
          endDate: '$endDate',
          durationInWeeks: '$durationInWeeks',
          details: 'details',
        },
        averageRating: 1,
        reviewCount: 1,
      },
    },
  ]);

  if (!bestCourseData.length) {
    throw new AppError(404, 'not found');
  }

  return bestCourseData[0];
};

const getUpdateCourseIntoDB = async (
  _id: string,
  payload: Partial<TCourse>,
) => {
  const { tags, ...restData } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    if (tags && tags.length > 0) {
      const deletedTags = tags
        .filter((el) => el.name && el.isDeleted === true)
        .map((el) => el.name);
      const newTags = tags.filter((el) => el.name && el.isDeleted !== true);

      if (deletedTags.length > 0) {
        await Course.findByIdAndUpdate(
          _id,
          {
            $pull: { tags: { name: { $in: deletedTags } } },
          },
          { new: true, runValidators: true, session },
        );
      }

      if (newTags.length > 0) {
        await Course.findByIdAndUpdate(
          _id,
          {
            $addToSet: { tags: { $each: newTags } },
          },
          { new: true, runValidators: true, session },
        );
      }
    }

    const modifiedUpdateData = await courseUpdateDataModifier(restData);

    const result = await Course.findByIdAndUpdate(_id, modifiedUpdateData, {
      new: true,
      session,
    });

    session.commitTransaction();

    return result;
  } catch (err) {
    session.abortTransaction();
  } finally {
    session.endSession();
  }
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseWithReviewsFromDB,
  getBestCourseFromDB,
  getUpdateCourseIntoDB,
};
