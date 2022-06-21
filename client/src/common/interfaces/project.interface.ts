import { Base } from './base.interface';
import { Image } from './image.interface';
import { Skill } from './skill.interface';

export interface Project extends Base {
  _id: string;
  header: string;
  summery: string;
  description: string;
  links: Link[];
  technologies: Skill[];
  images: Image[];
}

interface Link {
  name: string;
  url: string;
}
