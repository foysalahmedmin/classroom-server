import { SortOrder } from 'mongoose';
import { TCourseQuery } from '../interface/query.interface';
import { courseSortableFields } from '../modules/course/course.constant';

export const courseGetQueryModifier = (query: TCourseQuery) => {
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
  if (!isNaN(Number(minPrice))) {
    filterModifiedQuery.price = { $gte: Number(minPrice) };
  }
  if (!isNaN(Number(maxPrice))) {
    filterModifiedQuery.price = {
      ...filterModifiedQuery.price,
      $lte: Number(maxPrice),
    };
  }
  if (startDate) {
    filterModifiedQuery.startDate = { $gte: new Date(startDate) };
  }
  if (endDate) {
    filterModifiedQuery.endDate = { $lte: new Date(endDate) };
  }
  if (durationInWeeks && !isNaN(Number(durationInWeeks))) {
    filterModifiedQuery.durationInWeeks = Number(durationInWeeks);
  }
  if (durationInWeeks && !isNaN(Number(durationInWeeks))) {
    filterModifiedQuery.durationInWeeks = Number(durationInWeeks);
  }

  //   Making sort queries ;
  const sortByArr = sortBy?.split(',');
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
