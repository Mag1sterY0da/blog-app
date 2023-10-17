import { Comment as CommentType } from '@/types/Comment';
import { Box } from '@mui/material';
import React from 'react';
import Comment from './Comment';

type CommentListProps = {
  comments: CommentType[];
  onReplyAdd: () => void;
};

const CommentList: React.FC<CommentListProps> = ({ comments, onReplyAdd }) => {
  return (
    <Box>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} onReplyAdd={onReplyAdd} />
      ))}
    </Box>
  );
};

export default CommentList;
