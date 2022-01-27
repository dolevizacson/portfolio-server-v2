import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateSkillDto {
  @IsNotEmpty()
  name: string;

  @ArrayNotEmpty()
  attributes: string[];

  @IsNotEmpty()
  skillCategoryId: mongoose.Types.ObjectId;
}
