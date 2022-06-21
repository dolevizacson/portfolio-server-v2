import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../common/api/axios.config';
import { endPoints } from '../../common/constants/end-points.constants';
import { BlogPost } from '../../common/interfaces/blog-post.interface';
import { CreateBlogPost } from '../../common/interfaces/create-blog-post.interface';
import { Image } from '../../common/interfaces/image.interface';

enum BlogTags {
  Blog = 'BLOG',
  NewBlogPost = 'NEW_BLOG_POST',
}

type UpdateBlogPostData = {
  postId: string;
  post: CreateBlogPost;
};

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${endPoints.baseUrl}`,
    timeOut: 25000,
  }),
  tagTypes: [BlogTags.Blog, BlogTags.NewBlogPost],
  endpoints: (builder) => ({
    getBlogPosts: builder.query<Record<string, BlogPost>, void>({
      query: () => ({ url: `/${endPoints.blog}`, method: 'get' }),
      transformResponse: (response: BlogPost[]) => {
        return response.reduce<Record<string, BlogPost>>((acc, curr) => {
          acc[curr._id] = curr;
          return acc;
        }, {});
      },
      providesTags: [BlogTags.Blog],
    }),
    getActiveBlogPosts: builder.query<Record<string, BlogPost>, void>({
      query: () => ({
        url: `/${endPoints.blog}/${endPoints.active}`,
        method: 'get',
      }),
      transformResponse: (response: BlogPost[]) => {
        return response.reduce<Record<string, BlogPost>>((acc, curr) => {
          acc[curr._id] = curr;
          return acc;
        }, {});
      },
      providesTags: [BlogTags.Blog],
    }),
    getBlogPost: builder.query<BlogPost, string>({
      query: (postId) => ({
        url: `/${endPoints.blog}/${postId}`,
        method: 'get',
      }),
      providesTags: [BlogTags.Blog],
    }),
    getActiveBlogPost: builder.query<BlogPost, string>({
      query: (postId) => ({
        url: `/${endPoints.blog}/${endPoints.active}/${postId}`,
        method: 'get',
      }),
      providesTags: [BlogTags.Blog],
    }),
    createBlogPost: builder.mutation<BlogPost, CreateBlogPost>({
      query: (post) => ({
        url: `/${endPoints.blog}`,
        method: 'post',
        data: post,
      }),
      invalidatesTags: [BlogTags.Blog, BlogTags.NewBlogPost],
    }),
    updateBlogPost: builder.mutation<BlogPost, UpdateBlogPostData>({
      query: ({ postId, post }) => ({
        url: `/${endPoints.blog}/${postId}`,
        method: 'put',
        data: post,
      }),
      invalidatesTags: [BlogTags.Blog],
    }),
    toggleBlogPost: builder.mutation<BlogPost, string>({
      query: (postId) => ({
        url: `/${endPoints.blog}/${postId}`,
        method: 'patch',
      }),
      invalidatesTags: [BlogTags.Blog],
    }),
    deleteBlogPost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/${endPoints.blog}/${postId}`,
        method: 'delete',
      }),
      invalidatesTags: [BlogTags.Blog],
    }),

    addBlogPostImage: builder.mutation<
      void,
      {
        blogPostId: string | undefined;
        paragraphId: string | undefined;
        image: Image;
      }
    >({
      query: ({ blogPostId, paragraphId, image }) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(image)) {
          formData.append(key, value);
        }

        if (image.file) {
          formData.set('file', image.file[0]);
        }

        return {
          url: `/${endPoints.blog}/${blogPostId}/${endPoints.image}/${paragraphId}`,
          method: 'post',
          data: formData,
        };
      },
      invalidatesTags: [BlogTags.Blog],
    }),
    deleteBlogPostImage: builder.mutation<
      void,
      {
        blogPostId: string | undefined;
        paragraphId: string | undefined;
        imageId: string | undefined;
      }
    >({
      query: ({ blogPostId, paragraphId, imageId }) => ({
        url: `/${endPoints.blog}/${blogPostId}/${endPoints.image}/${paragraphId}/${imageId}`,
        method: 'delete',
      }),
      invalidatesTags: [BlogTags.Blog],
    }),

    getNewBlogPost: builder.query<CreateBlogPost, void>({
      query: () => ({
        url: `/${endPoints.new}/${endPoints.blogPost}`,
        method: 'get',
      }),
      providesTags: [BlogTags.NewBlogPost],
    }),
    updateNewBlogPost: builder.mutation<CreateBlogPost, CreateBlogPost>({
      query: (post) => ({
        url: `/${endPoints.new}/${endPoints.blogPost}`,
        method: 'put',
        data: post,
      }),
      invalidatesTags: [BlogTags.NewBlogPost],
    }),
    deleteNewBlogPost: builder.mutation<void, void>({
      query: () => ({
        url: `/${endPoints.new}/${endPoints.blogPost}`,
        method: 'delete',
      }),
      invalidatesTags: [BlogTags.NewBlogPost],
    }),

    addNewBlogPostImage: builder.mutation<
      void,
      { image: Image; paragraphId: string | undefined }
    >({
      query: ({ image, paragraphId }) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(image)) {
          formData.append(key, value);
        }

        if (image.file) {
          formData.set('file', image.file[0]);
        }

        return {
          url: `/${endPoints.new}/${endPoints.blogPost}/${paragraphId}/${endPoints.image}`,
          method: 'post',
          data: formData,
        };
      },
      invalidatesTags: [BlogTags.NewBlogPost],
    }),
    deleteNewBlogPostImage: builder.mutation<
      void,
      {
        paragraphId: string | undefined;
        imageId: string | undefined;
      }
    >({
      query: ({ paragraphId, imageId }) => ({
        url: `/${endPoints.new}/${endPoints.blogPost}/${paragraphId}/${endPoints.image}/${imageId}`,
        method: 'delete',
      }),
      invalidatesTags: [BlogTags.NewBlogPost],
    }),
  }),
});

export const {
  useGetBlogPostsQuery,
  useGetActiveBlogPostsQuery,
  useGetBlogPostQuery,
  useGetActiveBlogPostQuery,
  useUpdateBlogPostMutation,
  useToggleBlogPostMutation,
  useDeleteBlogPostMutation,

  useAddBlogPostImageMutation,
  useDeleteBlogPostImageMutation,

  useGetNewBlogPostQuery,
  useUpdateNewBlogPostMutation,
  useDeleteNewBlogPostMutation,
  useCreateBlogPostMutation,

  useAddNewBlogPostImageMutation,
  useDeleteNewBlogPostImageMutation,
} = blogApi;
