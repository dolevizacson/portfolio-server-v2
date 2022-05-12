import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CrudService } from '../common/mixins/crud-service.mixin';
import { NewSkill } from '../new/schemas/new-skill.schema';
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
  NewSkill,
  CreateSkillDto,
  UpdateSkillDto
>(Skill, NewSkill) {
  constructor(
    @InjectModel(SkillsCategory.name)
    private readonly skillCategoryModel: Model<SkillsCategoryDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {
    super();
  }

  create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const { skillsCategory: skillsCategoryId, ...skillProperties } =
      createSkillDto;

    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        const skillsCategory = await this.skillCategoryModel
          .findById(skillsCategoryId)
          .session(session)
          .exec();

        const [newSkill] = await this.model.create(
          [
            {
              ...skillProperties,
              skillsCategory,
            },
          ],
          { session },
        );

        skillsCategory[SkillsCategoryRefs.Skills].push(newSkill._id);
        await skillsCategory.save();

        const newDocument = await this.serviceFunctionsService.getNewDocument(
          session,
        );

        const key = this.helperFunctionsService.toFirstLowerLetter(
          NewSkill.name,
        );

        newDocument[key] = undefined;
        await newDocument.save();

        return newSkill;
      },
    );
  }

  update(skillId: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const { skillsCategory: newSkillsCategoryId, ...updatedSkillProperties } =
      updateSkillDto;

    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        const { skillsCategory: oldSkillCategory } = await this.model
          .findById(skillId)
          .session(session)
          .exec();

        await this.skillCategoryModel
          .findByIdAndUpdate(oldSkillCategory._id, {
            $pull: { [SkillsCategoryRefs.Skills]: skillId },
          })
          .session(session)
          .exec();

        const skillsCategory = await this.skillCategoryModel
          .findById(newSkillsCategoryId)
          .session(session)
          .exec();

        const updatedSkill = await this.model
          .findByIdAndUpdate(
            skillId,
            {
              ...updatedSkillProperties,
              skillsCategory,
            },
            { new: true },
          )
          .session(session)
          .exec();

        skillsCategory.skills.push(updatedSkill._id);
        await skillsCategory.save();

        return updatedSkill;
      },
    );
  }

  remove(skillId: string): Promise<void> {
    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        await this.serviceFunctionsService.removeSkill(
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
