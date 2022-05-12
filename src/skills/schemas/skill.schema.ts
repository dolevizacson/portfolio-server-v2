import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Databases } from '../../common/enums/databases.enum';

import { Base } from '../../common/schemas/base.schema';
import { ProjectDocument } from '../../projects/schemas/project.schema';
import { SkillsCategoryDocument } from '../../skills-categories/schemas/skills-category.schema';

export type SkillDocument = Skill & mongoose.Document;

@Schema()
export class Skill extends Base {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [String],
    validate: (val: string[]) => val.length > 0,
  })
  attributes: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Databases.SkillsCategories,
    required: true,
  })
  skillsCategory: SkillsCategoryDocument;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Databases.projects }],
  })
  projects: ProjectDocument[];
}

export enum SkillRefs {
  SkillsCategory = 'skillsCategory',
  Projects = 'projects',
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
