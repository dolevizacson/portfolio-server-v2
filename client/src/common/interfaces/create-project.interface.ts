import { Image } from './image.interface';

export interface CreateProject {
  header: string;
  summery: string;
  description: string;
  links: CreateLink[];
  technologies: string[];
  images: Image[];
}

export interface CreateLink {
  name: string;
  url: string;
}
