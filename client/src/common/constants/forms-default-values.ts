import { CreateBlogPost } from '../interfaces/create-blog-post.interface';
import { CreateSkillsCategory } from '../interfaces/create-skills-category.interface';
import { CreateTask } from '../interfaces/create-task.interface';
import { Image } from '../interfaces/image.interface';
import { BlogPostImage } from '../interfaces/blog-post-image.interface';
import { SkillForm } from '../interfaces/skill-form.interface';
import { CreateProject } from '../interfaces/create-project.interface';
import { CreateMail } from '../interfaces/create-mail.interface';
import { CreateResume } from '../interfaces/create-resume.interface';
import { UpdateTask } from '../interfaces/update-task.interface';
import { UserForm } from '../interfaces/user-form.interface';

export const taskFormDefaultValue: CreateTask = {
  header: '',
  description: '',
};

export const updateTaskFormDefaultValue: UpdateTask = {
  header: '',
  description: '',
  isDone: 0,
};

export const skillsCategoryFormDefaultValue: CreateSkillsCategory = {
  name: '',
};

export const skillFormDefaultValue: SkillForm = {
  name: '',
  attributes: [],
  skillsCategory: '',
};

export const projectFormDefaultValue: CreateProject = {
  header: '',
  summery: '',
  description: '',
  links: [],
  technologies: [],
  images: [],
};

export const blogPostFormDefaultValue: CreateBlogPost = {
  header: '',
  summery: '',
  paragraphs: [],
  conclusion: {
    header: '',
    body: '',
  },
};

export const imageFormDefaultValue: Image = {
  url: '',
  secure_url: '',
  description: '',
  id: '',
};

export const blogPostImageFormDefaultValue: BlogPostImage = {
  url: '',
  secure_url: '',
  description: '',
  id: '',
  paragraphId: '',
};

export const contactFormDefaultValue: CreateMail = {
  name: '',
  from: '',
  subject: '',
  text: '',
};

export const resumeFormDefaultValue: CreateResume = {
  name: '',
};

export const userFormDefaultValue: UserForm = {
  username: '',
  password: '',
};
