import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../common/api/axios.config';
import { endPoints } from '../../common/constants/end-points.constants';
import { CreateSkillResponse } from '../../common/interfaces/create-skill-response.interface';
import { CreateSkill } from '../../common/interfaces/create-skill.interface';
import { Skill } from '../../common/interfaces/skill.interface';

enum SkillsTags {
  Skills = 'SKILLS',
  NewSkill = 'NEW_SKILL',
}

type UpdateSkillData = {
  skillId: string;
  skill: CreateSkill;
};

export const skillsApi = createApi({
  reducerPath: 'skillsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${endPoints.baseUrl}`,
  }),
  tagTypes: [SkillsTags.Skills, SkillsTags.NewSkill],
  endpoints: (builder) => ({
    getSkills: builder.query<Record<string, Skill>, void>({
      query: () => ({ url: `/${endPoints.skills}`, method: 'get' }),
      transformResponse: (response: Skill[]) => {
        return response.reduce<Record<string, Skill>>((acc, curr) => {
          acc[curr._id] = curr;
          return acc;
        }, {});
      },
      providesTags: [SkillsTags.Skills],
    }),
    getActiveSkills: builder.query<Skill[], void>({
      query: () => ({
        url: `/${endPoints.skills}/${endPoints.active}`,
        method: 'get',
      }),
      providesTags: [SkillsTags.Skills],
    }),
    getSkill: builder.query<Skill, string>({
      query: (skillId) => ({
        url: `/${endPoints.skills}/${skillId}`,
        method: 'get',
      }),
      providesTags: [SkillsTags.Skills],
    }),
    createSkill: builder.mutation<CreateSkillResponse, CreateSkill>({
      query: (skill) => ({
        url: `/${endPoints.skills}`,
        method: 'post',
        data: skill,
      }),
      invalidatesTags: [SkillsTags.Skills, SkillsTags.NewSkill],
    }),
    updateSkill: builder.mutation<Skill, UpdateSkillData>({
      query: ({ skillId, skill }) => ({
        url: `/${endPoints.skills}/${skillId}`,
        method: 'put',
        data: skill,
      }),
      invalidatesTags: [SkillsTags.Skills],
    }),
    toggleSkill: builder.mutation<Skill, string>({
      query: (skillId) => ({
        url: `/${endPoints.skills}/${skillId}`,
        method: 'patch',
      }),
      invalidatesTags: [SkillsTags.Skills],
    }),
    deleteSkill: builder.mutation<void, string>({
      query: (skillId) => ({
        url: `/${endPoints.skills}/${skillId}`,
        method: 'delete',
      }),
      invalidatesTags: [SkillsTags.Skills],
    }),

    getNewSkill: builder.query<CreateSkill, void>({
      query: () => ({
        url: `/${endPoints.new}/${endPoints.skill}`,
        method: 'get',
      }),
      providesTags: [SkillsTags.NewSkill],
    }),
    updateNewSkill: builder.mutation<CreateSkill, CreateSkill>({
      query: (skill) => ({
        url: `/${endPoints.new}/${endPoints.skill}`,
        method: 'put',
        data: skill,
      }),
      invalidatesTags: [SkillsTags.NewSkill],
    }),
    deleteNewSkill: builder.mutation<void, void>({
      query: () => ({
        url: `/${endPoints.new}/${endPoints.skill}`,
        method: 'delete',
      }),
      invalidatesTags: [SkillsTags.NewSkill],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useGetActiveSkillsQuery,
  useGetSkillQuery,
  useUpdateSkillMutation,
  useToggleSkillMutation,
  useDeleteSkillMutation,

  useGetNewSkillQuery,
  useUpdateNewSkillMutation,
  useDeleteNewSkillMutation,
  useCreateSkillMutation,
} = skillsApi;
