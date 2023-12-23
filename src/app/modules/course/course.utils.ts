import { TCourse } from './course.interface';

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

  //   if (tags && tags.length > 0) {
  //     const deletedTags = tags
  //       .filter((el) => el.name && el.isDeleted)
  //       .map((el) => el.name);

  //     const newTags = tags.filter((el) => el.name && !el.isDeleted);

  //     if (deletedTags.length > 0) {
  //       modifiedUpdateData.$pull = { tags: { name: { $in: deletedTags } } };
  //     }

  //     if (newTags.length > 0) {
  //       modifiedUpdateData[`$addToSet`] = { tags: { $each: newTags } };
  //     }
  //   }

  return modifiedUpdateData;
};
