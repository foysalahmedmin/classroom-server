import { SortOrder } from 'mongoose';
import { courseSortableFields } from '../modules/course/course.constant';

const courseQueryModifier = (query: Record<string, unknown>) => {
  const { page, limit, sortBy, sortOrder, ...restQueries } = query;
  const {
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    level,
    ...restFilterQueries
  } = restQueries;

  const filterModifiedQuery: any = { ...restFilterQueries };
  const sortModifiedQuery: { [key: string]: SortOrder } = {};

  //   Making filter queries ;
  if (tags) {
    filterModifiedQuery.tags = {
      $eleMatch: { name: tags, isDeleted: false },
    };
  }
  if (level) {
    filterModifiedQuery['details.level'] = level;
  }
  if (!isNaN(Number(minPrice as string))) {
    filterModifiedQuery.price = { $gte: Number(minPrice as string) };
  }
  if (!isNaN(Number(maxPrice as string))) {
    filterModifiedQuery.price = {
      ...filterModifiedQuery.price,
      $lte: Number(maxPrice as string),
    };
  }
  if (startDate) {
    filterModifiedQuery.price = { $gte: new Date(startDate as string) };
  }
  if (endDate) {
    filterModifiedQuery.price = { $lte: new Date(endDate as string) };
  }

  //   Making sort queries ;
  const sortByArr = (sortBy as string)?.split(',');
  if (sortByArr) {
    sortByArr.forEach((el: string) => {
      if (courseSortableFields.includes(el)) {
        sortModifiedQuery[el] = sortOrder === 'asc' ? 1 : -1;
      }
    });
  }

  return {
    filterModifiedQuery,
    sortModifiedQuery,
  };
};

export default courseQueryModifier;
