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
    durationInWeeks,
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
    filterModifiedQuery.startDate = { $gte: new Date(startDate as string) };
  }
  if (endDate) {
    filterModifiedQuery.endDate = { $lte: new Date(endDate as string) };
  }
  if (durationInWeeks && !isNaN(Number(durationInWeeks as string))) {
    filterModifiedQuery.durationInWeeks = Number(durationInWeeks as string);
  }
  if (durationInWeeks && !isNaN(Number(durationInWeeks))) {
    filterModifiedQuery.durationInWeeks = Number(durationInWeeks);
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
