import mongoose from 'mongoose';
import AppError from '../../builder/errors/AppError';
import { TCourseQuery } from '../../interface/query.interface';
import CourseReview from '../course-review/course-review.model';
import { TCourse } from './course.interface';
import Course from './course.model';
import {
  courseModifiedSortField,
  courseUpdateDataModifier,
} from './course.utils';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: TCourseQuery) => {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    tags,
    level,
    minPrice,
    maxPrice,
    startDate,
    endDate,
    durationInWeeks,
    ...restFilterQueries
  } = query;
  const pageNumber = Number(query.page) || 1;
  const limitNumber = Number(query.limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const result = await Course.aggregate([
    {
      $match: {
        ...(tags
          ? { tags: { $eleMatch: { name: tags, isDeleted: false } } }
          : {}),
        ...(level ? { 'details.level': level } : {}),
        ...(minPrice ? { price: { $gte: Number(minPrice) } } : {}),
        ...(maxPrice ? { price: { $lte: Number(maxPrice) } } : {}),
        ...(startDate ? { startDate: { $gte: new Date(startDate) } } : {}),
        ...(endDate ? { endDate: { $lte: new Date(endDate) } } : {}),
        ...restFilterQueries,
      },
    },
    {
      $addFields: {
        durationInWeeks: {
          $ceil: {
            $divide: [
              { $subtract: ['$endDate', '$startDate'] },
              1000 * 60 * 60 * 24 * 7,
            ],
          },
        },
      },
    },
    {
      $match: {
        ...(durationInWeeks
          ? { durationInWeeks: Number(durationInWeeks) }
          : {}),
      },
    },
    {
      $sort: {
        ...(sortBy && sortOrder
          ? courseModifiedSortField(sortBy, sortOrder)
          : {
              startDate: -1,
            }),
      },
    },
    {
      $facet: {
        meta: [
          { $count: 'total' },
          { $addFields: { page: Number(pageNumber) } },
          { $addFields: { skip: Number(skip) } },
        ],
        courses: [
          {
            $skip: skip,
          },
          {
            $limit: limitNumber,
          },
          {
            $lookup: {
              from: 'users',
              let: {
                createdBy: '$createdBy',
              },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ['$_id', { $toObjectId: '$$createdBy' }] },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    role: 1,
                  },
                },
              ],
              as: 'createdBy',
            },
          },
          {
            $unwind: {
              path: '$createdBy',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              title: 1,
              instructor: 1,
              categoryId: 1,
              price: 1,
              tags: 1,
              language: 1,
              provider: 1,
              startDate: 1,
              endDate: 1,
              durationInWeeks: 1,
              details: 1,
              createdBy: 1,
            },
          },
        ],
      },
    },
    // {
    //   $unwind: {
    //     path: '$meta',
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
    // {
    //   $project: {
    //     total: '$meta.total',
    //     page: '$metadata.page',
    //     data: '$data',
    //   },
    // },
  ]);

  const { meta, courses } = result[0];

  return {
    meta,
    result: { courses },
  };
};

const getSingleCourseWithReviewsFromDB = async (_id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const course = await Course.findById({ _id: _id }).populate({
      path: 'createdBy',
      select: '-password',
    });

    if (!course) {
      throw new AppError(404, 'Course not found');
    }
    const reviews = await CourseReview.find({ courseId: course._id }).populate({
      path: 'createdBy',
      select: '-password',
    });
    session.commitTransaction();

    return { course, reviews: reviews || [] };
  } catch (err: any) {
    session.abortTransaction();
    throw new AppError(
      500,
      `Failed to get course with reviews: (${err.message})`,
    );
  } finally {
    session.endSession();
  }
};

const getBestCourseFromDB = async () => {
  const [result] = await Course.aggregate([
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
          details: '$details',
        },
        averageRating: 1,
        reviewCount: 1,
      },
    },
  ]);
  if (!result) {
    throw new AppError(404, 'not found');
  }
  return result;
};

const updateCourseIntoDB = async (_id: string, payload: Partial<TCourse>) => {
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
      runValidators: true,
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
  updateCourseIntoDB,
};
