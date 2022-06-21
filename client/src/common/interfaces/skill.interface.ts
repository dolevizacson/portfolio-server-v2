import { Base } from './base.interface';
import { Project } from './project.interface';

export interface Skill extends Base {
  _id: string;
  name: string;
  attributes: string[];
  skillsCategory: string;
  projects: Project[];
}
