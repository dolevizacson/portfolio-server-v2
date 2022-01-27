import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';

import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPost, BlogPostSchema } from './schemas/blog-post.schema';
import * as helpers from '../common/functions/helpers/helpers.functions';
import { CommonFiles } from '../common/enums/common-files.enum';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name, schema: BlogPostSchema },
    ]),
    FileUploaderModule,
  ],
  controllers: [BlogController],
  providers: [
    BlogService,
    {
      provide: CommonFiles.helpers,
      useValue: helpers,
    },
  ],
})
export class BlogModule {}
