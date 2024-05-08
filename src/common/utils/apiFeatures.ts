import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class QueryService {
  constructor() {}

  findAll<T>(
    repository: Repository<T>,
    queryParams: any,
    filter?: FindOptionsWhere<T>,
  ): Promise<T[]> {
    const queryObj = { ...queryParams };
    const excludedFields = ['page', 'limit', 'sort', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);

    console.log('queryParams =>', queryParams);
    console.log('queryObj =>', queryObj);

    const options: FindManyOptions<T> = { where: { ...queryObj, ...filter } };

    // Apply sorting
    if (queryParams.sort) {
      const sortFields: string[] = queryParams.sort.split(',');
      options.order = {};
      sortFields.forEach((field) => {
        const [fieldName, order] = field.split(':');
        options.order[fieldName.trim()] =
          order && (order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
      });
    }

    // Apply fields selection
    if (queryParams.fields) {
      const selectFields: string[] = queryParams.fields.split(',');
      options.select = {};
      selectFields.forEach((field) => {
        options.select[field.trim()] = true;
      });
    }

    // Apply pagination
    const page = queryParams.page * 1 || 1;
    const limit = queryParams.limit * 1 || 100;
    options.take = limit;
    options.skip = (page - 1) * limit;

    console.log('options =>', options);

    return repository.find(options);
  }
}

// Usage Example
// @Injectable()
// export class EmployeeService {
//   constructor(
//     private readonly queryService: QueryService,
//     @InjectRepository(Employee)
//     private readonly employeeRepository: Repository<Employee>,
//   ) {}

//   async findAll(queryParams): Promise<Employee[]> {
//     return await this.queryService.findAll<Employee>(this.employeeRepository, queryParams);
//   }
// }
