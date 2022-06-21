import { Type } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  Connection,
  Document,
  FilterQuery,
  Model,
  PopulateOptions,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

import { HelperFunctionsService } from '../../utils/helper-functions.service';
import { ServiceFunctionService } from '../../utils/service-functions.service';

export interface ICrudService<T, newT> {
  readonly model: Model<T & Document>;
  readonly helperFunctionsService: HelperFunctionsService;
  readonly serviceFunctionsService: ServiceFunctionService;
  readonly connection: Connection;
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

export function CrudService<T, newT, TCreateDto = any, TUpdateDto = any>(
  dbResource: IClassProp<T>,
  dbResourceNew: IClassProp<newT>,
): Type<ICrudService<T, newT>> {
  class CrudServiceHost implements ICrudService<T, newT> {
    @InjectModel(dbResource.name)
    readonly model: Model<T & Document>;
    @Inject(HelperFunctionsService)
    readonly helperFunctionsService: HelperFunctionsService;
    @Inject(ServiceFunctionService)
    readonly serviceFunctionsService: ServiceFunctionService;
    @InjectConnection() readonly connection: Connection;

    findAll(
      options?: QueryOptions,
      populateOptions?: PopulateOptions,
    ): Promise<T[]> {
      const query = this.model.find({}, {}, { lean: true, ...options });

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
      const query = this.model.findById(id, {}, { lean: true, ...options });

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
        { lean: true, ...options },
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
      return this.helperFunctionsService.mongooseTransaction(
        this.connection,
        async (session) => {
          const newDocument = await this.serviceFunctionsService.getNewDocument(
            session,
          );

          const key = this.helperFunctionsService.toFirstLowerLetter(
            dbResourceNew.name,
          );

          newDocument[key] = undefined;
          await newDocument.save();

          return this.model.create(dto);
        },
      );
    }

    update(
      id: string,
      dto: TUpdateDto,
      options: QueryOptions,
      populateOptions?: PopulateOptions,
    ): Promise<T> {
      const query = this.model.findByIdAndUpdate(id, dto, {
        new: true,
        lean: true,
        ...options,
      });

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
          { new: true, lean: true, timestamps: false, ...options },
        )
        .exec();
    }

    async remove(id: string, options: QueryOptions): Promise<void> {
      await this.model.findByIdAndDelete(id, { ...options }).exec();
    }
  }
  return CrudServiceHost;
}
