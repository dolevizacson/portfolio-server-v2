import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import _ from 'lodash';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import {
  stringArrayToStringObject,
  stringObjectToStringArray,
} from '../../common/functions/helpers.function';
import { skillFormDefaultValue } from '../../common/constants/forms-default-values';
import {
  useCreateSkillMutation,
  useDeleteNewSkillMutation,
  useGetNewSkillQuery,
  useUpdateNewSkillMutation,
} from '../../services/skills/skills.service';
import {
  useGetActiveSkillsCategoriesQuery,
  useGetSkillsCategoriesQuery,
} from '../../services/skills-categories/skills-categories.service';
import { SkillForm as ISkillForm } from '../../common/interfaces/skill-form.interface';
import { CreateSkill } from '../../common/interfaces/create-skill.interface';
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks';
import { persistNewSkill } from '../../slices/new-skill.slice';
import { IsDirtyKeys, setIsDirty } from '../../reducers/isDirty.reducer';
import SkillForm from '../skill-form/SkillForm.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import Loading from '../loading/Loading.component';
import LoadingError from '../loading-error/LoadingError.component';
import FormItemButtons from '../form-item-buttons/FormItemButtons.component';
import { DisableForm } from '../disable-form/style/disable-form.style';

import * as style from './style/new-skill.style';

const NewSkill = (): JSX.Element => {
  const {
    data: skillsCategoriesData,
    isLoading: skillsCategoriesIsLoading,
    isError: skillsCategoriesIsError,
    isSuccess: skillsCategoriesDataIsSuccess,
    refetch: skillsCategoriesRefetch,
  } = useGetSkillsCategoriesQuery();

  const {
    isSuccess: activeSkillsCategoriesDataIsSuccess,
    refetch: activeSkillsCategoriesRefetch,
  } = useGetActiveSkillsCategoriesQuery();

  const {
    data: newSkillData,
    isLoading: newSkillIsLoading,
    isError: newSkillIsError,
    refetch: newSkillRefetch,
  } = useGetNewSkillQuery(undefined, {
    skip: skillsCategoriesIsLoading,
  });
  const [updateNewSkill, updateNewSkillResponse] = useUpdateNewSkillMutation();
  const [deleteNewSkill, deleteNewSkillResponse] = useDeleteNewSkillMutation();
  const [createNewSkill, createNewSkillResponse] = useCreateSkillMutation();

  const navigate = useNavigate();

  const newSkillLocalData = useAppSelector((state) => state.newSkill);
  const dispatch = useAppDispatch();

  const [toNavigate, setToNavigate] = React.useState(false);

  const newSkill = React.useMemo(() => {
    if (newSkillData) {
      const { name = '', attributes = [], skillsCategory = '' } = newSkillData;
      return { name, attributes, skillsCategory };
    }
  }, [newSkillData]);

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

  const {
    handleSubmit,
    reset,
    watch,
    control,
    getValues,
    formState: { isDirty },
  } = React.useMemo(() => formMethods, [formMethods]);

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
    createNewSkill(createNewSkillData);
  };

  React.useEffect(() => {
    const subscription = watch((data) => {
      dispatch(persistNewSkill(_.cloneDeep(data) as ISkillForm));
    });

    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  React.useEffect(() => {
    if (newSkill) {
      const skillFormData: ISkillForm = {
        ...newSkill,
        attributes: stringArrayToStringObject(newSkill.attributes),
      };
      reset(skillFormData);
    }
  }, [newSkill, reset]);

  React.useEffect(() => {
    reset(newSkillLocalData, { keepDefaultValues: true });
  }, []);

  React.useEffect(() => {
    if (createNewSkillResponse.isSuccess || deleteNewSkillResponse.isSuccess) {
      reset(skillFormDefaultValue);
      setToNavigate(true);
    }
  }, [createNewSkillResponse, deleteNewSkillResponse, reset]);

  React.useEffect(() => {
    if (createNewSkillResponse.isSuccess) {
      skillsCategoriesRefetch();
    }
  }, [createNewSkillResponse, skillsCategoriesRefetch]);

  React.useEffect(() => {
    if (createNewSkillResponse.isSuccess) {
      activeSkillsCategoriesRefetch();
    }
  }, [createNewSkillResponse, activeSkillsCategoriesRefetch]);

  React.useEffect(() => {
    dispatch(setIsDirty({ key: IsDirtyKeys.SkillForm, isDirty }));
  }, [dispatch, isDirty]);

  React.useEffect(() => {
    if (
      createNewSkillResponse.isSuccess &&
      skillsCategoriesDataIsSuccess &&
      activeSkillsCategoriesDataIsSuccess &&
      toNavigate
    ) {
      navigate(
        `/skills/${createNewSkillResponse.data.skillsCategory._id}/skill/${createNewSkillResponse.data._id}`
      );
    }
  }, [
    navigate,
    getValues,
    createNewSkillResponse,
    skillsCategoriesDataIsSuccess,
    activeSkillsCategoriesDataIsSuccess,
    toNavigate,
  ]);

  return (
    <LoadingErrorContainer
      loadingObject={{
        isTrue: newSkillIsLoading || skillsCategoriesIsLoading,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: newSkillIsError || skillsCategoriesIsError,
        component: (
          <LoadingError
            fixButton={{
              onClick: () => {
                newSkillRefetch();
                skillsCategoriesRefetch();
              },
            }}
          />
        ),
      }}
    >
      <style.NewSkill>
        <OnScreenNotification
          messages={[
            {
              isShow: createNewSkillResponse.isLoading,
              messageText: 'creating skill',
            },
            {
              isShow: createNewSkillResponse.isError,
              messageText: 'skill creation error',
              closeAfter: 5,
            },
            {
              isShow: updateNewSkillResponse.isLoading,
              messageText: 'saving skill progress',
            },
            {
              isShow: updateNewSkillResponse.isError,
              messageText: 'skill saving error',
              closeAfter: 5,
            },
            {
              isShow: deleteNewSkillResponse.isLoading,
              messageText: 'deleting skill',
            },
            {
              isShow: deleteNewSkillResponse.isError,
              messageText: 'skill delete error',
              closeAfter: 5,
            },
          ]}
        />
        <style.NewSkillHeader>new skill</style.NewSkillHeader>
        <style.NewSkillContainer onSubmit={handleSubmit(onSubmit)}>
          <DisableForm
            disabled={
              updateNewSkillResponse.isLoading ||
              deleteNewSkillResponse.isLoading ||
              createNewSkillResponse.isLoading
            }
          >
            <FormProvider {...formMethods}>
              <SkillForm
                skillsCategories={skillsCategoriesData}
                attributes={attributes}
                removeAttribute={removeAttribute}
              />
            </FormProvider>
          </DisableForm>

          <FormItemButtons
            deleteFunction={deleteNewSkill}
            deleteItem={undefined}
            successErrorObject={{
              success: deleteNewSkillResponse.isSuccess,
              error: deleteNewSkillResponse.isError,
            }}
            resetFunction={reset}
            updateFunction={updateNewSkill}
            updateItem={{
              ...watch(),
              attributes: stringObjectToStringArray(watch().attributes),
            }}
            itemName="skill"
          >
            <style.NewSkillButton
              type="button"
              onClick={() => appendAttribute({ name: '' })}
            >
              add attribute
            </style.NewSkillButton>
          </FormItemButtons>
        </style.NewSkillContainer>
      </style.NewSkill>
    </LoadingErrorContainer>
  );
};

export default NewSkill;
