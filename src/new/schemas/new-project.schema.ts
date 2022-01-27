import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Image } from '../../common/classes/Image';

export type NewProjectDocument = NewProject & Document;

class Link {
  @Prop()
  name: string;

  @Prop()
  url: string;
}

@Schema()
export class NewProject {
  @Prop()
  header?: string;

  @Prop()
  summery?: string;

  @Prop()
  description?: string;

  @Prop([Link])
  links?: Link[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
  })
  technologies?: mongoose.Types.ObjectId[];

  @Prop([Image])
  images?: Image[];
}

export const newProjectSchema = SchemaFactory.createForClass(NewProject);
