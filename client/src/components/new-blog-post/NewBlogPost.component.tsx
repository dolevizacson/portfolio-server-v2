import * as React from 'react';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  FormProvider,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

import {
  useAddNewBlogPostImageMutation,
  useCreateBlogPostMutation,
  useDeleteNewBlogPostImageMutation,
  useDeleteNewBlogPostMutation,
  useGetNewBlogPostQuery,
  useUpdateNewBlogPostMutation,
} from '../../services/blog/blog.service';
import { CreateBlogPost } from '../../common/interfaces/create-blog-post.interface';
import {
  blogPostFormDefaultValue,
  blogPostImageFormDefaultValue,
} from '../../common/constants/forms-default-values';
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks';
import { persistNewBlogPost } from '../../slices/new-blog-post.slice';
import { IsDirtyKeys, setIsDirty } from '../../reducers/isDirty.reducer';
import { imageFileType } from '../../common/constants/common.constants';
import ImageForm from '../image-form/ImageForm.component';
import { BlogPostImage } from '../../common/interfaces/blog-post-image.interface';
import FormSelect from '../form-select/FormSelect.component';
import BlogPostForm from '../blog-post-form/BlogPostForm.component';
import Loading from '../loading/Loading.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import LoadingError from '../loading-error/LoadingError.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import DisableForm from '../disable-form/DisableForm.component';
import FormItemButtons from '../form-item-buttons/FormItemButtons.component';

import * as style from './style/new-blog-post.style';

