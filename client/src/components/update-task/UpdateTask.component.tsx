import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetTasksQuery,
  useUpdateTaskMutation,
} from '../../services/tasks/tasks.service';
import { UpdateTask as IUpdateTask } from '../../common/interfaces/update-task.interface';
import { updateTaskFormDefaultValue } from '../../common/constants/forms-default-values';
import { CreateTask } from '../../common/interfaces/create-task.interface';
import TaskForm from '../task-form/TaskForm.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import Loading from '../loading/Loading.component';
import NotFoundRoute from '../not-found-route/NotFoundRoute.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import CloseButton from '../close-button/ClosButton.component';
import LoadingError from '../loading-error/LoadingError.component';
import DisableForm from '../disable-form/DisableForm.component';

import * as style from './style/update-task.style';

const UpdateTask = (): JSX.Element => {
  const {
    data: tasksData,
    isSuccess: tasksIsSuccess,
    isLoading: tasksIsLoading,
    isError: tasksIsError,
    refetch: tasksRefetch,
  } = useGetTasksQuery();
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateTask, updateTaskResponse] = useUpdateTaskMutation();

  const task = React.useMemo(() => {
    if (tasksData && id) {
      return tasksData[id];
    }
  }, [tasksData, id]);

  const updateTaskValidationSchema = yup
    .object({
      header: yup.string().required(),
      description: yup.string().required(),
    })
    .required();

  const formMethods = useForm<CreateTask>({
    defaultValues: updateTaskFormDefaultValue,
    resolver: yupResolver(updateTaskValidationSchema),
  });

  const { handleSubmit, reset } = React.useMemo(
    () => formMethods,
    [formMethods]
  );

  const onSubmit: SubmitHandler<CreateTask> = (formTask) => {
    if (task && id) {
      const taskToUpdate: IUpdateTask = { ...formTask, isDone: task.isDone };
      updateTask({
        taskId: id,
        task: taskToUpdate,
      });
    }
  };

  const notFoundError = React.useMemo(() => {
    if (tasksIsSuccess && tasksData && id && !tasksData[id]) {
      return true;
    }
  }, [tasksIsSuccess, tasksData, id]);

  React.useEffect(() => {
    reset(task);
  }, [reset, task]);

  React.useEffect(() => {
    if (updateTaskResponse.isSuccess) {
      navigate('/tasks');
    }
  }, [navigate, updateTaskResponse]);

  return notFoundError ? (
    <NotFoundRoute />
  ) : (
    <LoadingErrorContainer
      loadingObject={{ isTrue: tasksIsLoading, component: <Loading /> }}
      errorObject={{
        isTrue: tasksIsError,
        component: <LoadingError fixButton={{ onClick: tasksRefetch }} />,
      }}
    >
      <style.UpdateTask>
        <OnScreenNotification
          messages={[
            {
              isShow: updateTaskResponse.isLoading,
              messageText: 'updating task',
            },
            {
              isShow: updateTaskResponse.isError,
              messageText: 'task update error',
              closeAfter: 5,
            },
          ]}
        />
        <style.UpdateTaskHeader>
          update task
          <CloseButton defaultRoute="/tasks" />
        </style.UpdateTaskHeader>
        <style.UpdateTaskContainer>
          <DisableForm disabled={updateTaskResponse.isLoading}>
            <FormProvider {...formMethods}>
              <TaskForm />
            </FormProvider>
          </DisableForm>
          <style.buttonsContainer>
            <style.UpdateTaskButton
              type="button"
              onClick={() => {
                reset(task);
              }}
            >
              undo changes
            </style.UpdateTaskButton>
            <style.UpdateTaskButton onClick={handleSubmit(onSubmit)}>
              update task
            </style.UpdateTaskButton>
          </style.buttonsContainer>
        </style.UpdateTaskContainer>
      </style.UpdateTask>
    </LoadingErrorContainer>
  );
};

export default UpdateTask;
