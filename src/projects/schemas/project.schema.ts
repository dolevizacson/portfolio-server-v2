import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from '../../common/schemas/base.schema';

export type ProjectDocument = Project & Document;

export class Links {
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

  @Prop([Links])
  links: Links[];

  @Prop({
    type: [String],
    validate: (val: string[]) => val.length > 0,
  })
  technologies: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
