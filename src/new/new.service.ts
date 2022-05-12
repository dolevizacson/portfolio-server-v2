import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { Image } from '../common/classes/Image';
import { IClassProp } from '../common/mixins/crud-service.mixin';
import { CloudinaryService } from '../file-uploader/cloudinary.service';
import { HelperFunctionsService } from '../utils/helper-functions.service';
import { ServiceFunctionService } from '../utils/service-functions.service';
import { NewBlogPost } from './schemas/new-blog-post.schema';
import { NewProject } from './schemas/new-project.schema';

@Injectable()
export class NewService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly helperFunctionsService: HelperFunctionsService,
    private readonly serviceFunctionsService: ServiceFunctionService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async createNew<Item>(item: IClassProp<Item>): Promise<Item> {
    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        const newDocument = await this.serviceFunctionsService.getNewDocument(
          session,
        );
        const key = this.helperFunctionsService.toFirstLowerLetter(item.name);

        if (!newDocument[key]) {
          newDocument[key] = new item();
        }

        await newDocument.save();
        return newDocument[key];
      },
    );
  }

  async updateNew<Item, ItemDto>(
    item: IClassProp<Item>,
    itemDto: ItemDto,
  ): Promise<Item> {
    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        const newDocument = await this.serviceFunctionsService.getNewDocument(
          session,
        );
        const key = this.helperFunctionsService.toFirstLowerLetter(item.name);

        newDocument[key] = { ...itemDto };

        await newDocument.save();
        return newDocument[key];
      },
    );
  }

  async removeNew<Item>(item: IClassProp<Item>): Promise<void> {
    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        const newDocument = await this.serviceFunctionsService.getNewDocument(
          session,
        );
        const key = this.helperFunctionsService.toFirstLowerLetter(item.name);

        newDocument[key] = undefined;
        await newDocument.save();
      },
    );
  }

  async removeNewProject(): Promise<void> {
    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        return await this.serviceFunctionsService.removeNewProject(session);
      },
    );
  }

  async addNewProjectImage(image: Image): Promise<NewProject> {
    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        const newDocument = await this.serviceFunctionsService.getNewDocument(
          session,
        );
        const response = await this.cloudinaryService.uploadImage(image.url);

        newDocument.newProject.images.push({
          ...image,
          url: response.url,
          id: response.public_id,
        });

        await newDocument.save();
        return newDocument.newProject;
      },
    );
  }

  async removeNewProjectImage(id: string): Promise<void> {
    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        const newDocument = await this.serviceFunctionsService.getNewDocument(
          session,
        );

        newDocument.newProject.images = newDocument.newProject.images.filter(
          (image) => {
            return image.id !== id;
          },
        );

        await newDocument.save();
      },
    );
  }

  async removeNewBlogPost(): Promise<void> {
    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        return await this.serviceFunctionsService.removeNewBlogPost(session);
      },
    );
  }

  async addNewBlogPostParagraphImage(
    id: string,
    image: Image,
  ): Promise<NewBlogPost> {
    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        const newDocument = await this.serviceFunctionsService.getNewDocument(
          session,
        );

        const paragraphIdsArray = newDocument.newBlogPost.paragraphs.map(
          (paragraph) => {
            return paragraph._id.toString();
          },
        );

        if (!paragraphIdsArray.includes(id)) {
          throw new HttpException('Paragraph not found', HttpStatus.NOT_FOUND);
        }

        const response = await this.cloudinaryService.uploadImage(image.url);

        newDocument.newBlogPost.paragraphs =
          newDocument.newBlogPost.paragraphs.map((paragraph) => {
            if (paragraph._id.toString() === id) {
              paragraph.gallery.push({
                ...image,
                url: response.url,
                id: response.public_id,
              });
            }
            return paragraph;
          });

        await newDocument.save();
        return newDocument.newBlogPost;
      },
    );
  }

  async removeNewBlogPostParagraphImage(
    id: string,
    imageId: string,
  ): Promise<void> {
    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        const newDocument = await this.serviceFunctionsService.getNewDocument(
          session,
        );

        newDocument.newBlogPost.paragraphs =
          newDocument.newBlogPost.paragraphs.map((paragraph) => {
            if (paragraph._id.toString() === id) {
              paragraph.gallery = paragraph.gallery.filter((image) => {
                return image.id !== imageId;
              });
            }
            return paragraph;
          });

        await newDocument.save();
        await this.cloudinaryService.deleteImage(imageId);
      },
    );
  }
}
