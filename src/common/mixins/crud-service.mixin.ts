import { Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Document,
  FilterQuery,
  Model,
  PopulateOptions,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export interface ICrudService<T> {
  readonly model: Model<T & Document>;
  findAll(
    options?: QueryOptions,
    populateOptions?: PopulateOptions,
  ): Promise<T[]>;
  findAllActive(
    options?: QueryOptions,
    populateOptions?: PopulateOptions,
  ): Promise<T[]>;
  findOne(
    id: string,
    options?: QueryOptions,
    populateOptions?: PopulateOptions,
  ): Promise<T>;
  findOneActive(
    id: string,
    options?: QueryOptions,
    populateOptions?: PopulateOptions,
  ): Promise<T>;
  create(dto: any, options?: QueryOptions): Promise<T>;
  update(
    id: string,
    dto: any,
    options?: QueryOptions,
    populateOptions?: PopulateOptions,
  ): Promise<T>;
  toggle(id: string, options?: QueryOptions): Promise<T>;
  remove(id: string, options?: QueryOptions): Promise<void>;
}

export interface IClassProp<I> {
  name: string;
  new (...args: any[]): I;
}

export function CrudService<T, TCreateDto = any, TUpdateDto = any>(
  dbResource: IClassProp<T>,
): Type<ICrudService<T>> {
  class CrudServiceHost implements ICrudService<T> {
    @InjectModel(dbResource.name)
    readonly model: Model<T & Document>;

    findAll(
      options?: QueryOptions,
      populateOptions?: PopulateOptions,
    ): Promise<T[]> {
      const query = this.model.find({}, {}, { ...options });

      if (populateOptions) {
        query.populate(populateOptions);
      }

      return query.exec();
    }

    findAllActive(
      options: QueryOptions,
      populateOptions: PopulateOptions,
    ): Promise<T[]> {
      const query = this.model.find(
        { isActive: 1 } as FilterQuery<T & Document>,
        {},
        { ...options },
      );

      if (populateOptions) {
        const { match } = populateOptions;
        query.populate({
          ...populateOptions,
          match: {
            active: 1,
            ...match,
          },
        });
      }

      return query.exec();
    }

    findOne(
      id: string,
      options?: QueryOptions,
      populateOptions?: PopulateOptions,
    ): Promise<T> {
      const query = this.model.findById(id, {}, { ...options });

      if (populateOptions) {
        query.populate(populateOptions);
      }

      return query.exec();
    }

    findOneActive(
      id: string,
      options: QueryOptions,
      populateOptions?: PopulateOptions,
    ): Promise<T> {
      const query = this.model.findOne(
        { _id: id, isActive: 1 } as FilterQuery<T & Document>,
        {},
        { ...options },
      );

      if (populateOptions) {
        const { match } = populateOptions;
        query.populate({
          ...populateOptions,
          match: {
            active: 1,
            ...match,
          },
        });
      }

      return query.exec();
    }

    create(dto: TCreateDto): Promise<T> {
      return this.model.create(dto);
    }

    update(
      id: string,
      dto: TUpdateDto,
      options: QueryOptions,
      populateOptions?: PopulateOptions,
    ): Promise<T> {
      const query = this.model.findByIdAndUpdate(id, dto, { ...options });

      if (populateOptions) {
        query.populate(populateOptions);
      }

      return query.exec();
    }

    toggle(id: string, options: QueryOptions): Promise<T> {
      return this.model
        .findByIdAndUpdate(
          id,
          {
            $bit: { isActive: { xor: 1 } },
          } as UpdateQuery<T & Document>,
          { ...options },
        )
        .exec();
    }

    async remove(id: string, options: QueryOptions): Promise<void> {
      await this.model.findByIdAndDelete(id, { ...options }).exec();
    }
  }
  return CrudServiceHost;
}
