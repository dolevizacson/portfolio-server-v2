import mongoose from 'mongoose';
export class NewSkillDto {
  name?: string;

  attributes?: string[];

  skillsCategory?: mongoose.Types.ObjectId;
}
