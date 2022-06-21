import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../common/api/axios.config';
import { endPoints } from '../../common/constants/end-points.constants';
import { AuthCredentials } from '../../common/interfaces/auth-credentials.interface';

enum AuthTags {
  LogIn = 'LOGIN',
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${endPoints.baseUrl}/${endPoints.auth}`,
  }),
  tagTypes: [AuthTags.LogIn],
  endpoints: (builder) => ({
    logIn: builder.mutation<void, AuthCredentials>({
      query: (authCredentials) => ({
        url: `/${endPoints.signIn}`,
        method: 'post',
        data: authCredentials,
      }),
      invalidatesTags: [AuthTags.LogIn],
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({ url: `/${endPoints.signOut}`, method: 'get' }),
      invalidatesTags: [AuthTags.LogIn],
    }),
    isLoggedIn: builder.query<boolean, void>({
      query: () => ({ url: `/${endPoints.isLoggedIn}`, method: 'get' }),
      providesTags: [AuthTags.LogIn],
    }),
  }),
});

export const { useLogInMutation, useLogOutMutation, useIsLoggedInQuery } =
  authApi;
