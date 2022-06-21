import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { projectFormDefaultValue } from '../common/constants/forms-default-values';
import { CreateProject } from '../common/interfaces/create-project.interface';

export const newProjectSlice = createSlice({
  name: 'newProject',
  initialState: projectFormDefaultValue,
  reducers: {
    persistNewProject(state, action: PayloadAction<CreateProject>) {
      return action.payload;
    },
  },
});

export const { persistNewProject } = newProjectSlice.actions;
