import { Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export interface ICrudService<T> {
  readonly model: Model<T & Document>;
  findAll(options?: QueryOptions): Promise<T[]>;
  findAllActive(options?: QueryOptions): Promise<T[]>;
  findOne(id: string, options?: QueryOptions): Promise<T>;
  findOneActive(id: string, options?: QueryOptions): Promise<T>;
  create(dto: any, options?: QueryOptions): Promise<T>;
  update(id: string, dto: any, options?: QueryOptions): Promise<T>;
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

    private readonly defaultOptions: QueryOptions = {
      lean: true,
      new: true,
    };

    findAll(options: QueryOptions = this.defaultOptions): Promise<T[]> {
      return this.model.find({}, {}, options).exec();
    }

    findAllActive(options: QueryOptions = this.defaultOptions): Promise<T[]> {
      return this.model
        .find({ isActive: 1 } as FilterQuery<T & Document>, {}, options)
        .exec();
    }

    findOne(
      id: string,
      options: QueryOptions = this.defaultOptions,
    ): Promise<T> {
      return this.model.findById(id, {}, options).exec();
    }

    findOneActive(
      id: string,
      options: QueryOptions = this.defaultOptions,
    ): Promise<T> {
      return this.model
        .findOne(
          { _id: id, isActive: 1 } as FilterQuery<T & Document>,
          {},
          options,
        )
        .exec();
    }

    create(dto: TCreateDto): Promise<T> {
      return this.model.create(dto);
    }

    update(
      id: string,
      dto: TUpdateDto,
      options: QueryOptions = this.defaultOptions,
    ): Promise<T> {
      return this.model.findByIdAndUpdate(id, dto, options).exec();
    }

    toggle(
      id: string,
      options: QueryOptions = this.defaultOptions,
    ): Promise<T> {
      return this.model
        .findByIdAndUpdate(
          id,
          {
            $bit: { isActive: { xor: 1 } },
          } as UpdateQuery<T & Document>,
          options,
        )
        .exec();
    }

    async remove(
      id: string,
      options: QueryOptions = this.defaultOptions,
    ): Promise<void> {
      await this.model.findByIdAndDelete(id, options).exec();
    }
  }
  return CrudServiceHost;
}
