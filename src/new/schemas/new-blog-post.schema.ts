import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Image } from '../../common/schemas/image.schema';

export type NewBlogPostDocument = NewBlogPost & mongoose.Document;

@Schema()
export class NewParagraph extends mongoose.Types.Subdocument {
  @Prop()
  header?: string;

  @Prop()
  body?: string;

  @Prop([Image])
  gallery: Image[];
}

export const NewParagraphSchema = SchemaFactory.createForClass(NewParagraph);

@Schema()
export class NewBlogPost {
  @Prop()
  header?: string;

  @Prop()
  summery?: string;

  @Prop({
    type: [NewParagraphSchema],
  })
  paragraphs: NewParagraph[];
}

export const NewBlogPostSchema = SchemaFactory.createForClass(NewBlogPost);
