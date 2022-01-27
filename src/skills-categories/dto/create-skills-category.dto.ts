import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateSkillsCategoryDto {
  @IsNotEmpty()
  name: string;

  skills: mongoose.Types.ObjectId[];
}
