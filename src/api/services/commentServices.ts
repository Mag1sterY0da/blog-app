import { api } from '../api';

export const commentServices = api.injectEndpoints({
  endpoints: builder => ({
    addComment: builder.mutation<
      void,
      { id: string; content: string; author: string }
    >({
      query: ({ id, content, author }) => ({
        url: `post/${id}/comment`,
        method: 'POST',
        body: { content, author }
      })
    })
  })
});

export const { useAddCommentMutation } = commentServices;
