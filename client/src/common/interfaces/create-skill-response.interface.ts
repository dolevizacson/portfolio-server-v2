import { Base } from './base.interface';
import { Project } from './project.interface';
import { SkillsCategory } from './skills-category.interface';

export interface CreateSkillResponse extends Base {
  _id: string;
  name: string;
  attributes: string[];
  skillsCategory: SkillsCategory;
  projects: Project[];
}
