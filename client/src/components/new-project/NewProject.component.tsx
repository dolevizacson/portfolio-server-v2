import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import * as yup from 'yup';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

import {
  imageFormDefaultValue,
  projectFormDefaultValue,
} from '../../common/constants/forms-default-values';
import { CreateProject } from '../../common/interfaces/create-project.interface';
import {
  useAddNewProjectImageMutation,
  useCreateProjectMutation,
  useDeleteNewProjectImageMutation,
  useDeleteNewProjectMutation,
  useGetNewProjectQuery,
  useUpdateNewProjectMutation,
} from '../../services/projects/projects.service';
import { useGetSkillsQuery } from '../../services/skills/skills.service';
import { imageFileType } from '../../common/constants/common.constants';
import { Image } from '../../common/interfaces/image.interface';
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks';
import { persistNewProject } from '../../slices/new-project.slice';
import { IsDirtyKeys, setIsDirty } from '../../reducers/isDirty.reducer';
import ProjectForm from '../project-form/ProjectForm.component';
import ImageForm from '../image-form/ImageForm.component';
import Loading from '../loading/Loading.component';
import ImageGallery from '../image-gallery/ImageGallery.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import LoadingError from '../loading-error/LoadingError.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import DisableForm from '../disable-form/DisableForm.component';

import * as style from './style/new-project.style';

