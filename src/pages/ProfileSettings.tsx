import { update } from '@/api/actions/authActions';
import {
  selectIsAuthenticated,
  selectUser
} from '@/api/selectors/authSelectors';
import { useUpdateUserByIdMutation } from '@/api/services/userServices';
import { User } from '@/types/User';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileSettings: React.FC = () => {
  const user: User | null = useSelector(selectUser);
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [doUpdateUser] = useUpdateUserByIdMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const name: string = nameRef.current?.value || '';
    const password: string = passwordRef.current?.value || '';

    try {
      const updatedUser = await doUpdateUser({
        id: user._id,
        name,
        password
      }).unwrap();
      dispatch(update(updatedUser));
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component='h1' variant='h5'>
          Profile Info
        </Typography>
        <Box component='form' sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            name='name'
            label='Name'
            type='text'
            inputRef={nameRef}
            defaultValue={user?.name}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='text'
            inputRef={passwordRef}
            defaultValue={user?.password}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={e => handleSubmit(e)}
          >
            Change Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileSettings;
