import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../common/api/axios.config';
import { endPoints } from '../../common/constants/end-points.constants';
import { CreateMail } from '../../common/interfaces/create-mail.interface';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${endPoints.baseUrl}`,
    timeOut: 10000,
  }),
  endpoints: (builder) => ({
    sendMail: builder.mutation<void, CreateMail>({
      query: (mail) => ({
        url: `/${endPoints.contact}`,
        method: 'post',
        data: mail,
      }),
    }),
  }),
});

export const { useSendMailMutation } = contactApi;
