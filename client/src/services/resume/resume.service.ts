import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../common/api/axios.config';
import { endPoints } from '../../common/constants/end-points.constants';
import { CreateResume } from '../../common/interfaces/create-resume.interface';
import { Resume } from '../../common/interfaces/resume.interface';

enum ResumeTags {
  Resume = 'RESUME',
}

type UpdateResumeData = {
  resumeId: string;
  resume: CreateResume;
};

export const resumeApi = createApi({
  reducerPath: 'resumeApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${endPoints.baseUrl}`,
    timeOut: 25000,
  }),
  tagTypes: [ResumeTags.Resume],
  endpoints: (builder) => ({
    getResume: builder.query<Resume[], void>({
      query: () => ({ url: `/${endPoints.resume}`, method: 'get' }),
      providesTags: [ResumeTags.Resume],
    }),
    getActiveResume: builder.query<Resume[], void>({
      query: () => ({
        url: `/${endPoints.resume}/${endPoints.active}`,
        method: 'get',
      }),
      providesTags: [ResumeTags.Resume],
    }),
    createResume: builder.mutation<Resume, CreateResume>({
      query: (resume) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(resume)) {
          formData.append(key, value);
        }

        if (resume.file) {
          formData.set('file', resume.file[0]);
        }
        return {
          url: `/${endPoints.resume}`,
          method: 'post',
          data: formData,
        };
      },
      invalidatesTags: [ResumeTags.Resume],
    }),
    updateResume: builder.mutation<Resume, UpdateResumeData>({
      query: ({ resumeId, resume }) => ({
        url: `/${endPoints.resume}/${resumeId}`,
        method: 'put',
        data: resume,
      }),
      invalidatesTags: [ResumeTags.Resume],
    }),
    toggleResume: builder.mutation<Resume, string>({
      query: (resumeId) => ({
        url: `/${endPoints.resume}/${resumeId}`,
        method: 'patch',
      }),
      invalidatesTags: [ResumeTags.Resume],
    }),
    deleteResume: builder.mutation<void, string>({
      query: (resumeId) => ({
        url: `/${endPoints.resume}/${resumeId}`,
        method: 'delete',
      }),
      invalidatesTags: [ResumeTags.Resume],
    }),
  }),
});

export const {
  useGetResumeQuery,
  useGetActiveResumeQuery,
  useCreateResumeMutation,
  useUpdateResumeMutation,
  useToggleResumeMutation,
  useDeleteResumeMutation,
} = resumeApi;
