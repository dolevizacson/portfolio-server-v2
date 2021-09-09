import { ArrayNotEmpty, IsDataURI, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  header: string;

  @IsNotEmpty()
  summery: string;

  @IsNotEmpty()
  description: string;

  links: Links[];

  @ArrayNotEmpty()
  technologies: string[];
}

class Links {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDataURI()
  url: string;
}
