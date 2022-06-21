import * as React from 'react';

import { useIsLoggedInQuery } from '../../services/auth/auth.service';
import {
  useGetActiveBlogPostsQuery,
  useGetBlogPostsQuery,
} from '../../services/blog/blog.service';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import LoadingError from '../loading-error/LoadingError.component';
import Loading from '../loading/Loading.component';
import TextBlock from '../text-block/TextBlock.component';
import { formatDate } from '../../common/functions/helpers.function';

import * as style from './style/blog-post-list.style';

const BlogPostList = (): JSX.Element => {
  const { data: loggedInData, isFetching: loggedInIsFetching } =
    useIsLoggedInQuery();

  const {
    data: blogPostsData,
    isFetching: blogPostsIsFetching,
    isError: blogPostsIsError,
    refetch: blogPostsRefetch,
  } = useGetBlogPostsQuery(undefined, {
    skip: !!!loggedInData,
  });

  const {
    data: activeBlogPostsData,
    isFetching: activeBlogPostsIsFetching,
    isError: activeBlogPostsIsError,
    refetch: activeBlogPostsRefetch,
  } = useGetActiveBlogPostsQuery(undefined, {
    skip: !!loggedInData,
  });

  const blogPosts = React.useMemo(
    () => blogPostsData || activeBlogPostsData,
    [blogPostsData, activeBlogPostsData]
  );

  const refetchFunction = React.useMemo(
    () => (!!loggedInData ? blogPostsRefetch : activeBlogPostsRefetch),
    [loggedInData, blogPostsRefetch, activeBlogPostsRefetch]
  );

  return (
    <LoadingErrorContainer
      loadingObject={{
        isTrue:
          blogPostsIsFetching ||
          activeBlogPostsIsFetching ||
          loggedInIsFetching,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: blogPostsIsError || activeBlogPostsIsError,
        component: <LoadingError fixButton={{ onClick: refetchFunction }} />,
      }}
    >
      <style.BlogPostList>
        <style.BlogPostListHeader>blog</style.BlogPostListHeader>
        <style.BlogPostListContainer>
          {blogPosts && Object.values(blogPosts).length === 0 && (
            <TextBlock>no blog posts found</TextBlock>
          )}
          {blogPosts &&
            Object.values(blogPosts).map((blogPost) => {
              return (
                <style.BlogPost key={blogPost._id}>
                  <style.BlogPostHeader>{blogPost.header}</style.BlogPostHeader>
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
                  <style.BlogPostSummery>
                    {blogPost.summery}
                  </style.BlogPostSummery>
                  <style.BlogPostButton to={`${blogPost._id}`}>
                    show more
                  </style.BlogPostButton>
                </style.BlogPost>
              );
            })}
        </style.BlogPostListContainer>
      </style.BlogPostList>
    </LoadingErrorContainer>
  );
};

export default BlogPostList;
