import { FilterQuery, Query, SortOrder } from 'mongoose';

class AppQuery<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export class AppQueryCourse<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.queryModel = this?.queryModel.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj: any = { ...this.query };
    const excludeField = [
      'minPrice',
      'maxPrice',
      'tags',
      'level',
      'startDate',
      'endDate',
      'searchTerm',
      'sortBy',
      'sortOrder',
      'page',
      'limit',
      'fields',
    ];
    excludeField.forEach((el) => delete queryObj[el]);
    if (this.query.tags) {
      queryObj.tags = {
        $eleMatch: { name: this.query.tags, isDeleted: false },
      };
    }
    if (this.query.level) {
      queryObj['details.level'] = this.query.level;
    }
    if (!isNaN(Number(this.query.minPrice as string))) {
      queryObj.price = { $gte: Number(this.query.minPrice as string) };
    }
    if (!isNaN(Number(this.query.maxPrice as string))) {
      queryObj.price = {
        ...queryObj.price,
        $lte: Number(this.query.maxPrice as string),
      };
    }
    if (this.query.startDate) {
      queryObj.startDate = { $gte: new Date(this.query.startDate as string) };
    }
    if (this.query.endDate) {
      queryObj.endDate = { $lte: new Date(this.query.endDate as string) };
    }
    if (!isNaN(Number(this.query.durationInWeeks as string))) {
      queryObj.durationInWeeks = Number(this.query.durationInWeeks as string);
    }

    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort(sortableFields: string[]) {
    const sortQuery: { [key: string]: SortOrder } = {};

    const sortBy = (this?.query?.sortBy as string)?.split(',');
    const sortOrder = this?.query?.sortOrder as 'asc' | 'desc';
    if (sortBy) {
      sortBy.forEach((el: string) => {
        if (sortableFields.includes(el)) {
          sortQuery[el] = sortOrder === 'asc' ? 1 : -1;
        }
      });
    }
    this.queryModel = this.queryModel = this.queryModel.sort(sortQuery);

    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.queryModel = this.queryModel.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields = (this?.query?.fields as string)?.split(',').join();

    this.queryModel = this.queryModel.select(fields);

    return this;
  }
}

export default AppQuery;
