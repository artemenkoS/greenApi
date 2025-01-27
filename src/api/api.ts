import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../constants';
import { ReceivedNotification, SendMessageResult } from '../features/Chats/types';
import { InstanceData } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<SendMessageResult, { chatId: string; instanceData: InstanceData; message: string }>({
      query: ({ instanceData, chatId, message }) => ({
        url: `/waInstance${instanceData.idInstance}/sendMessage/${instanceData.apiTokenInstance}`,
        method: 'POST',
        body: { chatId: `${chatId}@c.us`, message },
      }),
    }),
    receiveMessage: builder.query<ReceivedNotification, InstanceData>({
      query: ({ idInstance, apiTokenInstance }) => ({
        url: `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
      }),
    }),
    deleteMessage: builder.mutation<void, { instanceData: InstanceData; receiptId: number }>({
      query: ({ instanceData, receiptId }) => ({
        url: `/waInstance${instanceData.idInstance}/deleteNotification/${instanceData.apiTokenInstance}/${receiptId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useSendMessageMutation, useReceiveMessageQuery, useDeleteMessageMutation } = apiSlice;
