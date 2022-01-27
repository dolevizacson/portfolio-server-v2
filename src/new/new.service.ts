import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Image } from '../common/classes/Image';
import { IClassProp } from '../common/mixins/crud-service.mixin';
import { CloudinaryService } from '../file-uploader/cloudinary.service';
import { NewBlogPost } from './schemas/new-blog-post.schema';
import { NewProject } from './schemas/new-project.schema';
import { New, NewDocument } from './schemas/new.schema';

@Injectable()
export class NewService {
  constructor(
    @InjectModel(New.name) private readonly newModel: Model<NewDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getNewDocument(): Promise<NewDocument> {
    const [newDocument] = await this.newModel.find();
    if (!newDocument) {
      return await this.newModel.create({});
    }
    return newDocument;
  }

  toFirstLowerLetter(name: string): string {
    const stringArray = name.split('');
    stringArray[0] = stringArray[0].toLowerCase();
    return stringArray.join('');
  }

  async createNew<Item>(item: IClassProp<Item>): Promise<Item> {
    const newDocument = await this.getNewDocument();
    const key = this.toFirstLowerLetter(item.name);

    if (!newDocument[key]) {
      newDocument[key] = new item();
    }

    await newDocument.save();
    return newDocument[key];
  }

  async updateNew<Item, ItemDto>(
    item: IClassProp<Item>,
    itemDto: ItemDto,
  ): Promise<Item> {
    const newDocument = await this.getNewDocument();
    const key = this.toFirstLowerLetter(item.name);

    newDocument[key] = { ...itemDto };

    await newDocument.save();
    return newDocument[key];
  }

  async removeNew<Item>(item: IClassProp<Item>): Promise<void> {
    const newDocument = await this.getNewDocument();
    const key = this.toFirstLowerLetter(item.name);

    newDocument[key] = undefined;
    await newDocument.save();
  }

  async removeNewProject(): Promise<void> {
    const newDocument = await this.getNewDocument();
    if (newDocument?.newProject?.images) {
      for (const image of newDocument.newProject.images) {
        await this.cloudinaryService.deleteImage(image.id);
      }
    }
    newDocument.newProject = undefined;
    await newDocument.save();
  }

  async addNewProjectImage(image: Image): Promise<NewProject> {
    const newDocument = await this.getNewDocument();
    const response = await this.cloudinaryService.uploadImage(image.url);

    newDocument.newProject.images.push({
      ...image,
      url: response.url,
      id: response.public_id,
    });

    await newDocument.save();
    return newDocument.newProject;
  }

  async removeNewProjectImage(id: string): Promise<void> {
    const newDocument = await this.getNewDocument();

    newDocument.newProject.images = newDocument.newProject.images.filter(
      (image) => {
        return image.id !== id;
      },
    );

    await newDocument.save();
  }

  async removeNewBlogPost(): Promise<void> {
    const newDocument = await this.getNewDocument();
    const paragraphToRemove = newDocument?.newBlogPost?.paragraphs;

    if (paragraphToRemove) {
      for (const paragraph of paragraphToRemove) {
        if (paragraph.gallery) {
          for (const image of paragraph.gallery) {
            await this.cloudinaryService.deleteImage(image.id);
          }
        }
      }
    }

    newDocument.newBlogPost = undefined;
    await newDocument.save();
  }

  async addNewBlogPostParagraphImage(
    id: string,
    image: Image,
  ): Promise<NewBlogPost> {
    const newDocument = await this.getNewDocument();
    const response = await this.cloudinaryService.uploadImage(image.url);

    newDocument.newBlogPost.paragraphs = newDocument.newBlogPost.paragraphs.map(
      (paragraph) => {
        if (paragraph._id.toString() === id) {
          paragraph.gallery.push({
            ...image,
            url: response.url,
            id: response.public_id,
          });
        }
        return paragraph;
      },
    );

    await newDocument.save();
    return newDocument.newBlogPost;
  }

  async removeNewBlogPostParagraphImage(
    id: string,
    imageId: string,
  ): Promise<void> {
    const newDocument = await this.getNewDocument();

    newDocument.newBlogPost.paragraphs = newDocument.newBlogPost.paragraphs.map(
      (paragraph) => {
        if (paragraph._id.toString() === id) {
          paragraph.gallery = paragraph.gallery.filter((image) => {
            return image.id !== imageId;
          });
        }
        return paragraph;
      },
    );

    await newDocument.save();
  }
}
