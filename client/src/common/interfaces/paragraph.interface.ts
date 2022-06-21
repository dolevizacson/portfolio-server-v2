import { Image } from './image.interface';

export interface Paragraph {
  _id: string;
  header: string;
  body: string;
  gallery?: Image[];
}
