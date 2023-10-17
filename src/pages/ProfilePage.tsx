import {
  useGetUserByIdQuery,
  useGetUserCommentsByIdQuery,
  useGetUserPostsByIdQuery,
  useGetUserRepliesByIdQuery
} from '@/api/services/userServices';
import CommentList from '@/components/CommentList';
import Loading from '@/components/Loading';
import PostList from '@/components/PostList';
import RepliesList from '@/components/RepliesList';
import { Container, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const { data: userInfo } = useGetUserByIdQuery(id as string, { skip: !id });
  const {
    data: posts,
    refetch: refetchPosts,
    isLoading: isLoadingPosts
  } = useGetUserPostsByIdQuery(id as string, {
    skip: !id
  });
  const {
    data: comments,
    refetch: refetchComments,
    isLoading: isLoadingComments
  } = useGetUserCommentsByIdQuery(id as string, {
    skip: !id
  });

  const { data: replies, isLoading: isLoadingReplies } =
    useGetUserRepliesByIdQuery(id as string, {
      skip: !id
    });

  const onCommentAdd = () => refetchPosts();
  const onReplyAdd = () => refetchComments();

  if (
    !posts ||
    !comments ||
    !replies ||
    isLoadingPosts ||
    isLoadingComments ||
    isLoadingReplies
  )
    return <Loading />;

  return (
    <Container component='main' maxWidth='md'>
      <Stack gap={2} direction='column'>
        <Typography component='h1' variant='h5' align='center' sx={{ mt: 2 }}>
          Profile Page
        </Typography>
        <Paper
          sx={{
            p: 2
          }}
        >
          <Typography component='h2' variant='h6'>
            Name: {userInfo?.name}
          </Typography>
          <Typography component='h2' variant='h6'>
            Password: {userInfo?.password}
          </Typography>
        </Paper>
        <Typography component='h3' variant='h5' align='center'>
          User's Posts
        </Typography>
        <PostList
          posts={posts}
          onCommentAdd={onCommentAdd}
          onReplyAdd={onReplyAdd}
        />
        <Typography component='h3' variant='h5' align='center'>
          User's Comments
        </Typography>
        <Paper sx={{ p: 2 }}>
          <CommentList comments={comments} onReplyAdd={onReplyAdd} />
        </Paper>
        <Typography component='h3' variant='h5' align='center'>
          User's Replies
        </Typography>
        <Paper sx={{ p: 2 }}>
          <RepliesList
            replies={replies}
            onReplyAdd={onReplyAdd}
            disableAddReply
          />
        </Paper>
      </Stack>
    </Container>
  );
};

export default ProfilePage;
