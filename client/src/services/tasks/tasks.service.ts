import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../common/api/axios.config';
import { endPoints } from '../../common/constants/end-points.constants';
import { CreateTask } from '../../common/interfaces/create-task.interface';
import { Task } from '../../common/interfaces/task.interface';
import { UpdateTask } from '../../common/interfaces/update-task.interface';

enum TasksTags {
  Tasks = 'TASKS',
  NewTask = 'NEW_TASK',
}

type UpdateTaskData = {
  taskId: string;
  task: UpdateTask;
};

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${endPoints.baseUrl}`,
  }),
  tagTypes: [TasksTags.Tasks, TasksTags.NewTask],
  endpoints: (builder) => ({
    getTasks: builder.query<Record<string, Task>, void>({
      query: () => ({ url: `/${endPoints.tasks}`, method: 'get' }),
      transformResponse: (response: Task[]) => {
        return response.reduce<Record<string, Task>>((acc, curr) => {
          acc[curr._id] = curr;
          return acc;
        }, {});
      },
      providesTags: [TasksTags.Tasks],
    }),
    getActiveTasks: builder.query<Record<string, Task>, void>({
      query: () => ({
        url: `/${endPoints.tasks}/${endPoints.active}`,
        method: 'get',
      }),
      transformResponse: (response: Task[]) => {
        return response.reduce<Record<string, Task>>((acc, curr) => {
          acc[curr._id] = curr;
          return acc;
        }, {});
      },
      providesTags: [TasksTags.Tasks],
    }),
    getTask: builder.query<Task, string>({
      query: (taskId) => ({
        url: `/${endPoints.tasks}/${taskId}`,
        method: 'get',
      }),
      providesTags: [TasksTags.Tasks],
    }),
    createTask: builder.mutation<Task, CreateTask>({
      query: (task) => ({
        url: `/${endPoints.tasks}`,
        method: 'post',
        data: task,
      }),
      invalidatesTags: [TasksTags.Tasks, TasksTags.NewTask],
    }),
    updateTask: builder.mutation<Task, UpdateTaskData>({
      query: ({ taskId, task }) => ({
        url: `/${endPoints.tasks}/${taskId}`,
        method: 'put',
        data: task,
      }),
      invalidatesTags: [TasksTags.Tasks],
    }),
    toggleTask: builder.mutation<Task, string>({
      query: (taskId) => ({
        url: `/${endPoints.tasks}/${taskId}`,
        method: 'patch',
      }),
      invalidatesTags: [TasksTags.Tasks],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `/${endPoints.tasks}/${taskId}`,
        method: 'delete',
      }),
      invalidatesTags: [TasksTags.Tasks],
    }),

    getNewTask: builder.query<CreateTask, void>({
      query: () => ({
        url: `/${endPoints.new}/${endPoints.task}`,
        method: 'get',
      }),
      providesTags: [TasksTags.NewTask],
    }),
    updateNewTask: builder.mutation<CreateTask, CreateTask>({
      query: (task) => ({
        url: `/${endPoints.new}/${endPoints.task}`,
        method: 'put',
        data: task,
      }),
      invalidatesTags: [TasksTags.NewTask],
    }),
    deleteNewTask: builder.mutation<void, void>({
      query: () => ({
        url: `/${endPoints.new}/${endPoints.task}`,
        method: 'delete',
      }),
      invalidatesTags: [TasksTags.NewTask],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetActiveTasksQuery,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useToggleTaskMutation,
  useDeleteTaskMutation,

  useGetNewTaskQuery,
  useUpdateNewTaskMutation,
  useDeleteNewTaskMutation,
  useCreateTaskMutation,
} = tasksApi;
