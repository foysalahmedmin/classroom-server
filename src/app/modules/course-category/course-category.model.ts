import mongoose, { Schema } from 'mongoose';
import { TCourseCategory } from './course-category.interface';

const courseCategorySchema = new Schema<TCourseCategory>({
  name: { type: String, required: true, unique: true },
});

const CourseCategory = mongoose.model<TCourseCategory>(
  'Course-Category',
  courseCategorySchema,
);

export default CourseCategory;
