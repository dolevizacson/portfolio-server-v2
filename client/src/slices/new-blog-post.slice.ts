import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { blogPostFormDefaultValue } from '../common/constants/forms-default-values';
import { CreateBlogPost } from '../common/interfaces/create-blog-post.interface';

export const newBlogPostSlice = createSlice({
  name: 'newBlogPost',
  initialState: blogPostFormDefaultValue,
  reducers: {
    persistNewBlogPost(state, action: PayloadAction<CreateBlogPost>) {
      return action.payload;
    },
  },
});

export const { persistNewBlogPost } = newBlogPostSlice.actions;
