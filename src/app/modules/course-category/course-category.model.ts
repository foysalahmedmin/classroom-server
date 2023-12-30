import mongoose, { Schema } from 'mongoose';
import { TCourseCategory } from './course-category.interface';

const courseCategorySchema = new Schema<TCourseCategory>(
  {
    name: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true,
  },
);

const CourseCategory = mongoose.model<TCourseCategory>(
  'Course-Category',
  courseCategorySchema,
);

export default CourseCategory;