const NewProject = (): JSX.Element => {
  const {
    data: skillsData,
    isFetching: skillsIsFetching,
    isLoading: skillsIsLoading,
    isError: skillsIsError,
    refetch: skillsRefetch,
  } = useGetSkillsQuery();
  const {
    data: newProjectData,
    isLoading: newProjectIsLoading,
    isError: newProjectIsError,
    refetch: newProjectRefetch,
  } = useGetNewProjectQuery(undefined, {
    skip: skillsIsFetching,
  });
  const [updateNewProject, updateNewProjectResponse] =
    useUpdateNewProjectMutation();
  const [deleteNewProject, deleteNewProjectResponse] =
    useDeleteNewProjectMutation();
  const [createProject, createProjectResponse] = useCreateProjectMutation();

  const [addNewProjectImage, addNewProjectImageResponse] =
    useAddNewProjectImageMutation();
  const [deleteNewProjectImage, deleteNewProjectImageResponse] =
    useDeleteNewProjectImageMutation();

  const navigate = useNavigate();

  const newProjectLocalData = useAppSelector((state) => state.newProject);
  const dispatch = useAppDispatch();

  const [toNavigate, setToNavigate] = React.useState(false);

  const newProject = React.useMemo(() => {
    if (newProjectData) {
      const {
        header = '',
        summery = '',
        description = '',
        links = [],
        technologies = [],
        images = [],
      } = newProjectData;
      return { header, summery, description, links, technologies, images };
    }
  }, [newProjectData]);

  const projectValidationSchema = yup
    .object({
      header: yup.string().required(),
      summery: yup.string().required(),
      description: yup.string().required(),
      links: yup.array().of(
        yup.object({
          name: yup.string().required('Name is a required field'),
          url: yup.string().url().required('Url is a required field'),
        })
      ),
      technologies: yup.array().of(yup.string().required()).min(1).required(),
      images: yup.array().of(
        yup.object({
          url: yup.string().required(),
          description: yup.string().required(),
          id: yup.string().required(),
        })
      ),
    })
    .required();

  const formMethods = useForm<CreateProject>({
    defaultValues: projectFormDefaultValue,
    resolver: yupResolver(projectValidationSchema),
  });

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { isDirty },
  } = React.useMemo(() => formMethods, [formMethods]);

  const ImageValidationSchema = yup
    .object({
      file: yup
        .mixed()
        .test('file exist', 'file is required', (fileList: FileList) => {
          return fileList?.length > 0;
        })
        .test('file type', 'file must be an image', (fileList: FileList) => {
          return imageFileType.has(fileList[0]?.type);
        }),
      description: yup.string().required(),
    })
    .required();

  const imageFormMethods = useForm<Image>({
    defaultValues: imageFormDefaultValue,
    resolver: yupResolver(ImageValidationSchema),
  });

  const { reset: resetImageForm } = React.useMemo(
    () => imageFormMethods,
    [imageFormMethods]
  );

  const { handleSubmit: handleSubmitImage } = React.useMemo(
    () => imageFormMethods,
    [imageFormMethods]
  );

  const {
    fields: links,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    name: 'links',
    control,
  });

  const onSubmit: SubmitHandler<CreateProject> = (project) => {
    createProject(project);
  };

  React.useEffect(() => {
    const subscription = watch((data) => {
      dispatch(persistNewProject(_.cloneDeep(data) as CreateProject));
    });

    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  React.useEffect(() => {
    reset(newProject);
  }, [newProject, reset]);

  React.useEffect(() => {
    reset(newProjectLocalData, { keepDefaultValues: true });
  }, []);

  React.useEffect(() => {
    if (addNewProjectImageResponse.isSuccess) {
      resetImageForm(imageFormDefaultValue);
    }
  }, [addNewProjectImageResponse, resetImageForm]);

  React.useEffect(() => {
    if (createProjectResponse.isSuccess || deleteNewProjectResponse.isSuccess) {
      reset(projectFormDefaultValue);
      setToNavigate(true);
    }
  }, [createProjectResponse, deleteNewProjectResponse, reset]);

  React.useEffect(() => {
    dispatch(setIsDirty({ key: IsDirtyKeys.ProjectForm, isDirty }));
  }, [dispatch, isDirty]);

  React.useEffect(() => {
    if (createProjectResponse.isSuccess && toNavigate) {
      navigate(`/projects/${createProjectResponse.data._id}`);
    }
  }, [navigate, createProjectResponse, toNavigate]);

  return (
    <LoadingErrorContainer
      loadingObject={{
        isTrue: skillsIsLoading || newProjectIsLoading,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: skillsIsError || newProjectIsError,
        component: (
          <LoadingError
            fixButton={{
              onClick: () => {
                skillsRefetch();
                newProjectRefetch();
              },
            }}
          />
        ),
      }}
    >
      <style.NewProject>
        <OnScreenNotification
          messages={[
            {
              isShow: createProjectResponse.isLoading,
              messageText: 'creating project',
            },
            {
              isShow: createProjectResponse.isError,
              messageText: 'project creation error',
              closeAfter: 5,
            },
            {
              isShow: updateNewProjectResponse.isLoading,
              messageText: 'saving project progress',
            },
            {
              isShow: updateNewProjectResponse.isError,
              messageText: 'project saving error',
              closeAfter: 5,
            },
            {
              isShow: deleteNewProjectResponse.isLoading,
              messageText: 'deleting project',
            },
            {
              isShow: deleteNewProjectResponse.isError,
              messageText: 'project delete error',
              closeAfter: 5,
            },
            {
              isShow: addNewProjectImageResponse.isLoading,
              messageText: 'uploading image',
            },
            {
              isShow: addNewProjectImageResponse.isError,
              messageText: 'image upload error',
              closeAfter: 5,
            },
            {
              isShow: deleteNewProjectImageResponse.isLoading,
              messageText: 'deleting image',
            },
            {
              isShow: deleteNewProjectImageResponse.isError,
              messageText: 'image delete error',
              closeAfter: 5,
            },
          ]}
        />
        <style.NewProjectHeader>new project</style.NewProjectHeader>
        <style.NewProjectContainer>
          <DisableForm
            disabled={
              createProjectResponse.isLoading ||
              updateNewProjectResponse.isLoading ||
              deleteNewProjectResponse.isLoading
            }
          >
            <FormProvider {...formMethods}>
              <ProjectForm
                links={links}
                removeLink={removeLink}
                skills={skillsData}
              />
            </FormProvider>
            <style.NewProjectAddImageContainer>
              <style.NewProjectAddImageContainerHeader>
                images
              </style.NewProjectAddImageContainerHeader>
              {parseInt(`${newProjectData?.images?.length}`) > 0 &&
                newProjectData?.images && (
                  <ImageGallery
                    images={newProjectData.images}
                    imageGallerySizing={{ imageSize: 200, gapSize: 15 }}
                    deleteButtonObject={{
                      deleteFunction: deleteNewProjectImage,
                      deleteData: newProjectData.images.map((image) => {
                        return image.id;
                      }),
                    }}
                  />
                )}
              <style.NewProjectImageFormContainer>
                <DisableForm
                  disabled={
                    addNewProjectImageResponse.isLoading ||
                    deleteNewProjectImageResponse.isLoading
                  }
                >
                  <FormProvider {...imageFormMethods}>
                    <ImageForm />
                  </FormProvider>
                </DisableForm>
                <style.NewProjectAddImageButton
                  type="button"
                  onClick={handleSubmitImage<Image>((data) => {
                    addNewProjectImage(data);
                  })}
                >
                  add image
                </style.NewProjectAddImageButton>
              </style.NewProjectImageFormContainer>
            </style.NewProjectAddImageContainer>
          </DisableForm>

          <style.buttonsContainer>
            <style.NewProjectButton
              type="button"
              onClick={() => appendLink({ name: '', url: '' })}
            >
              add link
            </style.NewProjectButton>
            <style.NewProjectButton
              type="button"
              onClick={() => {
                reset();
              }}
            >
              undo changes
            </style.NewProjectButton>
            <style.NewProjectButton
              type="button"
              onClick={() => deleteNewProject()}
            >
              delete project
            </style.NewProjectButton>
            <style.NewProjectButton
              type="button"
              onClick={() => {
                updateNewProject(watch());
              }}
            >
              save progress
            </style.NewProjectButton>
            <style.NewProjectButton
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              add project
            </style.NewProjectButton>
          </style.buttonsContainer>
        </style.NewProjectContainer>
      </style.NewProject>
    </LoadingErrorContainer>
  );
};

export default NewProject;
