import * as React from 'react';

import { useIsLoggedInQuery } from '../../services/auth/auth.service';
import {
  useGetActiveSkillsCategoriesQuery,
  useGetSkillsCategoriesQuery,
} from '../../services/skills-categories/skills-categories.service';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import LoadingError from '../loading-error/LoadingError.component';
import Loading from '../loading/Loading.component';
import TextBlock from '../text-block/TextBlock.component';

import * as style from './style/skills-categories-list.style';

const SkillsCategoriesList = (): JSX.Element => {
  const { data: loggedInData, isFetching: loggedInIsFetching } =
    useIsLoggedInQuery();

  const {
    data: skillsCategoriesData,
    isFetching: skillsCategoriesIsFetching,
    isError: skillsCategoriesIsError,
    refetch: skillsCategoriesRefetch,
  } = useGetSkillsCategoriesQuery(undefined, {
    skip: !!!loggedInData,
  });

  const {
    data: activeSkillsCategoriesData,
    isFetching: activeSkillsCategoriesIsFetching,
    isError: activeSkillsCategoriesIsError,
    refetch: activeSkillsCategoriesRefetch,
  } = useGetActiveSkillsCategoriesQuery(undefined, {
    skip: !!loggedInData,
  });

  const skillsCategories = React.useMemo(
    () => skillsCategoriesData || activeSkillsCategoriesData,
    [skillsCategoriesData, activeSkillsCategoriesData]
  );

  const refetchFunction = React.useMemo(
    () =>
      !!loggedInData ? skillsCategoriesRefetch : activeSkillsCategoriesRefetch,
    [loggedInData, skillsCategoriesRefetch, activeSkillsCategoriesRefetch]
  );

  return (
    <LoadingErrorContainer
      loadingObject={{
        isTrue:
          loggedInIsFetching ||
          skillsCategoriesIsFetching ||
          activeSkillsCategoriesIsFetching,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: skillsCategoriesIsError || activeSkillsCategoriesIsError,
        component: <LoadingError fixButton={{ onClick: refetchFunction }} />,
      }}
    >
      <style.SkillsCategoriesList>
        <style.SkillsCategoriesListHeader>
          skills
        </style.SkillsCategoriesListHeader>
        <style.SkillsCategoriesListContainer>
          {skillsCategories && Object.values(skillsCategories).length === 0 && (
            <TextBlock>no skills found</TextBlock>
          )}
          {skillsCategories &&
            Object.values(skillsCategories).map((skillsCategory) => {
              return (
                <style.SkillCategory key={skillsCategory._id}>
                  <style.SkillCategoryHeader>
                    {skillsCategory.name}
                  </style.SkillCategoryHeader>
                  <style.SkillsNamesList>
                    {skillsCategory.skills.map((skill) => {
                      return (
                        <style.SkillNames key={skill._id}>
                          {skill.name}
                        </style.SkillNames>
                      );
                    })}
                  </style.SkillsNamesList>
                  <style.SkillCategoryButton to={`${skillsCategory._id}`}>
                    show more
                  </style.SkillCategoryButton>
                </style.SkillCategory>
              );
            })}
        </style.SkillsCategoriesListContainer>
      </style.SkillsCategoriesList>
    </LoadingErrorContainer>
  );
};

export default SkillsCategoriesList;
