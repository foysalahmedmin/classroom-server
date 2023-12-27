import { SortOrder } from 'mongoose';

export interface TCourseQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  minPrice?: string;
  maxPrice?: string;
  tags?: string;
  startDate?: string;
  endDate?: string;
  level?: string;
  durationInWeeks?: string;
  [key: string]: unknown;
}

export interface TPipelineStage {
  $lookup?: {
    from: string;
    localField: string;
    foreignField: string;
    as: string;
  };
  $match?: any;
  $addFields?: any;
  $count?: string;
  $sort?: any;
  $skip?: number;
  $limit?: number;
  $project?: any;
}
