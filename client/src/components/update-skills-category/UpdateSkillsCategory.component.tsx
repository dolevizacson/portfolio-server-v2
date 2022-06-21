import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { skillsCategoryFormDefaultValue } from '../../common/constants/forms-default-values';
import { CreateSkillsCategory } from '../../common/interfaces/create-skills-category.interface';
import {
  useGetSkillsCategoriesQuery,
  useUpdateSkillsCategoryMutation,
} from '../../services/skills-categories/skills-categories.service';
import SkillsCategoryForm from '../skills-category-form/SkillsCategoryForm.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import Loading from '../loading/Loading.component';
import NotFoundRoute from '../not-found-route/NotFoundRoute.component';
import LoadingError from '../loading-error/LoadingError.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import DisableForm from '../disable-form/DisableForm.component';
import CloseButton from '../close-button/ClosButton.component';

import * as style from './style/update-skills-category.style';

const UpdateSkillsCategory = (): JSX.Element => {
  const {
    data: skillsCategoriesData,
    isSuccess: skillsCategoriesIsSuccess,
    isLoading: skillsCategoriesIsLoading,
    isError: skillsCategoriesIsError,
    refetch: skillsCategoriesRefetch,
  } = useGetSkillsCategoriesQuery();
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateSkillsCategory, updateSkillsCategoryResponse] =
    useUpdateSkillsCategoryMutation();

  const skillsCategory = React.useMemo(() => {
    if (skillsCategoriesData && id) {
      return skillsCategoriesData[id];
    }
  }, [skillsCategoriesData, id]);

  const skillsCategoryValidationSchema = yup
    .object({
      name: yup.string().required(),
    })
    .required();

  const formMethods = useForm<CreateSkillsCategory>({
    defaultValues: skillsCategoryFormDefaultValue,
    resolver: yupResolver(skillsCategoryValidationSchema),
  });

  const { handleSubmit, reset } = React.useMemo(
    () => formMethods,
    [formMethods]
  );

  const onSubmit: SubmitHandler<CreateSkillsCategory> = (skillsCategory) => {
    if (id) {
      updateSkillsCategory({ skillsCategoryId: id, skillsCategory });
    }
  };

  const notFoundError = React.useMemo(() => {
    if (
      skillsCategoriesIsSuccess &&
      skillsCategoriesData &&
      id &&
      !skillsCategoriesData[id]
    ) {
      return true;
    }
  }, [id, skillsCategoriesIsSuccess, skillsCategoriesData]);

  React.useEffect(() => {
    reset(skillsCategory);
  }, [reset, skillsCategory]);

  React.useEffect(() => {
    if (updateSkillsCategoryResponse.isSuccess) {
      navigate(`/skills/${id}`);
    }
  }, [navigate, updateSkillsCategoryResponse, id]);

  return notFoundError ? (
    <NotFoundRoute />
  ) : (
    <LoadingErrorContainer
      loadingObject={{
        isTrue: skillsCategoriesIsLoading,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: skillsCategoriesIsError,
        component: (
          <LoadingError fixButton={{ onClick: skillsCategoriesRefetch }} />
        ),
      }}
    >
      <style.UpdateSkillsCategory>
        <OnScreenNotification
          messages={[
            {
              isShow: updateSkillsCategoryResponse.isLoading,
              messageText: 'updating skills category',
            },
            {
              isShow: updateSkillsCategoryResponse.isError,
              messageText: 'skills category update error',
              closeAfter: 5,
            },
          ]}
        />
        <style.UpdateSkillsCategoryHeader>
          update skills category
          <CloseButton defaultRoute={`/skills/${id}`} />
        </style.UpdateSkillsCategoryHeader>
        <style.UpdateSkillsCategoryContainer>
          <DisableForm disabled={updateSkillsCategoryResponse.isLoading}>
            <FormProvider {...formMethods}>
              <SkillsCategoryForm />
            </FormProvider>
          </DisableForm>
          <style.buttonsContainer>
            <style.UpdateSkillsCategoryButton
              type="button"
              onClick={() => {
                reset();
              }}
            >
              undo changes
            </style.UpdateSkillsCategoryButton>
            <style.UpdateSkillsCategoryButton
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              update skills category
            </style.UpdateSkillsCategoryButton>
          </style.buttonsContainer>
        </style.UpdateSkillsCategoryContainer>
      </style.UpdateSkillsCategory>
    </LoadingErrorContainer>
  );
};

export default UpdateSkillsCategory;
