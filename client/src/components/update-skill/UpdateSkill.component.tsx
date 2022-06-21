import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  FormProvider,
} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { skillFormDefaultValue } from '../../common/constants/forms-default-values';
import { SkillForm as ISkillForm } from '../../common/interfaces/skill-form.interface';
import {
  useGetActiveSkillsCategoriesQuery,
  useGetSkillsCategoriesQuery,
} from '../../services/skills-categories/skills-categories.service';
import {
  useGetSkillsQuery,
  useUpdateSkillMutation,
} from '../../services/skills/skills.service';
import { CreateSkill } from '../../common/interfaces/create-skill.interface';
import {
  stringArrayToStringObject,
  stringObjectToStringArray,
} from '../../common/functions/helpers.function';
import SkillForm from '../skill-form/SkillForm.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import Loading from '../loading/Loading.component';
import NotFoundRoute from '../not-found-route/NotFoundRoute.component';
import LoadingError from '../loading-error/LoadingError.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import CloseButton from '../close-button/ClosButton.component';
import DisableForm from '../disable-form/DisableForm.component';

import * as style from './style/update-skill.style';

const UpdateSkill = (): JSX.Element => {
  const {
    data: skillsData,
    isSuccess: skillsIsSuccess,
    isLoading: skillsIsLoading,
    isError: skillsIsError,
    refetch: skillsRefetch,
  } = useGetSkillsQuery();

  const {
    data: skillsCategoriesData,
    isSuccess: skillsCategoriesIsSuccess,
    isLoading: skillsCategoriesIsLoading,
    isError: skillsCategoriesIsError,
    refetch: skillsCategoriesRefetch,
  } = useGetSkillsCategoriesQuery();
  const {
    isSuccess: activeSkillsCategoriesIsSuccess,
    refetch: activeSkillsCategoriesRefetch,
  } = useGetActiveSkillsCategoriesQuery();

  const { id } = useParams();
  const navigate = useNavigate();

  const [updateSkill, updateSkillResponse] = useUpdateSkillMutation();

  const skill = React.useMemo(() => {
    if (skillsData && id) {
      return skillsData[id];
    }
  }, [skillsData, id]);

  const skillValidationSchema = yup
    .object({
      name: yup.string().required(),
      attributes: yup
        .array()
        .of(
          yup.object({
            name: yup.string().required('Attribute is a required field'),
          })
        )
        .required(),
      skillsCategory: yup.string().required(),
    })
    .required();

  const formMethods = useForm<ISkillForm>({
    defaultValues: skillFormDefaultValue,
    resolver: yupResolver(skillValidationSchema),
  });

  const { handleSubmit, reset, control } = React.useMemo(
    () => formMethods,
    [formMethods]
  );

  const {
    fields: attributes,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    name: 'attributes',
    control,
  });

  const onSubmit: SubmitHandler<ISkillForm> = (skill) => {
    const createNewSkillData: CreateSkill = {
      ...skill,
      attributes: stringObjectToStringArray(skill.attributes),
    };
    if (id) {
      updateSkill({ skillId: id, skill: createNewSkillData });
    }
  };

  React.useEffect(() => {
    if (updateSkillResponse.isSuccess) {
      skillsCategoriesRefetch();
    }
  }, [updateSkillResponse, skillsCategoriesRefetch]);

  React.useEffect(() => {
    if (updateSkillResponse.isSuccess) {
      activeSkillsCategoriesRefetch();
    }
  }, [updateSkillResponse, activeSkillsCategoriesRefetch]);

  React.useEffect(() => {
    if (
      updateSkillResponse.isSuccess &&
      skillsCategoriesIsSuccess &&
      activeSkillsCategoriesIsSuccess
    ) {
      navigate(`/skills/${skill?.skillsCategory}`);
    }
  }, [
    navigate,
    updateSkillResponse,
    skillsCategoriesIsSuccess,
    activeSkillsCategoriesIsSuccess,
    skill,
  ]);

  const skillFormData: ISkillForm | undefined = React.useMemo(() => {
    if (skill) {
      return {
        ...skill,
        attributes: stringArrayToStringObject(skill.attributes),
      };
    }
  }, [skill]);

  const notFoundError = React.useMemo(() => {
    if (skillsIsSuccess && skillsData && id && !skillsData[id]) {
      return true;
    }
  }, [skillsIsSuccess, skillsData, id]);

  React.useEffect(() => {
    if (skillFormData) {
      reset(skillFormData);
    }
  }, [skillFormData, reset]);

  return notFoundError ? (
    <NotFoundRoute />
  ) : (
    <LoadingErrorContainer
      loadingObject={{
        isTrue: skillsIsLoading || skillsCategoriesIsLoading,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: skillsIsError || skillsCategoriesIsError,
        component: (
          <LoadingError
            fixButton={{
              onClick: () => {
                skillsRefetch();
                skillsCategoriesRefetch();
              },
            }}
          />
        ),
      }}
    >
      <style.UpdateSkill>
        <OnScreenNotification
          messages={[
            {
              isShow: updateSkillResponse.isLoading,
              messageText: 'updating skill',
            },
            {
              isShow: updateSkillResponse.isError,
              messageText: 'skill update error',
              closeAfter: 5,
            },
          ]}
        />
        <style.UpdateSkillHeader>
          update skill
          <CloseButton defaultRoute={`/skills/${id}`} />
        </style.UpdateSkillHeader>
        <style.UpdateSkillContainer>
          <DisableForm disabled={updateSkillResponse.isLoading}>
            <FormProvider {...formMethods}>
              <SkillForm
                skillsCategories={skillsCategoriesData}
                attributes={attributes}
                removeAttribute={removeAttribute}
              />
            </FormProvider>
          </DisableForm>
          <style.buttonsContainer>
            <style.UpdateSkillButton
              type="button"
              onClick={() => appendAttribute({ name: '' })}
            >
              add attribute
            </style.UpdateSkillButton>
            <style.UpdateSkillButton
              type="button"
              onClick={() => {
                if (skillFormData) {
                  reset(skillFormData);
                }
              }}
            >
              undo changes
            </style.UpdateSkillButton>
            <style.UpdateSkillButton
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              update skill
            </style.UpdateSkillButton>
          </style.buttonsContainer>
        </style.UpdateSkillContainer>
      </style.UpdateSkill>
    </LoadingErrorContainer>
  );
};

export default UpdateSkill;
