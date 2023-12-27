import { TCourse } from '../modules/course/course.interface';

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
