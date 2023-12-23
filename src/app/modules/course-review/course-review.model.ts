import mongoose, { Schema } from 'mongoose';
import { TCourseReview } from './course-review.interface';

const courseReviewSchema = new Schema<TCourseReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  rating: {
    type: Number,
    max: 5,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const CourseReview = mongoose.model<TCourseReview>(
  'Course-Review',
  courseReviewSchema,
);

export default CourseReview;
