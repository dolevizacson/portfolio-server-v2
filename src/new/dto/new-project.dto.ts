import mongoose from 'mongoose';

export class NewProjectDto {
  header?: string;

  summery?: string;

  description?: string;

  links?: Link[];

  technologies?: mongoose.Types.ObjectId[];
}
class Link {
  name?: string;

  url?: string;
}
