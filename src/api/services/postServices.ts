import { Post } from '@/types/Post';
import { api } from '../api';

export const postServices = api.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts'
    }),
    addPost: builder.mutation<
      void,
      { title: string; content: string; author: string }
    >({
      query: ({ title, content, author }) => ({
        url: 'post',
        method: 'POST',
        body: { title, content, author }
      })
    })
  })
});

export const { useGetPostsQuery, useAddPostMutation } = postServices;
