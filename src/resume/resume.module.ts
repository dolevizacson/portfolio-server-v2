import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as fs from 'fs';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { Resume, ResumeSchema } from './schemas/resume.schema';
import { Libs } from '../common/enums/external-libs.enum';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
    FileUploaderModule,
    UtilsModule,
  ],
  controllers: [ResumeController],
  providers: [
    ResumeService,
    {
      provide: Libs.fs,
      useValue: fs,
    },
  ],
})
export class ResumeModule {}
