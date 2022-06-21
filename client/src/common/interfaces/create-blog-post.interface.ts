import { Paragraph } from './paragraph.interface';

export interface CreateBlogPost {
  header: string;
  summery: string;
  paragraphs: Paragraph[];
  conclusion: Omit<Paragraph, '_id' | 'gallery'>;
}
