export type EndPoints = {
  baseUrl: string;
  active: string;
  new: string;
  image: string;

  auth: string;
  signIn: string;
  signOut: string;
  isLoggedIn: string;

  tasks: string;
  task: string;

  skillCategories: string;
  skillsCategory: string;

  skills: string;
  skill: string;

  projects: string;
  project: string;

  blog: string;
  blogPost: string;

  contact: string;

  resume: string;
};

export const endPoints: EndPoints = {
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:8000/api',
  active: 'active',
  new: 'new',
  image: 'image',

  auth: 'auth',
  signIn: 'signin',
  signOut: 'signout',
  isLoggedIn: 'isloggedin',

  tasks: 'tasks',
  task: 'task',

  skillCategories: 'skills-categories',
  skillsCategory: 'skills-category',

  skills: 'skills',
  skill: 'skill',

  projects: 'projects',
  project: 'project',

  blog: 'blog',
  blogPost: 'blog-post',

  contact: 'contact',

  resume: 'resume',
};
