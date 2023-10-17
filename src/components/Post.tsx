import { Post as PostType } from '@/types/Post';
import { formatDate } from '@/utils/formatDate';
import { Add, Remove } from '@mui/icons-material';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddComment from './AddComment';
import CommentList from './CommentList';

type PostProps = {
  post: PostType;
  onCommentAdd: () => void;
  onReplyAdd: () => void;
};

const Post: React.FC<PostProps> = ({ post, onCommentAdd, onReplyAdd }) => {
  const [isShowAddComment, setIsShowAddComment] = useState<boolean>(false);

  const toggleAddComment = () => setIsShowAddComment(prev => !prev);

  const hideAddComment = () => setIsShowAddComment(false);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction='column' gap={1}>
        <Stack direction='row' alignItems='center' gap={1}>
          <Typography variant='body1' component='div'>
            <Link to={`/user/${post.author._id}`}>{post.author.name}</Link>
          </Typography>
          <Typography color='textSecondary' variant='body2'>
            {formatDate(post.date)}
          </Typography>
        </Stack>
        <Typography variant='h5'>{post.title}</Typography>
        <Typography variant='body1'>{post.content}</Typography>
        <Stack direction='row' gap={1}>
          <Typography variant='h6'>Comments</Typography>
          <IconButton color='inherit' size='small' onClick={toggleAddComment}>
            {isShowAddComment ? <Remove /> : <Add />}
          </IconButton>
        </Stack>
        {isShowAddComment && (
          <AddComment
            postId={post._id}
            hideAddComment={hideAddComment}
            onCommentAdd={onCommentAdd}
          />
        )}
        {post.comments.length > 0 && (
          <Box>
            <CommentList comments={post.comments} onReplyAdd={onReplyAdd} />
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default Post;
