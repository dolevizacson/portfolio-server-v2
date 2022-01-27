import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateProjectDto {
  @IsNotEmpty()
  header: string;

  @IsNotEmpty()
  summery: string;

  @IsNotEmpty()
  description: string;

  links: Link[];

  @ArrayNotEmpty()
  technologies: mongoose.Types.ObjectId[];
}

class Link {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  url: string;
}
