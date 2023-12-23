import { Types } from 'mongoose';

export interface TCourseReview {
  courseId: Types.ObjectId;
  rating: number;
  review: string;
}
