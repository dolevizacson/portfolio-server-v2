import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';

type setIsDirtyPayload = {
  key: IsDirtyKeys;
  isDirty: boolean;
  message?: string;
};

export const setIsDirty = createAction<setIsDirtyPayload>('setIsDirty');

export const enum IsDirtyKeys {
  TaskForm = 'TASK_FORM',
  SkillForm = 'SKILL_FORM',
  SkillsCategoryForm = 'SKILLS_CATEGORY_FORM',
  ProjectForm = 'PROJECT_FORM',
  BlogPostForm = 'BLOG_POST_FORM',
}

export interface IsDirtyListObject {
  isDirty: boolean;
  message: string;
}

const isDirtyInitialState: {
  isDirty: boolean;
  isDirtyList: Record<IsDirtyKeys, IsDirtyListObject>;
} = {
  isDirty: false,
  isDirtyList: {
    [IsDirtyKeys.TaskForm]: {
      isDirty: false,
      message: 'task form',
    },
    [IsDirtyKeys.SkillForm]: {
      isDirty: false,
      message: 'skill form',
    },
    [IsDirtyKeys.SkillsCategoryForm]: {
      isDirty: false,
      message: 'skills category form',
    },
    [IsDirtyKeys.ProjectForm]: {
      isDirty: false,
      message: 'project form',
    },
    [IsDirtyKeys.BlogPostForm]: {
      isDirty: false,
      message: 'blog post form',
    },
  },
};

export const isDirtyReducer = createReducer(isDirtyInitialState, (builder) => {
  builder
    .addCase(setIsDirty, (state, action) => {
      const { key, isDirty } = action.payload;
      const isDirtyListObject = state.isDirtyList[key];
      isDirtyListObject.isDirty = isDirty;
    })
    .addMatcher(
      (action): action is PayloadAction<setIsDirtyPayload> =>
        typeof action.payload?.isDirty === 'boolean',
      (state) => {
        const isDirtyList = state.isDirtyList;
        const appIsDirty = Object.values(isDirtyList).reduce((prev, curr) => {
          return prev || curr.isDirty;
        }, false);
        state.isDirty = appIsDirty;
      }
    );
});
