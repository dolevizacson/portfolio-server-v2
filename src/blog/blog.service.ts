import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Image } from '../common/classes/Image';

import { CommonFiles } from '../common/enums/common-files.enum';
import { Helpers } from '../common/functions/helpers/helpers.functions';
import { CrudService } from '../common/mixins/crud-service.mixin';
import { CloudinaryService } from '../file-uploader/cloudinary.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { BlogPost } from './schemas/blog-post.schema';

@Injectable()
export class BlogService extends CrudService<
  BlogPost,
  CreateBlogPostDto,
  UpdateBlogPostDto
>(BlogPost) {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectConnection() private readonly connection: Connection,
    @Inject(CommonFiles.helpers) private readonly helpers: Helpers,
  ) {
    super();
  }

  update(id: string, updateBlogPostDto: UpdateBlogPostDto): Promise<BlogPost> {
    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        const { paragraphs: oldParagraphs } = await this.model
          .findById(id)
          .session(session)
          .exec();

        const updateBlogPost = await this.model
          .findByIdAndUpdate(id, updateBlogPostDto, { new: true })
          .session(session)
          .exec();

        const paragraphsIdsSet = new Set();

        for (const paragraph of updateBlogPost.paragraphs) {
          paragraphsIdsSet.add(paragraph._id);
        }

        const paragraphsToRemove = oldParagraphs.filter((paragraph) => {
          return !paragraphsIdsSet.has(paragraph._id);
        });

        for (const paragraph of paragraphsToRemove) {
          for (const image of paragraph.gallery) {
            await this.cloudinaryService.deleteImage(image.id);
          }
        }

        return updateBlogPost;
      },
    );
  }

  remove(id: string): Promise<void> {
    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        const { paragraphs } = await this.model
          .findById(id)
          .session(session)
          .exec();

        for (const paragraph of paragraphs) {
          for (const image of paragraph.gallery) {
            await this.cloudinaryService.deleteImage(image.id);
          }
        }

        await this.model.findByIdAndDelete(id).session(session).exec();
      },
    );
  }

  addParagraphImage(
    id: string,
    paragraphId: string,
    image: Image,
  ): Promise<BlogPost> {
    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        const blogPost = await this.model.findById(id).session(session).exec();
        const response = await this.cloudinaryService.uploadImage(image.url);

        blogPost.paragraphs = blogPost.paragraphs.map((paragraph) => {
          if (paragraph._id === paragraphId) {
            paragraph.gallery.push({
              ...image,
              url: response.url,
              id: response.public_id,
            });
          }
          return paragraph;
        });

        await blogPost.save();
        return blogPost;
      },
    );
  }

  removeParagraphImage(
    id: string,
    paragraphId: string,
    imageId: string,
  ): Promise<void> {
    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        const blogPost = await this.model.findById(id).session(session).exec();

        blogPost.paragraphs = blogPost.paragraphs.map((paragraph) => {
          if (paragraph._id === paragraphId) {
            paragraph.gallery = paragraph.gallery.filter((image) => {
              return image.id !== imageId;
            });
          }
          return paragraph;
        });

        await blogPost.save();
        await this.cloudinaryService.deleteImage(imageId);
      },
    );
  }
}
