import * as React from 'react';
import ItemButtons from '../item-buttons/ItemButtons.component';

import { useIsLoggedInQuery } from '../../services/auth/auth.service';
import {
  useDeleteTaskMutation,
  useGetActiveTasksQuery,
  useGetTasksQuery,
  useToggleTaskMutation,
  useUpdateTaskMutation,
} from '../../services/tasks/tasks.service';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import LoadingError from '../loading-error/LoadingError.component';
import Loading from '../loading/Loading.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import TextBlock from '../text-block/TextBlock.component';
import CenterContent from '../center-content/CenterContent.component';

import * as style from './style/tasks-list.style';

const TasksList = (): JSX.Element => {
  const { data: loggedInData, isFetching: loggedInIsFetching } =
    useIsLoggedInQuery();

  const {
    data: tasksData,
    isLoading: tasksIsLoading,
    isError: tasksIsError,
    refetch: tasksRefetch,
  } = useGetTasksQuery(undefined, {
    skip: !!!loggedInData,
  });

  const {
    data: activeTasksData,
    isLoading: activeTasksIsLoading,
    isError: activeTasksIsError,
    refetch: activeTasksRefetch,
  } = useGetActiveTasksQuery(undefined, {
    skip: !!loggedInData,
  });

  const [updateTask, updateTaskResponse] = useUpdateTaskMutation();
  const [deleteTask, deleteTaskResponse] = useDeleteTaskMutation();
  const [toggleTask, toggleTaskResponse] = useToggleTaskMutation();

  const tasks = React.useMemo(
    () => tasksData || activeTasksData,
    [tasksData, activeTasksData]
  );

  const refetchFunction = React.useMemo(
    () => (!!loggedInData ? tasksRefetch : activeTasksRefetch),
    [loggedInData, tasksRefetch, activeTasksRefetch]
  );

  return (
    <LoadingErrorContainer
      loadingObject={{
        isTrue: tasksIsLoading || activeTasksIsLoading || loggedInIsFetching,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: tasksIsError || activeTasksIsError,
        component: <LoadingError fixButton={{ onClick: refetchFunction }} />,
      }}
    >
      <style.TasksList>
        <OnScreenNotification
          messages={[
            {
              isShow: updateTaskResponse.isLoading,
              messageText: 'updating task',
            },
            {
              isShow: updateTaskResponse.isError,
              messageText: 'update task error',
              closeAfter: 5,
            },
            {
              isShow: toggleTaskResponse.isLoading,
              messageText: 'toggle task state',
            },
            {
              isShow: toggleTaskResponse.isError,
              messageText: 'toggle task error',
              closeAfter: 5,
            },
            {
              isShow: deleteTaskResponse.isLoading,
              messageText: 'delete task',
            },
            {
              isShow: deleteTaskResponse.isError,
              messageText: 'task project error',
              closeAfter: 5,
            },
          ]}
        />
        <style.TasksListHeader>task list</style.TasksListHeader>
        <CenterContent size={75}>
          <style.TasksListContainer>
            {tasks && Object.values(tasks).length === 0 && (
              <TextBlock>no tasks found</TextBlock>
            )}
            {tasks &&
              Object.values(tasks)
                .sort(
                  (task1, task2) =>
                    Date.parse(task1.createdAt) - Date.parse(task2.createdAt)
                )
                .sort((task1, task2) => task2.isDone - task1.isDone)
                .map((task) => {
                  return (
                    <style.Task key={task._id}>
                      <style.TaskContainer>
                        <style.TaskHeader>{task.header}</style.TaskHeader>
                        <style.TaskDescription>
                          {task.description}
                        </style.TaskDescription>
                        <style.TaskDoneIconFrame
                          tabIndex={0}
                          onClick={() =>
                            updateTask({
                              taskId: task._id,
                              task: {
                                header: task.header,
                                description: task.description,
                                isDone: task.isDone ? 0 : 1,
                              },
                            })
                          }
                        >
                          {task.isDone ? <style.TaskDoneIcon /> : null}
                        </style.TaskDoneIconFrame>
                        {loggedInData && (
                          <style.ButtonsContainer>
                            <ItemButtons
                              deleteFunction={deleteTask}
                              toggleFunction={toggleTask}
                              item={task}
                              updateRoute={`update/${task._id}`}
                              name="task"
                            />
                          </style.ButtonsContainer>
                        )}
                      </style.TaskContainer>
                    </style.Task>
                  );
                })}
          </style.TasksListContainer>
        </CenterContent>
      </style.TasksList>
    </LoadingErrorContainer>
  );
};

export default TasksList;
