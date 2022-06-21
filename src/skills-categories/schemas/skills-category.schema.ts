import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Base } from '../../common/schemas/base.schema';
import { Databases } from '../../common/enums/databases.enum';
import { SkillDocument } from '../../skills/schemas/skill.schema';

export type SkillsCategoryDocument = SkillsCategory & mongoose.Document;

@Schema({ timestamps: true })
export class SkillsCategory extends Base {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Databases.skills }],
  })
  skills: SkillDocument[];
}

export enum SkillsCategoryRefs {
  Skills = 'skills',
}

export const SkillsCategorySchema =
  SchemaFactory.createForClass(SkillsCategory);
