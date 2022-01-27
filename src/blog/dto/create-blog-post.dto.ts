import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { Image } from '../../common/classes/Image';

export class Paragraph {
  @IsNotEmpty()
  header: string;

  @IsNotEmpty()
  body: string;

  gallery: Image[];
}

export class CreateBlogPostDto {
  @IsNotEmpty()
  header: string;

  @IsNotEmpty()
  summery: string;

  @ArrayNotEmpty()
  paragraphs: Paragraph[];

  conclusion: Paragraph;
}
