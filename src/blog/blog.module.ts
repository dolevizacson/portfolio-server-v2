import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';

import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPost, BlogPostSchema } from './schemas/blog-post.schema';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name, schema: BlogPostSchema },
    ]),
    FileUploaderModule,
    UtilsModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
