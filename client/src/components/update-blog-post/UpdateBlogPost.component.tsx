import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import {
  blogPostFormDefaultValue,
  blogPostImageFormDefaultValue,
} from '../../common/constants/forms-default-values';
import { CreateBlogPost } from '../../common/interfaces/create-blog-post.interface';
import {
  useAddBlogPostImageMutation,
  useDeleteBlogPostImageMutation,
  useGetBlogPostsQuery,
  useUpdateBlogPostMutation,
} from '../../services/blog/blog.service';
import { imageFileType } from '../../common/constants/common.constants';
import ImageForm from '../image-form/ImageForm.component';
import FormSelect from '../form-select/FormSelect.component';
import { BlogPostImage } from '../../common/interfaces/blog-post-image.interface';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import Loading from '../loading/Loading.component';
import NotFoundRoute from '../not-found-route/NotFoundRoute.component';
import BlogPostForm from '../blog-post-form/BlogPostForm.component';
import DisableForm from '../disable-form/DisableForm.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import CloseButton from '../close-button/ClosButton.component';
import LoadingError from '../loading-error/LoadingError.component';

import * as style from './style/update-blog-post.style';

const UpdateBlogPost = (): JSX.Element => {
  const {
    data: blogPostsData,
    isSuccess: blogPostsIsSuccess,
    isLoading: blogPostsIsLoading,
    isError: blogPostsIsError,
    refetch: blogPostsRefetch,
  } = useGetBlogPostsQuery();
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateBlogPost, updateBlogPostResponse] = useUpdateBlogPostMutation();

  const [addBlogPostImage, addBlogPostImageResponse] =
    useAddBlogPostImageMutation();
  const [deleteBlogPostImage, deleteBlogPostImageResponse] =
    useDeleteBlogPostImageMutation();

  const blogPost = React.useMemo(() => {
    if (blogPostsData && id) {
      return blogPostsData[id];
    }
  }, [blogPostsData, id]);

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
        .min(1)
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

  const { handleSubmit, reset, control } = React.useMemo(
    () => formMethods,
    [formMethods]
  );

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

  const onSubmit: SubmitHandler<CreateBlogPost> = (post) => {
    if (id) {
      updateBlogPost({ postId: id, post });
    }
  };

  const notFoundError = React.useMemo(() => {
    if (blogPostsIsSuccess && blogPostsData && id && !blogPostsData[id]) {
      return true;
    }
  }, [id, blogPostsIsSuccess, blogPostsData]);

  React.useEffect(() => {
    reset(blogPost);
  }, [reset, blogPost]);

  React.useEffect(() => {
    if (updateBlogPostResponse.isSuccess && blogPost) {
      navigate(`/blog/${blogPost._id}`);
    }
  }, [navigate, updateBlogPostResponse, blogPost]);

  return notFoundError ? (
    <NotFoundRoute />
  ) : (
    <LoadingErrorContainer
      loadingObject={{ isTrue: blogPostsIsLoading, component: <Loading /> }}
      errorObject={{
        isTrue: blogPostsIsError,
        component: <LoadingError fixButton={{ onClick: blogPostsRefetch }} />,
      }}
    >
      <style.UpdateBlogPost>
        <OnScreenNotification
          messages={[
            {
              isShow: updateBlogPostResponse.isLoading,
              messageText: 'updating blog post',
            },
            {
              isShow: updateBlogPostResponse.isError,
              messageText: 'blog post update error',
              closeAfter: 5,
            },
            {
              isShow: addBlogPostImageResponse.isLoading,
              messageText: 'uploading image',
            },
            {
              isShow: addBlogPostImageResponse.isError,
              messageText: 'image upload error',
              closeAfter: 5,
            },
            {
              isShow: deleteBlogPostImageResponse.isLoading,
              messageText: 'deleting image',
            },
            {
              isShow: deleteBlogPostImageResponse.isError,
              messageText: 'image delete error',
              closeAfter: 5,
            },
          ]}
        />
        <style.UpdateBlogPostHeader>
          update blog post
          <CloseButton defaultRoute={`/blog/${id}`} />
        </style.UpdateBlogPostHeader>
        <style.UpdateBlogPostContainer>
          <DisableForm disabled={updateBlogPostResponse.isLoading}>
            <style.UpdateBlogPostFormContainer>
              <FormProvider {...formMethods}>
                {blogPost && (
                  <BlogPostForm
                    paragraphs={paragraphs}
                    removeParagraph={removeParagraph}
                    deleteButtonObject={paragraphs.map((paragraph) => {
                      return paragraph.gallery === undefined
                        ? undefined
                        : {
                            deleteFunction: deleteBlogPostImage,
                            deleteData: paragraph.gallery.map((image) => {
                              return {
                                blogPostId: blogPost._id,
                                paragraphId: paragraph._id,
                                imageId: image.id,
                              };
                            }),
                          };
                    })}
                  />
                )}
              </FormProvider>
            </style.UpdateBlogPostFormContainer>
            <style.UpdateBlogPostAddImageContainer>
              <style.UpdateBlogPostAddImageHeader>
                images
              </style.UpdateBlogPostAddImageHeader>
              <DisableForm
                disabled={
                  addBlogPostImageResponse.isLoading ||
                  deleteBlogPostImageResponse.isLoading
                }
              >
                <style.UpdateBlogPostAddImageFormContainer>
                  <FormProvider {...imageFormMethods}>
                    {blogPost && (
                      <FormSelect
                        fieldName="paragraphId"
                        labelName="paragraph"
                        options={blogPost.paragraphs
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
                  <style.UpdateBlogPostAddImageButton
                    type="button"
                    onClick={imageHandleSubmit<BlogPostImage>(
                      (submittedImage) => {
                        addBlogPostImage({
                          blogPostId: blogPost?._id,
                          paragraphId: submittedImage.paragraphId,
                          image: submittedImage,
                        });
                      }
                    )}
                  >
                    add image
                  </style.UpdateBlogPostAddImageButton>
                </style.UpdateBlogPostAddImageFormContainer>
              </DisableForm>
            </style.UpdateBlogPostAddImageContainer>
          </DisableForm>
          <style.buttonsContainer>
            <style.UpdateBlogPostButton
              type="button"
              onClick={() => {
                appendParagraph({ header: '', body: '' });
              }}
            >
              add paragraph
            </style.UpdateBlogPostButton>
            <style.UpdateBlogPostButton
              type="button"
              onClick={() => {
                if (blogPost) {
                  reset(blogPost);
                }
              }}
            >
              undo changes
            </style.UpdateBlogPostButton>
            <style.UpdateBlogPostButton onClick={handleSubmit(onSubmit)}>
              update blog post
            </style.UpdateBlogPostButton>
          </style.buttonsContainer>
        </style.UpdateBlogPostContainer>
      </style.UpdateBlogPost>
    </LoadingErrorContainer>
  );
};

export default UpdateBlogPost;
