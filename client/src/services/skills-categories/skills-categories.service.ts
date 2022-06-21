import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../common/api/axios.config';
import { endPoints } from '../../common/constants/end-points.constants';
import { CreateSkillsCategory } from '../../common/interfaces/create-skills-category.interface';
import { SkillsCategory } from '../../common/interfaces/skills-category.interface';

enum SkillsCategoriesTags {
  skillsCategories = 'SKILLS_CATEGORIES',
  NewSkillsCategory = 'NEW_SKILLS_CATEGORY',
}

type UpdateSkillsCategoryData = {
  skillsCategoryId: string;
  skillsCategory: CreateSkillsCategory;
};

export const skillsCategoriesApi = createApi({
  reducerPath: 'skillsCategoriesApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${endPoints.baseUrl}`,
  }),
  tagTypes: [
    SkillsCategoriesTags.skillsCategories,
    SkillsCategoriesTags.NewSkillsCategory,
  ],
  endpoints: (builder) => ({
    getSkillsCategories: builder.query<Record<string, SkillsCategory>, void>({
      query: () => ({ url: `/${endPoints.skillCategories}`, method: 'get' }),
      transformResponse: (response: SkillsCategory[]) => {
        return response.reduce<Record<string, SkillsCategory>>((acc, curr) => {
          acc[curr._id] = curr;
          return acc;
        }, {});
      },
      providesTags: [SkillsCategoriesTags.skillsCategories],
    }),
    getActiveSkillsCategories: builder.query<
      Record<string, SkillsCategory>,
      void
    >({
      query: () => ({
        url: `/${endPoints.skillCategories}/${endPoints.active}`,
        method: 'get',
      }),
      transformResponse: (response: SkillsCategory[]) => {
        return response.reduce<Record<string, SkillsCategory>>((acc, curr) => {
          acc[curr._id] = curr;
          return acc;
        }, {});
      },
      providesTags: [SkillsCategoriesTags.skillsCategories],
    }),
    getSkillsCategory: builder.query<SkillsCategory, string>({
      query: (skillsCategoryId) => ({
        url: `/${endPoints.skillCategories}/${skillsCategoryId}`,
        method: 'get',
      }),
      providesTags: [SkillsCategoriesTags.skillsCategories],
    }),
    createSkillsCategory: builder.mutation<
      SkillsCategory,
      CreateSkillsCategory
    >({
      query: (SkillsCategory) => ({
        url: `/${endPoints.skillCategories}`,
        method: 'post',
        data: SkillsCategory,
      }),
      invalidatesTags: [
        SkillsCategoriesTags.skillsCategories,
        SkillsCategoriesTags.NewSkillsCategory,
      ],
    }),
    updateSkillsCategory: builder.mutation<
      SkillsCategory,
      UpdateSkillsCategoryData
    >({
      query: ({ skillsCategoryId, skillsCategory }) => ({
        url: `/${endPoints.skillCategories}/${skillsCategoryId}`,
        method: 'put',
        data: skillsCategory,
      }),
      invalidatesTags: [SkillsCategoriesTags.skillsCategories],
    }),
    toggleSkillsCategory: builder.mutation<SkillsCategory, string>({
      query: (skillsCategoryId) => ({
        url: `/${endPoints.skillCategories}/${skillsCategoryId}`,
        method: 'patch',
      }),
      invalidatesTags: [SkillsCategoriesTags.skillsCategories],
    }),
    deleteSkillsCategory: builder.mutation<void, string>({
      query: (skillsCategoryId) => ({
        url: `/${endPoints.skillCategories}/${skillsCategoryId}`,
        method: 'delete',
      }),
      invalidatesTags: [SkillsCategoriesTags.skillsCategories],
    }),

    getNewSkillsCategory: builder.query<CreateSkillsCategory, void>({
      query: () => ({
        url: `/${endPoints.new}/${endPoints.skillsCategory}`,
        method: 'get',
      }),
      providesTags: [SkillsCategoriesTags.NewSkillsCategory],
    }),
    updateNewSkillsCategory: builder.mutation<
      CreateSkillsCategory,
      CreateSkillsCategory
    >({
      query: (skillsCategory) => ({
        url: `/${endPoints.new}/${endPoints.skillsCategory}`,
        method: 'put',
        data: skillsCategory,
      }),
      invalidatesTags: [SkillsCategoriesTags.NewSkillsCategory],
    }),
    deleteNewSkillsCategory: builder.mutation<void, void>({
      query: () => ({
        url: `/${endPoints.new}/${endPoints.skillsCategory}`,
        method: 'delete',
      }),
      invalidatesTags: [SkillsCategoriesTags.NewSkillsCategory],
    }),
  }),
});

export const {
  useGetSkillsCategoriesQuery,
  useGetActiveSkillsCategoriesQuery,
  useGetSkillsCategoryQuery,
  useUpdateSkillsCategoryMutation,
  useToggleSkillsCategoryMutation,
  useDeleteSkillsCategoryMutation,

  useGetNewSkillsCategoryQuery,
  useUpdateNewSkillsCategoryMutation,
  useDeleteNewSkillsCategoryMutation,
  useCreateSkillsCategoryMutation,
} = skillsCategoriesApi;
