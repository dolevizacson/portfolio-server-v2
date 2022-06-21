import { configureStore } from '@reduxjs/toolkit';

import { authApi } from '../services/auth/auth.service';
import { tasksApi } from '../services/tasks/tasks.service';
import { newTaskSlice } from '../slices/new-task.slice';
import { skillsApi } from '../services/skills/skills.service';
import { newSkillSlice } from '../slices/new-skill.slice';
import { skillsCategoriesApi } from '../services/skills-categories/skills-categories.service';
import { newSkillsCategorySlice } from '../slices/new-skills-category.slice';
import { projectsApi } from '../services/projects/projects.service';
import { newProjectSlice } from '../slices/new-project.slice';
import { blogApi } from '../services/blog/blog.service';
import { newBlogPostSlice } from '../slices/new-blog-post.slice';
import { contactApi } from '../services/contact/contact.service';
import { resumeApi } from '../services/resume/resume.service';
import { contactSlice } from '../slices/contact.slice';
import { isDirtyReducer } from '../reducers/isDirty.reducer';
import { appColorSlice } from '../slices/app-color.slice';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [newTaskSlice.name]: newTaskSlice.reducer,
    [skillsApi.reducerPath]: skillsApi.reducer,
    [newSkillSlice.name]: newSkillSlice.reducer,
    [skillsCategoriesApi.reducerPath]: skillsCategoriesApi.reducer,
    [newSkillsCategorySlice.name]: newSkillsCategorySlice.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [newProjectSlice.name]: newProjectSlice.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [newBlogPostSlice.name]: newBlogPostSlice.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [contactSlice.name]: contactSlice.reducer,
    [resumeApi.reducerPath]: resumeApi.reducer,
    isDirty: isDirtyReducer,
    [appColorSlice.name]: appColorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(tasksApi.middleware)
      .concat(skillsApi.middleware)
      .concat(skillsCategoriesApi.middleware)
      .concat(projectsApi.middleware)
      .concat(blogApi.middleware)
      .concat(contactApi.middleware)
      .concat(resumeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
