import { selectUser } from '@/api/selectors/authSelectors';
import { useAddCommentMutation } from '@/api/services/commentServices';
import { Send } from '@mui/icons-material';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

type AddCommentProps = {
  postId: string;
  hideAddComment: () => void;
  onCommentAdd: () => void;
};

const AddComment: React.FC<AddCommentProps> = ({
  postId,
  hideAddComment,
  onCommentAdd
}) => {
  const user = useSelector(selectUser);
  const contentRef = useRef<HTMLInputElement | null>(null);

  const [doAddComment] = useAddCommentMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const content: string = contentRef.current?.value || '';

    if (!user) return;

    doAddComment({
      id: postId,
      content,
      author: user._id
    });

    hideAddComment();
    onCommentAdd();
  };

  return (
    <Box component='form' noValidate>
      <Stack direction='row' gap={1} alignItems='end'>
        <TextField
          placeholder='Add a comment'
          variant='standard'
          inputRef={contentRef}
          sx={{ flex: 1 }}
          size='small'
          InputLabelProps={{ shrink: false }}
        />
        <IconButton
          type='submit'
          color='inherit'
          onClick={handleSubmit}
          size='small'
        >
          <Send />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default AddComment;
