import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as fs from 'fs';

import { CommonFiles } from '../common/enums/common-files.enum';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { Resume, ResumeSchema } from './schemas/resume.schema';
import * as helpers from '../common/functions/helpers/helpers.functions';
import { Libs } from '../common/enums/external-libs.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
    FileUploaderModule,
  ],
  controllers: [ResumeController],
  providers: [
    ResumeService,
    { provide: CommonFiles.helpers, useValue: helpers },
    {
      provide: Libs.fs,
      useValue: fs,
    },
  ],
})
export class ResumeModule {}
