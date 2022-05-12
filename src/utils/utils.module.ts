import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';
import { New, newSchema } from '../new/schemas/new.schema';
import { HelperFunctionsService } from './helper-functions.service';
import { ServiceFunctionService } from './service-functions.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: New.name, schema: newSchema }]),
    FileUploaderModule,
  ],
  providers: [HelperFunctionsService, ServiceFunctionService],
  exports: [HelperFunctionsService, ServiceFunctionService],
})
export class UtilsModule {}
