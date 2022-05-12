import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CrudService } from '../common/mixins/crud-service.mixin';
import { NewSkillsCategory } from '../new/schemas/new-skills-category.schema';
import { Project, ProjectDocument } from '../projects/schemas/project.schema';
import { Skill, SkillDocument } from '../skills/schemas/skill.schema';
import { CreateSkillsCategoryDto } from './dto/create-skills-category.dto';
import { UpdateSkillsCategoryDto } from './dto/update-skills-category.dto';
import { SkillsCategory } from './schemas/skills-category.schema';

@Injectable()
export class SkillsCategoriesService extends CrudService<
  SkillsCategory,
  NewSkillsCategory,
  CreateSkillsCategoryDto,
  UpdateSkillsCategoryDto
>(SkillsCategory, NewSkillsCategory) {
  constructor(
    @InjectModel(Skill.name)
    private readonly skillModel: Model<SkillDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {
    super();
  }

  async remove(skillCategoryId: string): Promise<void> {
    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        const { skills } = await this.model
          .findById(skillCategoryId)
          .session(session)
          .exec();

        for (const id of skills) {
          await this.serviceFunctionsService.removeSkill(
            id.toString(),
            session,
            this.skillModel,
            this.model,
            this.projectModel,
          );
        }

        await this.model
          .findByIdAndDelete(skillCategoryId)
          .session(session)
          .exec();
      },
    );
  }
}