const NewBlogPost = (): JSX.Element => {
  const {
    data: newBlogPostData,
    isLoading: newBlogPostIsLoading,
    isError: newBlogPostIsError,
    refetch: newBlogPostRefetch,
  } = useGetNewBlogPostQuery();

  const [updateNewBlogPost, updateNewBlogPostResponse] =
    useUpdateNewBlogPostMutation();
  const [deleteNewBlogPost, deleteNewBlogPostResponse] =
    useDeleteNewBlogPostMutation();
  const [createBlogPost, createBlogPostResponse] = useCreateBlogPostMutation();

  const [addNewBlogPostImage, addNewBlogPostImageResponse] =
    useAddNewBlogPostImageMutation();
  const [deleteNewBlogPostImage, deleteNewBlogPostImageResponse] =
    useDeleteNewBlogPostImageMutation();

  const newBlogPostLocalData = useAppSelector((state) => state.newBlogPost);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [toNavigate, setToNavigate] = React.useState(false);

  const newBlogPost = React.useMemo(() => {
    if (newBlogPostData) {
      const {
        header = '',
        summery = '',
        paragraphs = [],
        conclusion: { header: conclusionHeader = '', body = '' } = {},
      } = newBlogPostData;
      return {
        header,
        summery,
        paragraphs,
        conclusion: { header: conclusionHeader, body },
      };
    }
  }, [newBlogPostData]);

  const blogPostValidationSchema = yup
    .object({
      header: yup.string().required(),
      summery: yup.string().required(),
      paragraphs: yup
        .array()
        .of(
          yup.object({
            header: yup.string().required(),
            body: yup.string().required(),
            galley: yup.array().of(
              yup.object({
                url: yup.string().required(),
                description: yup.string().required(),
                id: yup.string().required(),
              })
            ),
          })
        )
        .required(),
      conclusion: yup.object({
        header: yup.string(),
        body: yup.string(),
      }),
    })
    .required();

  const formMethods = useForm<CreateBlogPost>({
    defaultValues: blogPostFormDefaultValue,
    resolver: yupResolver(blogPostValidationSchema),
  });

  const {
    handleSubmit,
    reset,
    watch,
    control,
    clearErrors,
    formState: { isDirty, errors },
  } = React.useMemo(() => formMethods, [formMethods]);

  const ImageValidationSchema = yup
    .object({
      paragraphId: yup.string().required(),
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

  const imageFormMethods = useForm<BlogPostImage>({
    defaultValues: blogPostImageFormDefaultValue,
    resolver: yupResolver(ImageValidationSchema),
  });

  const { handleSubmit: imageHandleSubmit } = React.useMemo(
    () => imageFormMethods,
    [imageFormMethods]
  );

  const {
    fields: paragraphs,
    append: appendParagraph,
    remove: removeParagraph,
  } = useFieldArray({
    name: 'paragraphs',
    control,
  });

  const onSubmit: SubmitHandler<CreateBlogPost> = (blogPost) =>
    createBlogPost(blogPost);

  React.useEffect(() => {
    const subscription = watch((data) => {
      dispatch(persistNewBlogPost(_.cloneDeep(data) as CreateBlogPost));
    });

    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  React.useEffect(() => {
    reset(newBlogPost);
  }, [newBlogPost, reset]);

  React.useEffect(() => {
    reset(newBlogPostLocalData, { keepDefaultValues: true });
  }, []);

  React.useEffect(() => {
    if (
      createBlogPostResponse.isSuccess ||
      deleteNewBlogPostResponse.isSuccess
    ) {
      reset(blogPostFormDefaultValue);
      setToNavigate(true);
    }
  }, [createBlogPostResponse, deleteNewBlogPostResponse, reset]);

  React.useEffect(() => {
    dispatch(setIsDirty({ key: IsDirtyKeys.BlogPostForm, isDirty }));
  }, [dispatch, isDirty]);

  React.useEffect(() => {
    if (createBlogPostResponse.isSuccess && toNavigate) {
      navigate(`/blog/${createBlogPostResponse.data._id}`);
    }
  }, [navigate, createBlogPostResponse, toNavigate]);

  return (
    <LoadingErrorContainer
      loadingObject={{ isTrue: newBlogPostIsLoading, component: <Loading /> }}
      errorObject={{
        isTrue: newBlogPostIsError,
        component: <LoadingError fixButton={{ onClick: newBlogPostRefetch }} />,
      }}
    >
      <style.NewBlogPost>
        <OnScreenNotification
          messages={[
            {
              isShow: createBlogPostResponse.isLoading,
              messageText: 'creating blog post',
            },
            {
              isShow: createBlogPostResponse.isError,
              messageText: 'blog post creation error',
              closeAfter: 5,
            },
            {
              isShow: updateNewBlogPostResponse.isLoading,
              messageText: 'saving blog post progress',
            },
            {
              isShow: updateNewBlogPostResponse.isError,
              messageText: 'blog post saving error',
              closeAfter: 5,
            },
            {
              isShow: deleteNewBlogPostResponse.isLoading,
              messageText: 'deleting blog post',
            },
            {
              isShow: deleteNewBlogPostResponse.isError,
              messageText: 'blog post delete error',
              closeAfter: 5,
            },
            {
              isShow: addNewBlogPostImageResponse.isLoading,
              messageText: 'uploading image',
            },
            {
              isShow: addNewBlogPostImageResponse.isError,
              messageText: 'image upload error',
              closeAfter: 5,
            },
            {
              isShow: deleteNewBlogPostImageResponse.isLoading,
              messageText: 'deleting image',
            },
            {
              isShow: deleteNewBlogPostImageResponse.isError,
              messageText: 'image delete error',
              closeAfter: 5,
            },
          ]}
        />
        <style.NewBlogPostHeader>new blog post</style.NewBlogPostHeader>
        <style.NewBlogPostContainer onSubmit={handleSubmit(onSubmit)}>
          <DisableForm
            disabled={
              createBlogPostResponse.isLoading ||
              updateNewBlogPostResponse.isLoading ||
              deleteNewBlogPostResponse.isLoading
            }
          >
            <style.NewBlogPostFormContainer>
              <FormProvider {...formMethods}>
                {newBlogPost && (
                  <BlogPostForm
                    paragraphs={paragraphs}
                    removeParagraph={removeParagraph}
                    deleteButtonObject={paragraphs.map((paragraph) => {
                      return paragraph.gallery === undefined
                        ? undefined
                        : {
                            deleteFunction: deleteNewBlogPostImage,
                            deleteData: paragraph.gallery.map((image) => {
                              return {
                                paragraphId: paragraph._id,
                                imageId: image.id,
                              };
                            }),
                          };
                    })}
                  />
                )}
              </FormProvider>
            </style.NewBlogPostFormContainer>
            <style.NewBlogPostAddImageContainer>
              <style.NewBlogPostAddImageHeader>
                images
              </style.NewBlogPostAddImageHeader>
              <DisableForm
                disabled={
                  addNewBlogPostImageResponse.isLoading ||
                  deleteNewBlogPostImageResponse.isLoading
                }
              >
                <style.NewBlogPostAddImageFormContainer>
                  <FormProvider {...imageFormMethods}>
                    {newBlogPostData && (
                      <FormSelect
                        fieldName="paragraphId"
                        labelName="paragraph"
                        options={newBlogPostData.paragraphs
                          .filter(
                            (paragraph) => paragraph._id && paragraph.header
                          )
                          .map((paragraph) => {
                            return {
                              value: paragraph._id,
                              optionName: paragraph.header,
                              key: paragraph._id,
                            };
                          })}
                      />
                    )}

                    <ImageForm />
                  </FormProvider>
                </style.NewBlogPostAddImageFormContainer>
              </DisableForm>
              <style.NewBlogPostAddImageButton
                type="button"
                onClick={imageHandleSubmit<BlogPostImage>((data) =>
                  addNewBlogPostImage({
                    image: data,
                    paragraphId: data.paragraphId,
                  })
                )}
              >
                add image
              </style.NewBlogPostAddImageButton>
            </style.NewBlogPostAddImageContainer>

            <FormItemButtons
              deleteFunction={deleteNewBlogPost}
              deleteItem={undefined}
              successErrorObject={{
                success: deleteNewBlogPostResponse.isSuccess,
                error: deleteNewBlogPostResponse.isError,
              }}
              resetFunction={reset}
              updateFunction={updateNewBlogPost}
              updateItem={watch()}
              itemName="blog post"
            >
              <style.NewBlogPostButton
                type="button"
                onClick={() => {
                  appendParagraph({ header: '', body: '' });
                  // @ts-expect-error
                  if (errors.paragraphs?.type === 'min') {
                    clearErrors('paragraphs');
                  }
                }}
              >
                add paragraph
              </style.NewBlogPostButton>
            </FormItemButtons>
          </DisableForm>
        </style.NewBlogPostContainer>
      </style.NewBlogPost>
    </LoadingErrorContainer>
  );
};

export default NewBlogPost;
