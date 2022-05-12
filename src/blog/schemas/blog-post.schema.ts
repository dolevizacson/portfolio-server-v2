import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Base } from '../../common/schemas/base.schema';
import { Image } from '../../common/schemas/image.schema';

export type BlogPostDocument = BlogPost & mongoose.Document;

@Schema()
export class Paragraph extends mongoose.Types.Subdocument {
  @Prop({ required: true })
  header: string;

  @Prop({ required: true })
  body: string;

  @Prop([Image])
  gallery: Image[];
}

export const ParagraphSchema = SchemaFactory.createForClass(Paragraph);

@Schema()
export class Conclusion extends mongoose.Types.Subdocument {
  @Prop()
  header: string;

  @Prop()
  body: string;
}

@Schema()
export class BlogPost extends Base {
  @Prop({ required: true })
  header: string;

  @Prop({ required: true })
  summery: string;

  @Prop({
    type: [ParagraphSchema],
    validate: (val: Paragraph[]) => val.length > 0,
  })
  paragraphs: Paragraph[];

  @Prop()
  conclusion: Conclusion;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
