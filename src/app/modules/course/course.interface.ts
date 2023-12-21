import { Types } from 'mongoose';

export interface TCourseTags {
  name: string;
  isDeleted: boolean;
}

export interface TCourseDetail {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

export interface TCourse {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags?: TCourseTags[];
  startDate: Date;
  endDate: Date;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: TCourseDetail;
}
