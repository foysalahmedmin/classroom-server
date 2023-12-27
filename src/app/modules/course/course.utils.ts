import { SortOrder } from 'mongoose';
import { courseSortableFields } from './course.constant';

export const courseModifiedSortField = (
  sortBy: string,
  sortOrder: SortOrder,
): any => {
  const sortField: { [key: string]: SortOrder } = {};
  sortBy.split(',').forEach((el: string) => {
    if (courseSortableFields.includes(el)) {
      sortField[el] = sortOrder === 'asc' ? 1 : -1;
    }
  });

  return sortField;
};
