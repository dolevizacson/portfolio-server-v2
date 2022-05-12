import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, SaveOptions } from 'mongoose';

import { CloudinaryService } from '../file-uploader/cloudinary.service';
import { New, NewDocument } from '../new/schemas/new.schema';
import {
  ProjectDocument,
  ProjectRefs,
} from '../projects/schemas/project.schema';
import {
  SkillsCategoryDocument,
  SkillsCategoryRefs,
} from '../skills-categories/schemas/skills-category.schema';
import { SkillDocument, SkillRefs } from '../skills/schemas/skill.schema';

export class ServiceFunctionService {
  constructor(
    @InjectModel(New.name) private readonly newModel: Model<NewDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async removeSkill(
    skillId: string,
    session: ClientSession,
    skillModel: Model<SkillDocument>,
    skillCategoryModel: Model<SkillsCategoryDocument>,
    projectModel: Model<ProjectDocument>,
  ): Promise<void> {
    const { skillsCategory, projects } = await skillModel
      .findById(skillId)
      .populate({ path: SkillRefs.SkillsCategory })
      .populate({ path: SkillRefs.Projects })
      .session(session)
      .exec();

    await skillCategoryModel
      .findByIdAndUpdate(skillsCategory._id, {
        $pull: { [SkillsCategoryRefs.Skills]: skillId },
      })
      .session(session)
      .exec();

    for (const { _id: id } of projects) {
      await projectModel
        .findByIdAndUpdate(id, {
          $pull: { [ProjectRefs.Technologies]: skillId },
        })
        .session(session)
        .exec();
    }
    await skillModel.findByIdAndDelete(skillId).session(session).exec();
  }

  async getNewDocument(session?: ClientSession): Promise<NewDocument> {
    const query = this.newModel.findOne();

    if (session) {
      query.session(session);
    }

    const newDocument = await query.exec();
    const sessionOptions: SaveOptions = {};

    if (session) {
      sessionOptions.session = session;
    }

    if (!newDocument) {
      const [document] = await this.newModel.create([{}], sessionOptions);
      return document;
    }
    return newDocument;
  }

  async removeNewProject(session: ClientSession): Promise<void> {
    const newDocument = await this.getNewDocument(session);
    if (newDocument?.newProject?.images) {
      for (const image of newDocument.newProject.images) {
        await this.cloudinaryService.deleteImage(image.id);
      }
    }
    newDocument.newProject = undefined;
    await newDocument.save();
  }

  async removeNewBlogPost(session: ClientSession): Promise<void> {
    const newDocument = await this.getNewDocument(session);
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
}
