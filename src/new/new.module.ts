import { Module } from '@nestjs/common';

import { NewService } from './new.service';
import { NewController } from './new.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { New, newSchema } from './schemas/new.schema';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: New.name, schema: newSchema }]),
    FileUploaderModule,
  ],
  controllers: [NewController],
  providers: [NewService],
})
export class NewModule {}
