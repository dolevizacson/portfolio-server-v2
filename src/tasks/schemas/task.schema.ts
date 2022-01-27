import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Base } from '../../common/schemas/base.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task extends Base {
  @Prop({ required: true })
  header: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 0 })
  isDone: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
