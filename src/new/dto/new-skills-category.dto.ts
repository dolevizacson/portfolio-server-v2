import mongoose from 'mongoose';

export class NewSkillsCategoryDto {
  name?: string;

  skills?: mongoose.Types.ObjectId[];
}
