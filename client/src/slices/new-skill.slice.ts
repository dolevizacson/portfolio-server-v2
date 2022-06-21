import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { skillFormDefaultValue } from '../common/constants/forms-default-values';
import { SkillForm } from '../common/interfaces/skill-form.interface';

export const newSkillSlice = createSlice({
  name: 'newSkill',
  initialState: skillFormDefaultValue,
  reducers: {
    persistNewSkill(state, action: PayloadAction<SkillForm>) {
      return action.payload;
    },
  },
});

export const { persistNewSkill } = newSkillSlice.actions;
