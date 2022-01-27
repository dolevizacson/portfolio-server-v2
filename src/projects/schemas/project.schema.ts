import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Image } from '../../common/classes/Image';
import { Databases } from '../../common/enums/databases.enum';
import { Base } from '../../common/schemas/base.schema';
import { SkillDocument } from '../../skills/schemas/skill.schema';

export type ProjectDocument = Project & Document;

class Link {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;
}

@Schema()
export class Project extends Base {
  @Prop({ required: true })
  header: string;

  @Prop({ required: true })
  summery: string;

  @Prop({ required: true })
  description: string;

  @Prop([Link])
  links: Link[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Databases.skills,
      },
    ],
    validate: (val: SkillDocument[]) => val.length > 0,
  })
  technologies: SkillDocument[];

  @Prop([Image])
  images: Image[];
}

export enum ProjectRefs {
  Technologies = 'technologies',
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
