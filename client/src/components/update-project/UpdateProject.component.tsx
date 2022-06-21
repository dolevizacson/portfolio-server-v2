import * as React from 'react';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  useAddProjectImageMutation,
  useDeleteProjectImageMutation,
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from '../../services/projects/projects.service';
import { CreateProject } from '../../common/interfaces/create-project.interface';
import {
  imageFormDefaultValue,
  projectFormDefaultValue,
} from '../../common/constants/forms-default-values';
import { Image } from '../../common/interfaces/image.interface';
import { imageFileType } from '../../common/constants/common.constants';
import { useGetSkillsQuery } from '../../services/skills/skills.service';
import ProjectForm from '../project-form/ProjectForm.component';
import ImageForm from '../image-form/ImageForm.component';
import ImageGallery from '../image-gallery/ImageGallery.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import Loading from '../loading/Loading.component';
import NotFoundRoute from '../not-found-route/NotFoundRoute.component';
import DisableForm from '../disable-form/DisableForm.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import CloseButton from '../close-button/ClosButton.component';
import LoadingError from '../loading-error/LoadingError.component';

import * as style from './style/update-project.style';

const UpdateProject = (): JSX.Element => {
  const {
    data: skillsData,
    isSuccess: skillsIsSuccess,
    isFetching: skillsIsFetching,
    isLoading: skillsIsLoading,
    isError: skillsIsError,
    refetch: skillsRefetch,
  } = useGetSkillsQuery();
  const {
    data: projectsData,
    isSuccess: projectsIsSuccess,
    isLoading: projectsIsLoading,
    isError: projectsIsError,
    refetch: projectsRefetch,
  } = useGetProjectsQuery(undefined, {
    skip: skillsIsFetching,
  });

  const [addProjectImage, addProjectImageResponse] =
    useAddProjectImageMutation();
  const [deleteProjectImage, deleteProjectImageResponse] =
    useDeleteProjectImageMutation();

  const { id } = useParams();
  const navigate = useNavigate();

  const [updateProject, updateProjectResponse] = useUpdateProjectMutation();

  const project: CreateProject | undefined = React.useMemo(() => {
    if (projectsData && id) {
      return {
        ...projectsData[id],
        technologies: projectsData[id]?.technologies?.map((skill) => skill._id),
      };
    }
  }, [projectsData, id]);

  const projectValidationSchema = yup
    .object({
      header: yup.string().required(),
      summery: yup.string().required(),
      description: yup.string().required(),
      links: yup.array().of(
        yup.object({
          name: yup.string().required(),
          url: yup.string().url().required(),
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

  const { handleSubmit, reset, control } = React.useMemo(
    () => formMethods,
    [formMethods]
  );

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
    if (id) {
      updateProject({ projectId: id, project });
    }
  };

  const notFoundError = React.useMemo(() => {
    if (
      projectsIsSuccess &&
      skillsIsSuccess &&
      projectsData &&
      id &&
      !projectsData[id]
    ) {
      return true;
    }
  }, [id, projectsData, projectsIsSuccess, skillsIsSuccess]);

  React.useEffect(() => {
    reset(project);
  }, [reset, project]);

  React.useEffect(() => {
    if (updateProjectResponse.isSuccess && id) {
      navigate(`/projects/${id}`);
    }
  }, [navigate, updateProjectResponse, id]);

  return notFoundError ? (
    <NotFoundRoute />
  ) : (
    <LoadingErrorContainer
      loadingObject={{
        isTrue: skillsIsLoading || projectsIsLoading,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: skillsIsError || projectsIsError,
        component: (
          <LoadingError
            fixButton={{
              onClick: () => {
                skillsRefetch();
                projectsRefetch();
              },
            }}
          />
        ),
      }}
    >
      <style.UpdateProject>
        <OnScreenNotification
          messages={[
            {
              isShow: updateProjectResponse.isLoading,
              messageText: 'updating project',
            },
            {
              isShow: updateProjectResponse.isError,
              messageText: 'project update error',
              closeAfter: 5,
            },
            {
              isShow: addProjectImageResponse.isLoading,
              messageText: 'uploading image',
            },
            {
              isShow: addProjectImageResponse.isError,
              messageText: 'image upload error',
              closeAfter: 5,
            },
            {
              isShow: deleteProjectImageResponse.isLoading,
              messageText: 'deleting image',
            },
            {
              isShow: deleteProjectImageResponse.isError,
              messageText: 'image delete error',
              closeAfter: 5,
            },
          ]}
        />
        <style.UpdateProjectHeader>
          update project <CloseButton defaultRoute={`/projects/${id}`} />
        </style.UpdateProjectHeader>
        <style.UpdateProjectContainer>
          <DisableForm disabled={updateProjectResponse.isLoading}>
            <FormProvider {...formMethods}>
              <ProjectForm
                links={links}
                removeLink={removeLink}
                skills={skillsData}
              />
            </FormProvider>

            <style.UpdateProjectAddImageContainer>
              <style.UpdateProjectAddImageContainerHeader>
                images
              </style.UpdateProjectAddImageContainerHeader>

              {parseInt(`${project?.images?.length}`) > 0 && project?.images && (
                <ImageGallery
                  images={project.images}
                  imageGallerySizing={{ imageSize: 200, gapSize: 15 }}
                  deleteButtonObject={{
                    deleteFunction: deleteProjectImage,
                    deleteData: project.images.map((image) => {
                      return { imageId: image.id, projectId: id };
                    }),
                  }}
                />
              )}
              <style.UpdateProjectImageFormContainer>
                <DisableForm
                  disabled={
                    addProjectImageResponse.isLoading ||
                    deleteProjectImageResponse.isLoading
                  }
                >
                  <FormProvider {...imageFormMethods}>
                    <ImageForm />
                  </FormProvider>
                </DisableForm>
                <style.UpdateProjectAddImageButton
                  type="button"
                  onClick={handleSubmitImage<Image>((image) =>
                    addProjectImage({ projectId: id, image })
                  )}
                >
                  add image
                </style.UpdateProjectAddImageButton>
              </style.UpdateProjectImageFormContainer>
            </style.UpdateProjectAddImageContainer>
          </DisableForm>

          <style.buttonsContainer>
            <style.UpdateProjectButton
              type="button"
              onClick={() => appendLink({ name: '', url: '' })}
            >
              add link
            </style.UpdateProjectButton>
            <style.UpdateProjectButton
              type="button"
              onClick={() => {
                reset(project);
              }}
            >
              undo changes
            </style.UpdateProjectButton>
            <style.UpdateProjectButton
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              update
            </style.UpdateProjectButton>
          </style.buttonsContainer>
        </style.UpdateProjectContainer>
      </style.UpdateProject>
    </LoadingErrorContainer>
  );
};

export default UpdateProject;
