import * as React from 'react';

import { useIsLoggedInQuery } from '../../services/auth/auth.service';
import {
  useGetActiveProjectsQuery,
  useGetProjectsQuery,
} from '../../services/projects/projects.service';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import LoadingError from '../loading-error/LoadingError.component';
import Loading from '../loading/Loading.component';
import TextBlock from '../text-block/TextBlock.component';

import * as style from './style/projects-list.style';

const ProjectsList = (): JSX.Element => {
  const { data: loggedInData, isFetching: loggedInIsFetching } =
    useIsLoggedInQuery();

  const {
    data: projectsData,
    isFetching: projectsIsFetching,
    isError: projectsIsError,
    refetch: projectsRefetch,
  } = useGetProjectsQuery(undefined, {
    skip: !!!loggedInData,
  });

  const {
    data: activeProjectsData,
    isFetching: activeProjectsIsFetching,
    isError: activeProjectsIsError,
    refetch: activeProjectsRefetch,
  } = useGetActiveProjectsQuery(undefined, {
    skip: !!loggedInData,
  });

  const projects = React.useMemo(
    () => projectsData || activeProjectsData,
    [projectsData, activeProjectsData]
  );

  const refetchFunction = React.useMemo(
    () => (!!loggedInData ? projectsRefetch : activeProjectsRefetch),
    [loggedInData, projectsRefetch, activeProjectsRefetch]
  );

  return (
    <LoadingErrorContainer
      loadingObject={{
        isTrue:
          loggedInIsFetching || projectsIsFetching || activeProjectsIsFetching,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: projectsIsError || activeProjectsIsError,
        component: <LoadingError fixButton={{ onClick: refetchFunction }} />,
      }}
    >
      <style.ProjectsList>
        <style.ProjectListHeader>projects</style.ProjectListHeader>
        <style.ProjectListContainer>
          {projects && Object.values(projects).length === 0 && (
            <TextBlock>no projects found</TextBlock>
          )}
          {projects &&
            Object.values(projects)
              .sort(
                (project1, project2) =>
                  Date.parse(project2.createdAt) -
                  Date.parse(project1.createdAt)
              )
              .map((project) => {
                return (
                  <style.ProjectContainer key={project._id}>
                    <style.ProjectContainerRow>
                      <style.ProjectHeader>
                        {project.header}
                      </style.ProjectHeader>
                      <style.ProjectSummery>
                        {project.summery}
                      </style.ProjectSummery>
                    </style.ProjectContainerRow>
                    <style.ProjectContainerRow>
                      <style.ProjectTechnologiesHeader>
                        technologies
                      </style.ProjectTechnologiesHeader>

                      <style.ProjectSkillsList>
                        {project.technologies.map((technology) => {
                          return (
                            <style.ProjectSkill key={technology._id}>
                              {technology.name}
                            </style.ProjectSkill>
                          );
                        })}
                      </style.ProjectSkillsList>
                    </style.ProjectContainerRow>
                    <style.ProjectButton to={`${project._id}`}>
                      show more
                    </style.ProjectButton>
                  </style.ProjectContainer>
                );
              })}
        </style.ProjectListContainer>
      </style.ProjectsList>
    </LoadingErrorContainer>
  );
};

export default ProjectsList;
