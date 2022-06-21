import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import * as rax from 'retry-axios';

rax.attach();

axios.defaults.timeout = 4000;
axios.defaults.withCredentials = true;
axios.defaults.raxConfig = {
  noResponseRetries: 3,
  retryDelay: 500,
  httpMethodsToRetry: ['GET'],
};

export const axiosBaseQuery =
  (
    {
      baseUrl,
      timeOut,
      raxConfig,
    }: { baseUrl: string; timeOut?: number; raxConfig?: rax.RetryConfig } = {
      baseUrl: '',
    }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    if (timeOut) {
      axios.defaults.timeout = timeOut;
    }

    if (raxConfig) {
      axios.defaults.raxConfig = {
        ...axios.defaults.raxConfig,
        ...raxConfig,
      };
    }

    try {
      const result = await axios({ url: `${baseUrl}${url}`, method, data });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
