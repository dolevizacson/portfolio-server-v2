import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CommonFiles } from '../common/enums/common-files.enum';

import { Helpers } from '../common/functions/helpers/helpers.functions';
import { ServiceFunctions } from '../common/functions/services/services.functions';
import { CrudService } from '../common/mixins/crud-service.mixin';
import { Project, ProjectDocument } from '../projects/schemas/project.schema';
import {
  SkillsCategory,
  SkillsCategoryDocument,
  SkillsCategoryRefs,
} from '../skills-categories/schemas/skills-category.schema';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './schemas/skill.schema';

@Injectable()
export class SkillsService extends CrudService<
  Skill,
  CreateSkillDto,
  UpdateSkillDto
>(Skill) {
  constructor(
    @InjectModel(SkillsCategory.name)
    private readonly skillCategoryModel: Model<SkillsCategoryDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectConnection() private readonly connection: Connection,
    @Inject(CommonFiles.helpers) private readonly helpers: Helpers,
    @Inject(CommonFiles.services)
    private readonly serviceFunctions: ServiceFunctions,
  ) {
    super();
  }

  create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const { skillCategoryId, ...skillProperties } = createSkillDto;

    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        const skillCategory = await this.skillCategoryModel
          .findById(skillCategoryId)
          .session(session)
          .exec();

        const [newSkill] = await this.model.create(
          [
            {
              ...skillProperties,
              skillCategory,
            },
          ],
          { session },
        );

        skillCategory[SkillsCategoryRefs.Skills].push(newSkill._id);
        await skillCategory.save();

        return newSkill;
      },
    );
  }

  update(skillId: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const { skillCategoryId: newSkillCategoryId, ...updatedSkillProperties } =
      updateSkillDto;

    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        const { skillCategory: oldSkillCategory } = await this.model
          .findById(skillId)
          .session(session)
          .exec();

        await this.skillCategoryModel
          .findByIdAndUpdate(oldSkillCategory._id, {
            $pull: { [SkillsCategoryRefs.Skills]: skillId },
          })
          .session(session)
          .exec();

        const skillCategory = await this.skillCategoryModel
          .findById(newSkillCategoryId)
          .session(session)
          .exec();

        const updatedSkill = await this.model
          .findByIdAndUpdate(
            skillId,
            {
              ...updatedSkillProperties,
              skillCategory,
            },
            { new: true },
          )
          .session(session)
          .exec();

        skillCategory.skills.push(updatedSkill._id);
        await skillCategory.save();

        return updatedSkill;
      },
    );
  }

  remove(skillId: string): Promise<void> {
    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        await this.serviceFunctions.removeSkill(
          skillId,
          session,
          this.model,
          this.skillCategoryModel,
          this.projectModel,
        );
      },
    );
  }
}
