import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateSkillDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  attributes: string[];

  @IsNotEmpty()
  skillsCategory: mongoose.Types.ObjectId;
}
