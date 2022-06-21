import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useIsLoggedInQuery } from '../../services/auth/auth.service';
import {
  useDeleteBlogPostMutation,
  useGetActiveBlogPostsQuery,
  useGetBlogPostsQuery,
  useToggleBlogPostMutation,
} from '../../services/blog/blog.service';
import ItemButtons from '../item-buttons/ItemButtons.component';
import NotFoundRoute from '../not-found-route/NotFoundRoute.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import Loading from '../loading/Loading.component';
import CloseButton from '../close-button/ClosButton.component';
import LoadingError from '../loading-error/LoadingError.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import { formatDate } from '../../common/functions/helpers.function';
import ImageGallery from '../image-gallery/ImageGallery.component';
import { ColorContext } from '../../common/contexts/app-color.context';

import * as style from './style/blog-post.style';

const BlogPost = (): JSX.Element => {
  const { data: loggedInData, isFetching: loggedInIsFetching } =
    useIsLoggedInQuery();
  const { id } = useParams();
  const navigate = useNavigate();

  const [deleteBlogPost, deleteBlogPostResponse] = useDeleteBlogPostMutation();
  const [toggleBlogPost, toggleBlogPostResponse] = useToggleBlogPostMutation();

  const {
    data: blogPostsData,
    isSuccess: blogPostsIsSuccess,
    isLoading: blogPostsIsLoading,
    isError: blogPostsIsError,
    refetch: blogPostsRefetch,
  } = useGetBlogPostsQuery(undefined, {
    skip: !!!loggedInData,
  });

  const {
    data: activeBlogPostsData,
    isSuccess: activeBlogPostsIsSuccess,
    isLoading: activeBlogPostsIsLoading,
    isError: activeBlogPostsIsError,
    refetch: activeBlogPostsRefetch,
  } = useGetActiveBlogPostsQuery(undefined, {
    skip: !!loggedInData,
  });

  const controls = React.useContext(ColorContext);

  React.useEffect(() => {
    if (controls) {
      controls.start('color2');
    }
    return () => {
      if (controls) {
        controls.start('color1');
      }
    };
  }, [controls]);

  const blogPosts = React.useMemo(
    () => blogPostsData || activeBlogPostsData,
    [blogPostsData, activeBlogPostsData]
  );

  const blogPost = React.useMemo(() => {
    if (blogPosts && id) {
      return blogPosts[id];
    }
  }, [blogPosts, id]);

  const notFoundError = React.useMemo(() => {
    if (
      (blogPostsIsSuccess || activeBlogPostsIsSuccess) &&
      blogPosts &&
      id &&
      !blogPosts[id]
    ) {
      return true;
    }
  }, [blogPosts, id, blogPostsIsSuccess, activeBlogPostsIsSuccess]);

  const refetchFunction = React.useMemo(
    () => (!!loggedInData ? blogPostsRefetch : activeBlogPostsRefetch),
    [loggedInData, blogPostsRefetch, activeBlogPostsRefetch]
  );

  React.useEffect(() => {
    if (deleteBlogPostResponse.isSuccess) {
      navigate('/blog', { replace: true });
    }
  }, [navigate, deleteBlogPostResponse]);

  return notFoundError ? (
    <NotFoundRoute />
  ) : (
    <LoadingErrorContainer
      loadingObject={{
        isTrue:
          blogPostsIsLoading || activeBlogPostsIsLoading || loggedInIsFetching,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: blogPostsIsError || activeBlogPostsIsError,
        component: <LoadingError fixButton={{ onClick: refetchFunction }} />,
      }}
    >
      <style.BlogPost>
        <OnScreenNotification
          messages={[
            {
              isShow: toggleBlogPostResponse.isLoading,
              messageText: `toggle blog post ${
                blogPost?.isActive ? 'off' : 'on'
              }`,
            },
            {
              isShow: toggleBlogPostResponse.isError,
              messageText: 'toggle blog post error',
              closeAfter: 5,
            },
            {
              isShow: deleteBlogPostResponse.isLoading,
              messageText: 'delete blog post',
            },
            {
              isShow: deleteBlogPostResponse.isError,
              messageText: 'delete blog post error',
              closeAfter: 5,
            },
          ]}
        />
        <style.BlogPostHeader>
          {blogPost?.header}
          <CloseButton defaultRoute="/blog" />
        </style.BlogPostHeader>
        {blogPost && (
          <style.BlogPostDateContainer>
            <style.BlogPostDate>
              {`posted - ${formatDate(blogPost.createdAt)}`}
            </style.BlogPostDate>
            <style.BlogPostDate>
              {Date.parse(blogPost.createdAt) !==
                Date.parse(blogPost.updatedAt) &&
                `updated - ${formatDate(blogPost.updatedAt)}`}
            </style.BlogPostDate>
          </style.BlogPostDateContainer>
        )}
        <style.BlogPostContainer>
          <style.BlogPostParagraphsList>
            {blogPost?.paragraphs.map((paragraph) => {
              return (
                <style.BlogPostParagraph key={paragraph._id}>
                  <style.BlogPostParagraphHeader>
                    {paragraph.header}
                  </style.BlogPostParagraphHeader>
                  <style.BlogPostParagraphBody>
                    {paragraph.body}
                  </style.BlogPostParagraphBody>
                  {parseInt(`${paragraph?.gallery?.length}`) > 0 &&
                    paragraph?.gallery && (
                      <ImageGallery
                        images={paragraph.gallery}
                        imageGallerySizing={{ imageSize: 200, gapSize: 15 }}
                        largeView={true}
                      />
                    )}
                </style.BlogPostParagraph>
              );
            })}

            {blogPost?.conclusion && (
              <style.BlogPostParagraph>
                <style.BlogPostParagraphHeader>
                  {blogPost?.conclusion.header}
                </style.BlogPostParagraphHeader>
                <style.BlogPostParagraphBody>
                  {blogPost?.conclusion.body}
                </style.BlogPostParagraphBody>
              </style.BlogPostParagraph>
            )}
          </style.BlogPostParagraphsList>

          <style.ButtonsContainer>
            {loggedInData && (
              <ItemButtons
                deleteFunction={deleteBlogPost}
                toggleFunction={toggleBlogPost}
                item={blogPost}
                updateRoute={`/blog/update/${blogPost?._id}`}
                name="blog post"
              />
            )}
          </style.ButtonsContainer>
        </style.BlogPostContainer>
      </style.BlogPost>
    </LoadingErrorContainer>
  );
};

export default BlogPost;
