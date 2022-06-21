import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Base } from '../../common/schemas/base.schema';

export type ResumeDocument = Resume & Document;

export class FileType {
  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true })
  extension: string;
}

@Schema({ timestamps: true })
export class Resume extends Base {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nameOnDisk: string;

  @Prop({ required: true })
  fileType: FileType;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
