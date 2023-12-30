import mongoose, { Query, Schema } from 'mongoose';
import { TCourse, TCourseDetail, TCourseTags } from './course.interface';

const courseTagsSchema = new Schema<TCourseTags>(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    _id: false,
  },
);

const courseDetailSchema = new Schema<TCourseDetail>(
  {
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    description: { type: String, required: true },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course-Category',
    },
    price: { type: Number, required: true },
    tags: { type: [courseTagsSchema], require: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    details: { type: courseDetailSchema, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    id: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

courseSchema.virtual('durationInWeeks').get(function () {
  const durationInMillisecond =
    this.endDate.getTime() - this.startDate.getTime();
  const durationInWeeks = Math.ceil(
    Math.abs(durationInMillisecond) / (1000 * 60 * 60 * 24 * 7),
  );
  return durationInWeeks;
});

courseSchema.pre(/^find/, function (this: Query<TCourse, Document>, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

courseSchema.pre('aggregate', function () {
  this.pipeline().unshift({
    $match: { isDeleted: { $ne: true } },
  });
});

const Course = mongoose.model<TCourse>('Course', courseSchema);

export default Course;
