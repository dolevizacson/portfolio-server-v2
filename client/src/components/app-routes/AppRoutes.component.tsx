import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Admin from '../../pages/admin/Admin.page';
import Login from '../../pages/log-in/Login.page';
import Home from '../../pages/home/Home.page';
import Tasks from '../../pages/tasks/Tasks.page';
import UpdateTask from '../update-task/UpdateTask.component';
import SkillsCategory from '../skills-category/SkillsCategory.component';
import UpdateSkillsCategory from '../update-skills-category/UpdateSkillsCategory.component';
import Skills from '../../pages/skills/Skills.page';
import UpdateSkill from '../update-skill/UpdateSkill.component';
import Projects from '../../pages/projects/Projects.page';
import Project from '../project/Project.component';
import UpdateProject from '../update-project/UpdateProject.component';
import Blog from '../../pages/blog/Blog.page';
import BlogPost from '../blog-post/BlogPost.component';
import UpdateBlogPost from '../update-blog-post/UpdateBlogPost.component';
import Contact from '../../pages/contact/Contact.page';
import NewTask from '../new-task/NewTask.component';
import NewSkillsCategory from '../new-skills-category/NewSkillsCategory.component';
import NewSkill from '../new-skill/NewSkill.component';
import NewProject from '../new-project/NewProject.component';
import NewBlogPost from '../new-blog-post/NewBlogPost.component';
import NotFoundRoute from '../not-found-route/NotFoundRoute.component';
import ProtectedRoute from '../protected-route/ProtectedRoute.component';

const AppRoutes = (): JSX.Element => {
  const location = useLocation();

  const key = React.useMemo(() => {
    const splitArray = location.pathname.split('/');
    const isAdmin = splitArray.includes('admin');
    return isAdmin ? 'admin/new' : location.pathname;
  }, [location]);

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={key}>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="tasks" element={<Tasks />} />
        <Route
          path="tasks/update/:id"
          element={
            <ProtectedRoute>
              <UpdateTask />
            </ProtectedRoute>
          }
        />
        <Route path="skills" element={<Skills />} />
        <Route
          path="skills/update/:id"
          element={
            <ProtectedRoute>
              <UpdateSkill />
            </ProtectedRoute>
          }
        />
        <Route path="skills/:id" element={<SkillsCategory />} />
        <Route path="skills/:id/skill/:skillid" element={<SkillsCategory />} />
        <Route
          path="skills/category/update/:id"
          element={
            <ProtectedRoute>
              <UpdateSkillsCategory />
            </ProtectedRoute>
          }
        />
        <Route path="projects" element={<Projects />} />
        <Route
          path="projects/update/:id"
          element={
            <ProtectedRoute>
              <UpdateProject />
            </ProtectedRoute>
          }
        />
        <Route path="projects/:id" element={<Project />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route
          path="blog/update/:id"
          element={
            <ProtectedRoute>
              <UpdateBlogPost />
            </ProtectedRoute>
          }
        />
        <Route path="blog/:id" element={<BlogPost />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route path="new/task" element={<NewTask />} />
          <Route path="new/skills-category" element={<NewSkillsCategory />} />
          <Route path="new/skill" element={<NewSkill />} />
          <Route path="new/project" element={<NewProject />} />
          <Route path="new/blog-post" element={<NewBlogPost />} />
        </Route>
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
