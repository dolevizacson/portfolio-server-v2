import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Document, Model } from 'mongoose';

import { Image } from '../common/classes/Image';
import { CommonFiles } from '../common/enums/common-files.enum';
import { Helpers } from '../common/functions/helpers/helpers.functions';
import { CrudService } from '../common/mixins/crud-service.mixin';
import { CloudinaryService } from '../file-uploader/cloudinary.service';
import { Skill, SkillRefs } from '../skills/schemas/skill.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectRefs } from './schemas/project.schema';

@Injectable()
export class ProjectsService extends CrudService<
  Project,
  CreateProjectDto,
  UpdateProjectDto
>(Project) {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel(Skill.name)
    private readonly skillsModel: Model<Skill & Document>,
    @InjectConnection() private readonly connection: Connection,
    @Inject(CommonFiles.helpers) private readonly helpers: Helpers,
  ) {
    super();
  }

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        const { technologies: skillsIds, ...projectProperties } =
          createProjectDto;

        const skills = await this.skillsModel
          .find({ _id: { $in: skillsIds } })
          .populate({ path: SkillRefs.Projects })
          .session(session)
          .exec();

        const [newProject] = await this.model.create(
          [{ ...projectProperties, technologies: skills }],
          {
            session,
          },
        );

        for (const skill of skills) {
          skill.projects.push(newProject._id);
          await skill.save();
        }

        return newProject;
      },
    );
  }

  update(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const { technologies: skillsIds, ...projectProperties } = updateProjectDto;

    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        const { technologies: oldTechnologies } = await this.model
          .findById(projectId)
          .populate({
            path: ProjectRefs.Technologies,
            populate: { path: SkillRefs.Projects },
          })
          .session(session)
          .exec();

        for (const skill of oldTechnologies) {
          skill.projects = skill.projects.filter((project) => {
            return project._id.toString() !== projectId;
          });
          await skill.save();
        }

        const technologies = await Promise.all(
          skillsIds.map(async (skillId) => {
            return await this.skillsModel
              .findById(skillId)
              .session(session)
              .exec();
          }),
        );

        const updatedProject = await this.model
          .findByIdAndUpdate(
            projectId,
            {
              ...projectProperties,
              technologies,
            },
            { new: true },
          )
          .session(session)
          .exec();

        for (const skill of technologies) {
          skill.projects.push(updatedProject._id);
          await skill.save();
        }

        return updatedProject;
      },
    );
  }

  async remove(projectId: string): Promise<void> {
    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        const { technologies, images } = await this.model
          .findById(projectId)
          .populate({
            path: ProjectRefs.Technologies,
            populate: { path: SkillRefs.Projects },
          })
          .session(session)
          .exec();

        for (const skill of technologies) {
          skill.projects = skill.projects.filter((project) => {
            return project._id.toString() !== projectId;
          });
          await skill.save();
        }

        for (const image of images) {
          await this.cloudinaryService.deleteImage(image.id);
        }

        await this.model.findByIdAndDelete(projectId).session(session).exec();
      },
    );
  }

  createImage(id: string, image: Image): Promise<Project> {
    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        const project = await this.model.findById(id).session(session).exec();
        const response = await this.cloudinaryService.uploadImage(image.url);

        project.images.push({
          ...image,
          url: response.url,
          id: response.public_id,
        });
        await project.save();
        return project;
      },
    );
  }

  removeImage(id: string, imageId: string): Promise<void> {
    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        await this.model
          .findByIdAndUpdate(id, {
            $pull: { images: { id: imageId } },
          })
          .session(session)
          .exec();

        await this.cloudinaryService.deleteImage(imageId);
      },
    );
  }
}
