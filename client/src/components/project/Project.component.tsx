import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useIsLoggedInQuery } from '../../services/auth/auth.service';
import {
  useGetActiveProjectsQuery,
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useToggleProjectMutation,
} from '../../services/projects/projects.service';
import ItemButtons from '../item-buttons/ItemButtons.component';
import NotFoundRoute from '../not-found-route/NotFoundRoute.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import Loading from '../loading/Loading.component';
import CloseButton from '../close-button/ClosButton.component';
import LoadingError from '../loading-error/LoadingError.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import ImageGallery from '../image-gallery/ImageGallery.component';
import { ColorContext } from '../../common/contexts/app-color.context';

import * as style from './style/project.style';

const Project = (): JSX.Element => {
  const { data: loggedInData, isFetching: loggedInIsFetching } =
    useIsLoggedInQuery();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: projectsData,
    isSuccess: projectsIsSuccess,
    isLoading: projectsIsLoading,
    isError: projectsIsError,
    refetch: projectsRefetch,
  } = useGetProjectsQuery(undefined, {
    skip: !!!loggedInData,
  });

  const {
    data: activeProjectsData,
    isSuccess: activeProjectsIsSuccess,
    isLoading: activeProjectsIsLoading,
    isError: activeProjectsIsError,
    refetch: activeProjectsRefetch,
  } = useGetActiveProjectsQuery(undefined, {
    skip: !!loggedInData,
  });

  const [deleteProject, deleteProjectResponse] = useDeleteProjectMutation();
  const [toggleProject, toggleProjectResponse] = useToggleProjectMutation();

  const controls = React.useContext(ColorContext);

  React.useEffect(() => {
    if (controls) {
      controls.start('color2');
    }
    return () => {
      if (controls) {
        controls.start('color1');
      }
    };
  }, [controls]);

  const projects = React.useMemo(
    () => projectsData || activeProjectsData,
    [projectsData, activeProjectsData]
  );

  const notFoundError = React.useMemo(() => {
    if (
      (projectsIsSuccess || activeProjectsIsSuccess) &&
      projects &&
      id &&
      !projects[id]
    ) {
      return true;
    }
  }, [projects, id, projectsIsSuccess, activeProjectsIsSuccess]);

  const project = React.useMemo(() => {
    if (projects && id) {
      return projects[id];
    }
  }, [projects, id]);

  const refetchFunction = React.useMemo(
    () => (!!loggedInData ? projectsRefetch : activeProjectsRefetch),
    [loggedInData, projectsRefetch, activeProjectsRefetch]
  );

  React.useEffect(() => {
    if (deleteProjectResponse.isSuccess) {
      navigate('/projects', { replace: true });
    }
  }, [navigate, deleteProjectResponse]);

  return notFoundError ? (
    <NotFoundRoute />
  ) : (
    <LoadingErrorContainer
      loadingObject={{
        isTrue:
          projectsIsLoading || activeProjectsIsLoading || loggedInIsFetching,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: projectsIsError || activeProjectsIsError,
        component: <LoadingError fixButton={{ onClick: refetchFunction }} />,
      }}
    >
      <style.Project>
        <OnScreenNotification
          messages={[
            {
              isShow: toggleProjectResponse.isLoading,
              messageText: `toggle project ${project?.isActive ? 'off' : 'on'}`,
            },
            {
              isShow: toggleProjectResponse.isError,
              messageText: 'toggle project error',
              closeAfter: 5,
            },
            {
              isShow: deleteProjectResponse.isLoading,
              messageText: 'delete project',
            },
            {
              isShow: deleteProjectResponse.isError,
              messageText: 'delete project error',
              closeAfter: 5,
            },
          ]}
        />
        <style.ProjectHeader>
          {project?.header}
          <CloseButton defaultRoute="/projects" />
        </style.ProjectHeader>
        <style.ProjectContainer>
          <style.ProjectDescription>
            {project?.description}
          </style.ProjectDescription>
          <style.ProjectCenterContainer>
            <style.ProjectCenterSubContainer>
              <style.ProjectSecondaryHeader>
                technologies
              </style.ProjectSecondaryHeader>
              <style.ProjectSkillsContainer>
                {project?.technologies.map((technology) => {
                  return (
                    <style.ListItemContainer key={technology._id}>
                      <style.ListItemIcon />
                      <style.ProjectSkillLink
                        to={`/skills/${technology.skillsCategory}/skill/${technology._id}`}
                      >
                        {technology.name}
                      </style.ProjectSkillLink>
                    </style.ListItemContainer>
                  );
                })}
              </style.ProjectSkillsContainer>
            </style.ProjectCenterSubContainer>
            <style.ProjectCenterSubContainer>
              <style.ProjectSecondaryHeader>links</style.ProjectSecondaryHeader>
              <style.ProjectLinksListContainer>
                {project?.links.map((link, index) => {
                  return (
                    <style.ListItemContainer key={index}>
                      <style.ListItemIcon />
                      <style.ProjectLink
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </style.ProjectLink>
                    </style.ListItemContainer>
                  );
                })}
              </style.ProjectLinksListContainer>
            </style.ProjectCenterSubContainer>
          </style.ProjectCenterContainer>
          {parseInt(`${project?.images?.length}`) > 0 && project?.images && (
            <ImageGallery
              images={project.images}
              imageGallerySizing={{ imageSize: 200, gapSize: 15 }}
              largeView={true}
            />
          )}
          {loggedInData && (
            <style.ButtonsContainer>
              <ItemButtons
                deleteFunction={deleteProject}
                toggleFunction={toggleProject}
                item={project}
                updateRoute={`/projects/update/${project?._id}`}
                name="project"
              />
            </style.ButtonsContainer>
          )}
        </style.ProjectContainer>
      </style.Project>
    </LoadingErrorContainer>
  );
};

export default Project;
