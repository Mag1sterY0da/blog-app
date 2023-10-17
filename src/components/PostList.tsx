import { Post as PostType } from '@/types/Post';
import { Stack } from '@mui/material';
import React from 'react';
import Post from './Post';

type PostListProps = {
  posts: PostType[];
  onCommentAdd: () => void;
  onReplyAdd: () => void;
};

const PostList: React.FC<PostListProps> = ({
  posts,
  onCommentAdd,
  onReplyAdd
}) => {
  return (
    <Stack gap={2} direction='column-reverse'>
      {posts.map(post => (
        <Post
          key={post._id}
          post={post}
          onCommentAdd={onCommentAdd}
          onReplyAdd={onReplyAdd}
        />
      ))}
    </Stack>
  );
};

export default PostList;
