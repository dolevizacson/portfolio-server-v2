import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { CommonFiles } from '../common/enums/common-files.enum';
import { Helpers } from '../common/functions/helpers/helpers.functions';
import { ServiceFunctions } from '../common/functions/services/services.functions';
import { CrudService } from '../common/mixins/crud-service.mixin';
import { Project, ProjectDocument } from '../projects/schemas/project.schema';
import { Skill, SkillDocument } from '../skills/schemas/skill.schema';
import { CreateSkillsCategoryDto } from './dto/create-skills-category.dto';
import { UpdateSkillsCategoryDto } from './dto/update-skills-category.dto';
import { SkillsCategory } from './schemas/skills-category.schema';

@Injectable()
export class SkillsCategoriesService extends CrudService<
  SkillsCategory,
  CreateSkillsCategoryDto,
  UpdateSkillsCategoryDto
>(SkillsCategory) {
  constructor(
    @InjectModel(Skill.name)
    private readonly skillModel: Model<SkillDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectConnection() private readonly connection: Connection,
    @Inject(CommonFiles.helpers) private readonly helpers: Helpers,
    @Inject(CommonFiles.services)
    private readonly serviceFunction: ServiceFunctions,
  ) {
    super();
  }

  async remove(skillCategoryId: string): Promise<void> {
    return this.helpers.mongooseTransaction(
      this.connection,
      async (session) => {
        const { skills } = await this.model
          .findById(skillCategoryId)
          .session(session)
          .exec();

        for (const id of skills) {
          await this.serviceFunction.removeSkill(
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
