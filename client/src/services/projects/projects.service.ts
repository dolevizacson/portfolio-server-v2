import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../common/api/axios.config';
import { endPoints } from '../../common/constants/end-points.constants';
import { CreateProject } from '../../common/interfaces/create-project.interface';
import { Image } from '../../common/interfaces/image.interface';
import { Project } from '../../common/interfaces/project.interface';

enum ProjectTags {
  Project = 'PROJECT',
  NewProject = 'NEW_PROJECT',
}

type UpdateProjectData = {
  projectId: string;
  project: CreateProject;
};

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${endPoints.baseUrl}`,
    timeOut: 25000,
  }),
  tagTypes: [ProjectTags.Project, ProjectTags.NewProject],
  endpoints: (builder) => ({
    getProjects: builder.query<Record<string, Project>, void>({
      query: () => ({ url: `/${endPoints.projects}`, method: 'get' }),
      transformResponse: (response: Project[]) => {
        return response.reduce<Record<string, Project>>((acc, curr) => {
          acc[curr._id] = curr;
          return acc;
        }, {});
      },
      providesTags: [ProjectTags.Project],
    }),
    getActiveProjects: builder.query<Record<string, Project>, void>({
      query: () => ({
        url: `/${endPoints.projects}/${endPoints.active}`,
        method: 'get',
      }),
      transformResponse: (response: Project[]) => {
        return response.reduce<Record<string, Project>>((acc, curr) => {
          acc[curr._id] = curr;
          return acc;
        }, {});
      },
      providesTags: [ProjectTags.Project],
    }),
    getProject: builder.query<Project, string>({
      query: (projectId) => ({
        url: `/${endPoints.projects}/${projectId}`,
        method: 'get',
      }),
      providesTags: [ProjectTags.Project],
    }),
    getActiveProject: builder.query<Project, string>({
      query: (projectId) => ({
        url: `/${endPoints.projects}/${endPoints.active}/${projectId}`,
        method: 'get',
      }),
      providesTags: [ProjectTags.Project],
    }),
    createProject: builder.mutation<Project, CreateProject>({
      query: (project) => ({
        url: `/${endPoints.projects}`,
        method: 'post',
        data: project,
      }),
      invalidatesTags: [ProjectTags.Project, ProjectTags.NewProject],
    }),
    updateProject: builder.mutation<Project, UpdateProjectData>({
      query: ({ projectId, project }) => ({
        url: `/${endPoints.projects}/${projectId}`,
        method: 'put',
        data: project,
      }),
      invalidatesTags: [ProjectTags.Project],
    }),
    toggleProject: builder.mutation<Project, string>({
      query: (ProjectId) => ({
        url: `/${endPoints.projects}/${ProjectId}`,
        method: 'patch',
      }),
      invalidatesTags: [ProjectTags.Project],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (projectId) => ({
        url: `/${endPoints.projects}/${projectId}`,
        method: 'delete',
      }),
      invalidatesTags: [ProjectTags.Project],
    }),

    addProjectImage: builder.mutation<
      void,
      { projectId: string | undefined; image: Image }
    >({
      query: ({ projectId, image }) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(image)) {
          formData.append(key, value);
        }

        if (image.file) {
          formData.set('file', image.file[0]);
        }

        return {
          url: `/${endPoints.projects}/${projectId}/${endPoints.image}`,
          method: 'post',
          data: formData,
        };
      },
      invalidatesTags: [ProjectTags.Project],
    }),
    deleteProjectImage: builder.mutation<
      void,
      { projectId: string | undefined; imageId: string | undefined }
    >({
      query: ({ projectId, imageId }) => ({
        url: `/${endPoints.projects}/${projectId}/${endPoints.image}/${imageId}`,
        method: 'delete',
      }),
      invalidatesTags: [ProjectTags.Project],
    }),

    getNewProject: builder.query<CreateProject, void>({
      query: () => ({
        url: `/${endPoints.new}/${endPoints.project}`,
        method: 'get',
      }),
      providesTags: [ProjectTags.NewProject],
    }),
    updateNewProject: builder.mutation<CreateProject, CreateProject>({
      query: (project) => ({
        url: `/${endPoints.new}/${endPoints.project}`,
        method: 'put',
        data: project,
      }),
      invalidatesTags: [ProjectTags.NewProject],
    }),
    deleteNewProject: builder.mutation<void, void>({
      query: () => ({
        url: `/${endPoints.new}/${endPoints.project}`,
        method: 'delete',
      }),
      invalidatesTags: [ProjectTags.NewProject],
    }),

    addNewProjectImage: builder.mutation<void, Image>({
      query: (image) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(image)) {
          formData.append(key, value);
        }

        if (image.file) {
          formData.set('file', image.file[0]);
        }

        return {
          url: `/${endPoints.new}/${endPoints.project}/${endPoints.image}`,
          method: 'post',
          data: formData,
        };
      },
      invalidatesTags: [ProjectTags.NewProject],
    }),
    deleteNewProjectImage: builder.mutation<void, string | undefined>({
      query: (imageId) => ({
        url: `/${endPoints.new}/${endPoints.project}/${endPoints.image}/${imageId}`,
        method: 'delete',
      }),
      invalidatesTags: [ProjectTags.NewProject],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetActiveProjectsQuery,
  useGetProjectQuery,
  useGetActiveProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useToggleProjectMutation,
  useDeleteProjectMutation,

  useAddProjectImageMutation,
  useDeleteProjectImageMutation,

  useGetNewProjectQuery,
  useUpdateNewProjectMutation,
  useDeleteNewProjectMutation,

  useAddNewProjectImageMutation,
  useDeleteNewProjectImageMutation,
} = projectsApi;
