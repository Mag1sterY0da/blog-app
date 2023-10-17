import { api } from '../api';

export const replyServices = api.injectEndpoints({
  endpoints: builder => ({
    addReply: builder.mutation<
      void,
      { postId: string; commentId: string; content: string; author: string }
    >({
      query: ({ postId, commentId, content, author }) => ({
        url: `post/${postId}/comment/${commentId}/reply`,
        method: 'POST',
        body: { content, author }
      })
    })
  })
});

export const { useAddReplyMutation } = replyServices;
