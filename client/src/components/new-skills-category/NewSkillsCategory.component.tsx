import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

import { skillsCategoryFormDefaultValue } from '../../common/constants/forms-default-values';
import { CreateSkillsCategory } from '../../common/interfaces/create-skills-category.interface';
import {
  useCreateSkillsCategoryMutation,
  useDeleteNewSkillsCategoryMutation,
  useGetNewSkillsCategoryQuery,
  useUpdateNewSkillsCategoryMutation,
} from '../../services/skills-categories/skills-categories.service';
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks';
import { persistNewSkillsCategory } from '../../slices/new-skills-category.slice';
import { IsDirtyKeys, setIsDirty } from '../../reducers/isDirty.reducer';
import SkillsCategoryForm from '../skills-category-form/SkillsCategoryForm.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import Loading from '../loading/Loading.component';
import LoadingError from '../loading-error/LoadingError.component';
import DisableForm from '../disable-form/DisableForm.component';
import DeleteButton from '../delete-button/DeleteButton.component';
import FormItemButtons from '../form-item-buttons/FormItemButtons.component';

import * as style from './style/new-skills-category.style';

const NewSkillsCategory = (): JSX.Element => {
  const {
    data: newSkillsCategoryData,
    isLoading: newSkillsCategoryIsLoading,
    isError: newSkillsCategoryIsError,
    refetch: newSkillsCategoryRefetch,
  } = useGetNewSkillsCategoryQuery();
  const [updateSkillsCategory, updateSkillsCategoryResponse] =
    useUpdateNewSkillsCategoryMutation();
  const [deleteNewSkillsCategory, deleteSkillsCategoryResponse] =
    useDeleteNewSkillsCategoryMutation();
  const [createSkillsCategory, createSkillsCategoryResponse] =
    useCreateSkillsCategoryMutation();

  const newSkillsCategoryLocalData = useAppSelector(
    (state) => state.newSkillsCategory
  );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [toNavigate, setToNavigate] = React.useState(false);

  const newSkillsCategory = React.useMemo(() => {
    if (newSkillsCategoryData) {
      const { name = '' } = newSkillsCategoryData;
      return { name };
    }
  }, [newSkillsCategoryData]);

  const skillsCategoryValidationSchema = yup
    .object({
      name: yup.string().required(),
    })
    .required();

  const formMethods = useForm<CreateSkillsCategory>({
    defaultValues: skillsCategoryFormDefaultValue,
    resolver: yupResolver(skillsCategoryValidationSchema),
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = React.useMemo(() => formMethods, [formMethods]);

  const onSubmit: SubmitHandler<CreateSkillsCategory> = (skillsCategory) =>
    createSkillsCategory(skillsCategory);

  React.useEffect(() => {
    dispatch(setIsDirty({ key: IsDirtyKeys.SkillsCategoryForm, isDirty }));
  }, [dispatch, isDirty]);

  React.useEffect(() => {
    const subscription = watch((data) => {
      dispatch(
        persistNewSkillsCategory(_.cloneDeep(data) as CreateSkillsCategory)
      );
    });

    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  React.useEffect(() => {
    reset(newSkillsCategory);
  }, [newSkillsCategory, reset]);

  React.useEffect(() => {
    reset(newSkillsCategoryLocalData, { keepDefaultValues: true });
  }, []);

  React.useEffect(() => {
    if (
      createSkillsCategoryResponse.isSuccess ||
      deleteSkillsCategoryResponse.isSuccess
    ) {
      reset(skillsCategoryFormDefaultValue);
      setToNavigate(true);
    }
  }, [createSkillsCategoryResponse, deleteSkillsCategoryResponse, reset]);

  React.useEffect(() => {
    if (createSkillsCategoryResponse.isSuccess && toNavigate) {
      navigate('/skills');
    }
  }, [navigate, createSkillsCategoryResponse, toNavigate]);

  return (
    <LoadingErrorContainer
      loadingObject={{
        isTrue: newSkillsCategoryIsLoading,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: newSkillsCategoryIsError,
        component: (
          <LoadingError fixButton={{ onClick: newSkillsCategoryRefetch }} />
        ),
      }}
    >
      <style.NewSkillsCategory>
        <OnScreenNotification
          messages={[
            {
              isShow: createSkillsCategoryResponse.isLoading,
              messageText: 'creating skills category',
            },
            {
              isShow: createSkillsCategoryResponse.isError,
              messageText: 'skills category creation error',
              closeAfter: 5,
            },
            {
              isShow: updateSkillsCategoryResponse.isLoading,
              messageText: 'saving skills category progress',
            },
            {
              isShow: updateSkillsCategoryResponse.isError,
              messageText: 'skills category saving error',
              closeAfter: 5,
            },
            {
              isShow: deleteSkillsCategoryResponse.isLoading,
              messageText: 'deleting skills category',
            },
            {
              isShow: deleteSkillsCategoryResponse.isError,
              messageText: 'skills category delete error',
              closeAfter: 5,
            },
          ]}
        />
        <style.NewSkillsCategoryHeader>
          new skills category
        </style.NewSkillsCategoryHeader>
        <style.NewSkillsCategoryContainer onSubmit={handleSubmit(onSubmit)}>
          <DisableForm
            disabled={
              updateSkillsCategoryResponse.isLoading ||
              deleteSkillsCategoryResponse.isLoading ||
              createSkillsCategoryResponse.isLoading
            }
          >
            <FormProvider {...formMethods}>
              <SkillsCategoryForm />
            </FormProvider>
          </DisableForm>

          <FormItemButtons
            deleteFunction={deleteNewSkillsCategory}
            deleteItem={undefined}
            successErrorObject={{
              success: deleteSkillsCategoryResponse.isSuccess,
              error: deleteSkillsCategoryResponse.isError,
            }}
            resetFunction={reset}
            updateFunction={updateSkillsCategory}
            updateItem={watch()}
            itemName="skills category"
          />

          {/* <style.buttonsContainer>
            <style.NewSkillsCategoryButton
              type="button"
              onClick={() => {
                reset();
              }}
            >
              undo changes
            </style.NewSkillsCategoryButton>
            <DeleteButton
              deleteFunction={deleteNewSkillsCategory}
              deleteItem={undefined}
              successErrorObject={{
                success: deleteSkillsCategoryResponse.isSuccess,
                error: deleteSkillsCategoryResponse.isError,
              }}
            >
              <style.NewSkillsCategoryButton
                type="button"
                // onClick={() => deleteNewSkillsCategory()}
              >
                delete skills category
              </style.NewSkillsCategoryButton>
            </DeleteButton>
            <style.NewSkillsCategoryButton
              type="button"
              onClick={() => updateSkillsCategory(watch())}
            >
              save progress
            </style.NewSkillsCategoryButton>
            <style.NewSkillsCategoryButton
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              add skills category
            </style.NewSkillsCategoryButton>
          </style.buttonsContainer> */}
        </style.NewSkillsCategoryContainer>
      </style.NewSkillsCategory>
    </LoadingErrorContainer>
  );
};

export default NewSkillsCategory;
