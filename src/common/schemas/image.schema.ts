import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Image {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  id: string;
}

export const BaseSchema = SchemaFactory.createForClass(Image);
