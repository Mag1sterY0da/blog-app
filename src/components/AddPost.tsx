import { selectUser } from '@/api/selectors/authSelectors';
import { useAddPostMutation } from '@/api/services/postServices';
import { Send } from '@mui/icons-material';
import { Box, IconButton, Paper, Stack, TextField } from '@mui/material';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

type AddPostProps = {
  onPostAdd: () => void;
};

const AddPost: React.FC<AddPostProps> = ({ onPostAdd }) => {
  const user = useSelector(selectUser);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLInputElement | null>(null);
  const [doAddPost] = useAddPostMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const title: string = titleRef.current?.value || '';
    const content: string = contentRef.current?.value || '';

    if (!user) return;

    doAddPost({
      title,
      content,
      author: user._id
    });

    onPostAdd();

    if (titleRef.current) {
      titleRef.current.value = '';
    }
    if (contentRef.current) {
      contentRef.current.value = '';
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box component='form' noValidate>
        <Stack direction='row' gap={1} alignItems='end'>
          <Stack direction='column' gap={1} sx={{ flex: 1 }}>
            <TextField label='Title' variant='standard' inputRef={titleRef} />
            <TextField
              label='Whats on your mind'
              variant='standard'
              inputRef={contentRef}
            />
          </Stack>
          <IconButton type='submit' color='inherit' onClick={handleSubmit}>
            <Send />
          </IconButton>
        </Stack>
      </Box>
    </Paper>
  );
};

export default AddPost;
