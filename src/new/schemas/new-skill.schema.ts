import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type NewSkillDocument = NewSkill & Document;

@Schema()
export class NewSkill {
  @Prop()
  name?: string;

  @Prop({
    type: [String],
  })
  attributes?: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  skillCategory?: mongoose.Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
  })
  projects?: mongoose.Types.ObjectId[];
}

export const newSkillSchema = SchemaFactory.createForClass(NewSkill);
