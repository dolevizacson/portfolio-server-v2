import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Cloudinary from 'cloudinary';
import * as fs from 'fs/promises';

import { CloudinaryService } from './cloudinary.service';
import { Libs } from '../common/enums/external-libs.enum';
import { FilesService } from './files.service';

@Module({
  providers: [
    CloudinaryService,
    FilesService,
    {
      provide: Libs.cloudinary,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): typeof Cloudinary => {
        Cloudinary.v2.config(configService.get('cloudinaryConfigOptions'));
        return Cloudinary;
      },
    },
    {
      provide: Libs.fs,
      useValue: fs,
    },
  ],
  exports: [CloudinaryService, FilesService],
})
export class FileUploaderModule {}
