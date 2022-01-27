import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewTaskDocument = NewTask & Document;

@Schema()
export class NewTask {
  @Prop()
  header?: string;

  @Prop()
  description?: string;
}

export const newTaskSchema = SchemaFactory.createForClass(NewTask);
