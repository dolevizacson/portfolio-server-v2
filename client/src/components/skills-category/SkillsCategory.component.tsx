import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useIsLoggedInQuery } from '../../services/auth/auth.service';
import {
  useDeleteSkillsCategoryMutation,
  useGetActiveSkillsCategoriesQuery,
  useGetSkillsCategoriesQuery,
  useToggleSkillsCategoryMutation,
} from '../../services/skills-categories/skills-categories.service';
import {
  useDeleteSkillMutation,
  useToggleSkillMutation,
} from '../../services/skills/skills.service';
import CloseButton from '../close-button/ClosButton.component';
import ItemButtons from '../item-buttons/ItemButtons.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import LoadingError from '../loading-error/LoadingError.component';
import Loading from '../loading/Loading.component';
import NotFoundRoute from '../not-found-route/NotFoundRoute.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';

import * as style from './style/skills-category.style';

const SkillsCategory = (): JSX.Element => {
  const { data: loggedInData, isFetching: loggedInIsFetching } =
    useIsLoggedInQuery();
  const { id, skillid: skillId } = useParams();
  const navigate = useNavigate();
  const [refs, setRefs] = React.useState<
    Record<string, React.RefObject<HTMLElement>>
  >({});

  const {
    data: skillsCategoriesData,
    isSuccess: skillsCategoriesIsSuccess,
    isLoading: skillsCategoriesIsLoading,
    isError: skillsCategoriesIsError,
    refetch: skillsCategoriesRefetch,
  } = useGetSkillsCategoriesQuery(undefined, {
    skip: !!!loggedInData,
  });

  const {
    data: activeSkillsCategoriesData,
    isSuccess: activeSkillsCategoriesIsSuccess,
    isLoading: activeSkillsCategoriesIsLoading,
    isError: activeSkillsCategoriesIsError,
    refetch: activeSkillsCategoriesRefetch,
  } = useGetActiveSkillsCategoriesQuery(undefined, {
    skip: !!loggedInData,
  });

  const [deleteSkillsCategory, deleteSkillsCategoryResponse] =
    useDeleteSkillsCategoryMutation();
  const [toggleSkillsCategory, toggleSkillsCategoryResponse] =
    useToggleSkillsCategoryMutation();

  const [deleteSkill, deleteSkillResponse] = useDeleteSkillMutation();
  const [toggleSkill, toggleSkillResponse] = useToggleSkillMutation();

  const skillsCategories = React.useMemo(
    () => skillsCategoriesData || activeSkillsCategoriesData,
    [skillsCategoriesData, activeSkillsCategoriesData]
  );

  const notFoundError = React.useMemo(() => {
    if (
      (skillsCategoriesIsSuccess || activeSkillsCategoriesIsSuccess) &&
      skillsCategories &&
      id &&
      !skillsCategories[id]
    ) {
      return true;
    }
  }, [
    skillsCategories,
    id,
    skillsCategoriesIsSuccess,
    activeSkillsCategoriesIsSuccess,
  ]);

  let skillsCategory = React.useMemo(() => {
    if (skillsCategories && id) {
      return skillsCategories[id];
    }
  }, [skillsCategories, id]);

  const refetchFunction = React.useMemo(
    () =>
      !!loggedInData ? skillsCategoriesRefetch : activeSkillsCategoriesRefetch,
    [loggedInData, skillsCategoriesRefetch, activeSkillsCategoriesRefetch]
  );

  React.useEffect(() => {
    if (skillsCategory) {
      setRefs(
        skillsCategory.skills.reduce<
          Record<string, React.RefObject<HTMLElement>>
        >((acc, curr) => {
          acc[curr._id] = React.createRef();
          return acc;
        }, {})
      );
    }
  }, [skillsCategory]);

  React.useEffect(() => {
    if (skillId && refs[skillId]) {
      refs?.[skillId]?.current?.scrollIntoView({ block: 'center' });
    }
  }, [skillId, refs]);

  React.useEffect(() => {
    if (deleteSkillResponse.isSuccess || toggleSkillResponse.isSuccess) {
      skillsCategoriesRefetch();
    }
  }, [deleteSkillResponse, toggleSkillResponse, skillsCategoriesRefetch]);

  React.useEffect(() => {
    if (deleteSkillResponse.isSuccess || toggleSkillResponse.isSuccess) {
      activeSkillsCategoriesRefetch();
    }
  }, [deleteSkillResponse, toggleSkillResponse, activeSkillsCategoriesRefetch]);

  React.useEffect(() => {
    if (deleteSkillsCategoryResponse.isSuccess) {
      navigate('/skills', { replace: true });
    }
  }, [navigate, deleteSkillsCategoryResponse]);

  return notFoundError ? (
    <NotFoundRoute />
  ) : (
    <LoadingErrorContainer
      loadingObject={{
        isTrue:
          skillsCategoriesIsLoading ||
          activeSkillsCategoriesIsLoading ||
          loggedInIsFetching,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: skillsCategoriesIsError || activeSkillsCategoriesIsError,
        component: <LoadingError fixButton={{ onClick: refetchFunction }} />,
      }}
    >
      <style.SkillsCategories>
        <OnScreenNotification
          messages={[
            {
              isShow: toggleSkillsCategoryResponse.isLoading,
              messageText: `toggle skills category ${
                skillsCategory?.isActive ? 'off' : 'on'
              }`,
            },
            {
              isShow: toggleSkillsCategoryResponse.isError,
              messageText: 'toggle skills category error',
              closeAfter: 5,
            },
            {
              isShow: deleteSkillsCategoryResponse.isLoading,
              messageText: 'delete skills category',
            },
            {
              isShow: deleteSkillsCategoryResponse.isError,
              messageText: 'delete skills category error',
              closeAfter: 5,
            },
            {
              isShow: toggleSkillResponse.isLoading,
              messageText: `toggle skill ${
                skillsCategory?.isActive ? 'off' : 'on'
              }`,
            },
            {
              isShow: toggleSkillResponse.isError,
              messageText: 'toggle skill error',
              closeAfter: 5,
            },
            {
              isShow: deleteSkillResponse.isLoading,
              messageText: 'delete skill',
            },
            {
              isShow: deleteSkillResponse.isError,
              messageText: 'delete skill error',
              closeAfter: 5,
            },
          ]}
        />
        <style.SkillsCategoryHeaderContainer>
          <style.SkillsCategoryHeader>
            {skillsCategory?.name}
            <CloseButton defaultRoute="/skills" />
          </style.SkillsCategoryHeader>
          {loggedInData && (
            <style.ButtonsContainer>
              <ItemButtons
                deleteFunction={deleteSkillsCategory}
                toggleFunction={toggleSkillsCategory}
                item={skillsCategory}
                updateRoute={`/skills/category/update/${skillsCategory?._id}`}
                name="skills category"
              />
            </style.ButtonsContainer>
          )}
        </style.SkillsCategoryHeaderContainer>
        <style.SkillsCategoriesContainer>
          {skillsCategory?.skills.map((skill) => {
            return (
              <style.SkillsCategoryContainer
                key={skill._id}
                ref={refs[skill._id]}
              >
                <style.SkillHeader>{skill.name}</style.SkillHeader>
                {skill.attributes.length > 0 && (
                  <style.SkillAttributesList>
                    {skill.attributes.map((attribute, index) => {
                      return (
                        <style.ListItemContainer key={index}>
                          <style.ListItemIcon />
                          <style.SkillAttribute>
                            {attribute}
                          </style.SkillAttribute>
                        </style.ListItemContainer>
                      );
                    })}
                  </style.SkillAttributesList>
                )}
                {skill.projects.length > 0 && (
                  <>
                    <style.SkillProjectsHeader>
                      projects
                    </style.SkillProjectsHeader>
                    <style.skillProjectsList>
                      {skill.projects.map((project, index) => {
                        return (
                          <style.ListItemContainer key={index}>
                            <style.ListItemIcon />
                            <style.SkillProject to={`/projects/${project._id}`}>
                              {project.header}
                            </style.SkillProject>
                          </style.ListItemContainer>
                        );
                      })}
                    </style.skillProjectsList>
                  </>
                )}
                {loggedInData && (
                  <style.ButtonsContainer>
                    <ItemButtons
                      deleteFunction={deleteSkill}
                      toggleFunction={toggleSkill}
                      item={skill}
                      updateRoute={`/skills/update/${skill?._id}`}
                      name="skill"
                    />
                  </style.ButtonsContainer>
                )}
              </style.SkillsCategoryContainer>
            );
          })}
        </style.SkillsCategoriesContainer>
      </style.SkillsCategories>
    </LoadingErrorContainer>
  );
};

export default SkillsCategory;
