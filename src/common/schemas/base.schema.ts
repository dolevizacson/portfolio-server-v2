import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BaseDocument = Base & Document;

@Schema({ timestamps: true })
export class Base {
  @Prop({ default: 1, required: true })
  isActive: number;

  @Prop({ select: false })
  __v: number;
}

export const BaseSchema = SchemaFactory.createForClass(Base);
