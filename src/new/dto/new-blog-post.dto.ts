import { Image } from '../../common/classes/Image';

export class NewBlgPostDto {
  header?: string;

  summery?: string;

  paragraphs?: Paragraph[];

  conclusion?: Paragraph;
}

class Paragraph {
  header?: string;

  body?: string;

  gallery?: Image[];
}
