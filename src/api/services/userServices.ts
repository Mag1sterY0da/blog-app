import { Comment } from '@/types/Comment';
import { Post } from '@/types/Post';
import { Reply } from '@/types/Reply';
import { User } from '@/types/User';
import { api } from '../api';

export const userServices = api.injectEndpoints({
  endpoints: builder => ({
    loginUser: builder.mutation<User, { name: string; password: string }>({
      query: ({ name, password }) => ({
        url: 'login',
        method: 'POST',
        body: { name, password }
      })
    }),
    registerUser: builder.mutation<User, { name: string; password: string }>({
      query: ({ name, password }) => ({
        url: 'register',
        method: 'POST',
        body: { name, password }
      })
    }),
    getUserById: builder.query<User, string>({
      query: id => `user/${id}`
    }),
    updateUserById: builder.mutation<
      User,
      { id: string; name: string; password: string }
    >({
      query: ({ id, name, password }) => ({
        url: `user/${id}/update`,
        method: 'POST',
        body: { name, password }
      })
    }),
    getUserPostsById: builder.query<Post[], string>({
      query: id => `user/${id}/posts`
    }),
    getUserCommentsById: builder.query<Comment[], string>({
      query: id => `user/${id}/comments`
    }),
    getUserRepliesById: builder.query<Reply[], string>({
      query: id => `user/${id}/replies`
    })
  })
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useGetUserPostsByIdQuery,
  useGetUserCommentsByIdQuery,
  useGetUserRepliesByIdQuery
} = userServices;
