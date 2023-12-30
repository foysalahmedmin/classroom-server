import { SortOrder } from 'mongoose';
import { courseSortableFields } from './course.constant';
import { TCourse } from './course.interface';

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

export const courseUpdateDataModifier = async (payload: Partial<TCourse>) => {
  const { details, startDate, endDate, ...restData } = payload;

  const modifiedUpdateData: Record<string, unknown> = { ...restData };

  if (startDate) {
    modifiedUpdateData.startDate = new Date(startDate);
  }

  if (endDate) {
    modifiedUpdateData.endDate = new Date(endDate);
  }

  if (details) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdateData[`details.${key}`] = value;
    }
  }

  return modifiedUpdateData;
};
