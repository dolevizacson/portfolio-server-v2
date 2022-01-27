import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NewBlogPost } from './new-blog-post.schema';

import { NewProject } from './new-project.schema';
import { NewSkill } from './new-skill.schema';
import { NewSkillsCategory } from './new-skills-category.schema';
import { NewTask } from './new-task.schema';

export type NewDocument = New & Document;

@Schema({ collection: 'new' })
export class New {
  @Prop()
  newTask?: NewTask;

  @Prop()
  newProject?: NewProject;

  @Prop()
  newSkill?: NewSkill;

  @Prop()
  newSkillsCategory?: NewSkillsCategory;

  @Prop()
  newBlogPost?: NewBlogPost;
}

export const newSchema = SchemaFactory.createForClass(New);
