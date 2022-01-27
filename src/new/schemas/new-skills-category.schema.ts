import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type NewSkillsCategoryDocument = NewSkillsCategory & Document;

@Schema()
export class NewSkillsCategory {
  @Prop()
  name?: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
  })
  skills?: mongoose.Types.ObjectId[];
}

export const newSkillsCategorySchema =
  SchemaFactory.createForClass(NewSkillsCategory);
