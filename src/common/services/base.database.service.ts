/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  type DataSource,
  type EntityManager,
} from 'typeorm';

import { BaseEntity } from 'src/common/entities/base-entity.entity';
import { PaginatedResponse } from 'src/common/services/response.service';

export abstract class BaseDatabaseService<T extends BaseEntity> {
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly dataSource: DataSource,
  ) {}

  async runInTransaction<R>(
    work: (manager: EntityManager) => Promise<R>,
  ): Promise<R> {
    return this.dataSource.transaction(work);
  }

  /**
   * Create a new record with audit fields
   * @param record - The entity data to create
   * @param modifiedBy - User ID who is creating the document
   * @returns The created entity with ID
   */

  async createRecord(record: Partial<T>): Promise<T> {
    const rec = this.repository.create({
      ...record,
    } as DeepPartial<T>);

    return await this.repository.save(rec);
  }

  /**
   * Update an existing record with audit fields
   * @param record - The entity data to update (must include id)
   * @param modifiedBy - User ID who is modifying the document
   * @param filter - Optional custom filter (defaults to using record.id)
   * @returns The updated entity or null if not found
   */

  async updateRecord(
    record: Partial<T>,
    filter?: FindOptionsWhere<T>,
  ): Promise<T | null> {
    const whereCondition = filter || ({ id: record.id } as FindOptionsWhere<T>);
    const existingRecord = await this.repository.findOne({
      where: whereCondition,
    });
    if (!existingRecord) return null;

    const updatedRec = this.repository.merge(existingRecord, {
      ...record,
    } as DeepPartial<T>);

    return await this.repository.save(updatedRec);
  }

  /**
   * Filter records with optional sorting and pagination
   * @param filter - Where conditions
   * @param options - Additional find options (select, relations, skip, take, etc.)
   * @param sort - Sort order (defaults to createdOn DESC)
   * @returns Array of matching entities
   */

  async filterRecords(
    filter: FindOptionsWhere<T> | FindOptionsWhere<T>[] = {},
    options: Omit<FindManyOptions<T>, 'where' | 'order'> = {},
    sort: FindManyOptions<T>['order'] = { createdOn: 'DESC' } as any,
  ): Promise<T[]> {
    return await this.repository.find({
      where: filter,
      order: sort,
      ...options,
    });
  }

  /**
   * Filter records with pagination
   * @param filter - Where conditions
   * @param page - Page number (1-based)
   * @param limit - Items per page
   * @param sort - Sort order
   * @param options - Additional find options (relations, select, etc.)
   * @returns Paginated results with metadata
   */

  async filterRecordsWithPagination(
    filter: FindOptionsWhere<T> | FindOptionsWhere<T>[] = {},
    page = 1,
    limit = 10,
    sort: FindManyOptions<T>['order'] = { createdOn: 'DESC' } as any,
    options?: Omit<FindManyOptions<T>, 'where' | 'order' | 'skip' | 'take'>,
  ): Promise<PaginatedResponse> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.repository.findAndCount({
      where: filter,
      order: sort,
      skip,
      take: limit,
      ...options,
    });
    return {
      data,
      total,
    };
  }

  /**
   * Find a single record matching the filter
   * @param filter - Where conditions
   * @param options - Additional find options
   * @returns The found entity or null
   */

  async findOneRecord(
    filter: FindOptionsWhere<T> = {},
    options: Omit<FindOneOptions<T>, 'where'> = {},
  ): Promise<T | null> {
    return await this.repository.findOne({
      where: filter,
      ...options,
    });
  }

  /**
   * Find a record by ID
   * @param id - The entity ID
   * @returns The found entity or null
   */

  async findById(id: number): Promise<T | null> {
    return await this.repository.findOne({
      where: { id: +id } as FindOptionsWhere<T>,
    });
  }

  /**
   * Soft delete a record by ID
   * @param id - The entity ID
   * @returns The entity, null if not found
   */
  async softDeleteById(id: number): Promise<T | null> {
    const result = await this.repository.softDelete(id);
    if (!result.affected || result.affected === 0) return null;

    return await this.repository.findOne({
      where: { id: +id } as FindOptionsWhere<T>,
      withDeleted: true,
    });
  }

  /**
   * Hard delete a record by ID
   * @param id - The entity ID
   * @returns True if deleted, false if not found
   */
  async deleteById(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
