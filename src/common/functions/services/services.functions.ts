import { ClientSession, Model } from 'mongoose';

import {
  ProjectDocument,
  ProjectRefs,
} from '../../../projects/schemas/project.schema';
import {
  SkillsCategoryDocument,
  SkillsCategoryRefs,
} from '../../../skills-categories/schemas/skills-category.schema';
import { SkillDocument, SkillRefs } from '../../../skills/schemas/skill.schema';

export interface ServiceFunctions {
  removeSkill: (
    skillId: string,
    session: ClientSession,
    skillModel: Model<SkillDocument>,
    skillCategoryModel: Model<SkillsCategoryDocument>,
    projectModel: Model<ProjectDocument>,
  ) => Promise<void>;
}

export const removeSkill = async (
  skillId: string,
  session: ClientSession,
  skillModel: Model<SkillDocument>,
  skillCategoryModel: Model<SkillsCategoryDocument>,
  projectModel: Model<ProjectDocument>,
): Promise<void> => {
  const { skillCategory, projects } = await skillModel
    .findById(skillId)
    .populate({ path: SkillRefs.SkillCategory })
    .populate({ path: SkillRefs.Projects })
    .session(session)
    .exec();

  await skillCategoryModel
    .findByIdAndUpdate(skillCategory._id, {
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
};
