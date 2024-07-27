import { Injectable } from '@nestjs/common';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { CustomQueryParamsDto } from '../dto/custom-query-params.dto';

// type SelectFields = {
//   [key: string]: boolean | SelectFields;
// };

interface QueryOptions<T> {
  repository: Repository<T>;
  queryParams: CustomQueryParamsDto & Partial<T>;
  filter?: FindOptionsWhere<T>;
  sortFields?: FindOptionsOrder<T>;
  relations?: FindOptionsRelations<T>;
  selectFields?: FindOptionsSelect<T>;
}

@Injectable()
export class QueryService {
  constructor() {}

  query<T>(queryOptions: QueryOptions<T>): Promise<T[]> {
    const {
      repository,
      queryParams,
      filter,
      sortFields,
      relations,
      selectFields,
    } = queryOptions;

    const options: FindManyOptions<T> = {};

    // Filtering
    const queryObj = { ...queryParams };
    const excludedFields = ['page', 'limit', 'sort', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    options.where = { ...queryObj, ...filter };

    // Sorting
    if (queryParams.sort) {
      const fields: string[] = queryParams.sort.split(',');
      options.order = {};
      fields.forEach((field) => {
        const [fieldName, order] = field.split(':');
        options.order[fieldName.trim()] =
          order && (order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
      });
    } else {
      options.order = sortFields || {};
    }

    // Relations
    if (relations) options.relations = relations;

    // Fields Selection
    options.select = selectFields || {};
    if (queryParams.fields) {
      const fields: string[] = queryParams.fields.split(',');
      fields.forEach((field) => {
        options.select[field.trim()] = true;
      });
    }

    // Pagination
    const page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || 100;
    options.take = limit;
    options.skip = (page - 1) * limit;

    return repository.find(options);
  }
}
