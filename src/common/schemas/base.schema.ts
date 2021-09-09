import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BaseDocument = Base & Document;

@Schema()
export class Base {
  @Prop({ default: 1, required: true })
  isActive: number;

  @Prop({ default: Date.now() })
  date: Date;

  @Prop({ default: Date.now() })
  update: Date;

  @Prop({ select: false })
  __v: number;
}

export const BaseSchema = SchemaFactory.createForClass(Base);
