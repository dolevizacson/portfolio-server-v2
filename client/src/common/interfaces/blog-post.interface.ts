import { Base } from './base.interface';
import { Paragraph } from './paragraph.interface';

export interface BlogPost extends Base {
  _id: string;
  header: string;
  summery: string;
  paragraphs: Paragraph[];
  conclusion?: Paragraph;
}
