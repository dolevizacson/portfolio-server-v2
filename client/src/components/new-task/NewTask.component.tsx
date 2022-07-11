import * as React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import _ from 'lodash';

import { taskFormDefaultValue } from '../../common/constants/forms-default-values';
import { CreateTask } from '../../common/interfaces/create-task.interface';
import {
  useCreateTaskMutation,
  useDeleteNewTaskMutation,
  useGetNewTaskQuery,
  useUpdateNewTaskMutation,
} from '../../services/tasks/tasks.service';
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks';
import { persistNewTask } from '../../slices/new-task.slice';
import { IsDirtyKeys, setIsDirty } from '../../reducers/isDirty.reducer';
import TaskForm from '../task-form/TaskForm.component';
import { useNavigate } from 'react-router-dom';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import LoadingError from '../loading-error/LoadingError.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import Loading from '../loading/Loading.component';
import DisableForm from '../disable-form/DisableForm.component';
import FormItemButtons from '../form-item-buttons/FormItemButtons.component';

import * as style from './style/new-task.style';

const NewTask = (): JSX.Element => {
  const {
    data: newTaskData,
    isLoading: newTaskIsLoading,
    isError: newTaskIsError,
    refetch: newTaskRefetch,
  } = useGetNewTaskQuery();
  const [updateNewTask, updateNewTaskResponse] = useUpdateNewTaskMutation();
  const [deleteNewTask, deleteNewTaskResponse] = useDeleteNewTaskMutation();
  const [createTask, createTaskResponse] = useCreateTaskMutation();

  const navigate = useNavigate();

  const newTaskLocalData = useAppSelector((state) => state.newTask);
  const dispatch = useAppDispatch();

  const [toNavigate, setToNavigate] = React.useState(false);

  const newTask = React.useMemo(() => {
    if (newTaskData) {
      const { header = '', description = '' } = newTaskData;
      return { header, description };
    }
  }, [newTaskData]);

  const taskValidationSchema = yup
    .object({
      header: yup.string().required(),
      description: yup.string().required(),
    })
    .required();

  const formMethods = useForm<CreateTask>({
    defaultValues: taskFormDefaultValue,
    resolver: yupResolver(taskValidationSchema),
  });

  const {
    watch,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = React.useMemo(() => formMethods, [formMethods]);

  const onSubmit: SubmitHandler<CreateTask> = (task) => createTask(task);

  React.useEffect(() => {
    const subscription = watch((data) => {
      dispatch(persistNewTask(_.cloneDeep(data) as CreateTask));
    });

    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  React.useEffect(() => {
    reset(newTask);
  }, [reset, newTask]);

  React.useEffect(() => {
    reset(newTaskLocalData, { keepDefaultValues: true });
  }, []);

  React.useEffect(() => {
    if (deleteNewTaskResponse.isSuccess || createTaskResponse.isSuccess) {
      reset(taskFormDefaultValue);
      setToNavigate(true);
    }
  }, [deleteNewTaskResponse, createTaskResponse, reset]);

  React.useEffect(() => {
    dispatch(setIsDirty({ key: IsDirtyKeys.TaskForm, isDirty }));
  }, [dispatch, isDirty]);

  React.useEffect(() => {
    if (createTaskResponse.isSuccess && toNavigate) {
      navigate('/tasks');
    }
  }, [navigate, createTaskResponse, toNavigate]);

  return (
    <LoadingErrorContainer
      loadingObject={{ isTrue: newTaskIsLoading, component: <Loading /> }}
      errorObject={{
        isTrue: newTaskIsError,
        component: <LoadingError fixButton={{ onClick: newTaskRefetch }} />,
      }}
    >
      <style.NewTask>
        <OnScreenNotification
          messages={[
            {
              isShow: createTaskResponse.isLoading,
              messageText: 'creating task',
            },
            {
              isShow: createTaskResponse.isError,
              messageText: 'task creation error',
              closeAfter: 5,
            },
            {
              isShow: updateNewTaskResponse.isLoading,
              messageText: 'saving task progress',
            },
            {
              isShow: updateNewTaskResponse.isError,
              messageText: 'task saving error',
              closeAfter: 5,
            },
            {
              isShow: deleteNewTaskResponse.isLoading,
              messageText: 'deleting task',
            },
            {
              isShow: deleteNewTaskResponse.isError,
              messageText: 'task delete error',
              closeAfter: 5,
            },
          ]}
        />
        <style.NewTaskHeader>new task</style.NewTaskHeader>
        <style.NewTaskContainer onSubmit={handleSubmit(onSubmit)}>
          <DisableForm
            disabled={
              createTaskResponse.isLoading ||
              updateNewTaskResponse.isLoading ||
              deleteNewTaskResponse.isLoading
            }
          >
            <FormProvider {...formMethods}>
              <TaskForm />
            </FormProvider>
          </DisableForm>

          <FormItemButtons
            deleteFunction={deleteNewTask}
            deleteItem={undefined}
            successErrorObject={{
              success: deleteNewTaskResponse.isSuccess,
              error: deleteNewTaskResponse.isError,
            }}
            resetFunction={reset}
            updateFunction={updateNewTask}
            updateItem={watch()}
            itemName="task"
          />
        </style.NewTaskContainer>
      </style.NewTask>
    </LoadingErrorContainer>
  );
};

export default NewTask;
