import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { taskFormDefaultValue } from '../common/constants/forms-default-values';
import { CreateTask } from '../common/interfaces/create-task.interface';

export const newTaskSlice = createSlice({
  name: 'newTask',
  initialState: taskFormDefaultValue,
  reducers: {
    persistNewTask(state, action: PayloadAction<CreateTask>) {
      return action.payload;
    },
  },
});

export const { persistNewTask } = newTaskSlice.actions;
