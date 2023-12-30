import { Types } from 'mongoose';

export interface TCourseCategory {
  name: string;
  createdBy: Types.ObjectId;
  isDeleted?: boolean;
}
