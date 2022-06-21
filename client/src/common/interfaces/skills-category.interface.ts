import { Base } from './base.interface';
import { Skill } from './skill.interface';

export interface SkillsCategory extends Base {
  _id: string;
  name: string;
  skills: Skill[];
}
