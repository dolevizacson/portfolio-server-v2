import { StringArray } from './string-array.interface';

export interface SkillForm {
  name: string;
  attributes: StringArray[];
  skillsCategory: string;
}
