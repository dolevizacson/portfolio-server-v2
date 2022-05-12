import { Module } from '@nestjs/common';

import { NewService } from './new.service';
import { NewController } from './new.controller';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [FileUploaderModule, UtilsModule],
  controllers: [NewController],
  providers: [NewService],
  exports: [NewService],
})
export class NewModule {}
