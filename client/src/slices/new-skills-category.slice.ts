import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { skillsCategoryFormDefaultValue } from '../common/constants/forms-default-values';
import { CreateSkillsCategory } from '../common/interfaces/create-skills-category.interface';

export const newSkillsCategorySlice = createSlice({
  name: 'newSkillsCategory',
  initialState: skillsCategoryFormDefaultValue,
  reducers: {
    persistNewSkillsCategory(
      state,
      action: PayloadAction<CreateSkillsCategory>
    ) {
      return action.payload;
    },
  },
});

export const { persistNewSkillsCategory } = newSkillsCategorySlice.actions;
