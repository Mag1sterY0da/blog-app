import { login } from '@/api/actions/authActions';
import {
  useLoginUserMutation,
  useRegisterUserMutation
} from '@/api/services/userServices';
import {
  Box,
  Button,
  Container,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography
} from '@mui/material';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name: string = nameRef.current?.value || '';
    const password: string = passwordRef.current?.value || '';

    try {
      const user = await loginUser({ name, password }).unwrap();
      dispatch(login(user));
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setSnackbarOpen(true);
      setSnackbarMessage(error.data.message);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name: string = nameRef.current?.value || '';
    const password: string = passwordRef.current?.value || '';

    try {
      const user = await registerUser({ name, password }).unwrap();
      dispatch(login(user));
      navigate('/');
    } catch (error) {
      console.error('Register error:', error);
      setSnackbarOpen(true);
      setSnackbarMessage(error.data.message);
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
          Login / Register
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
            defaultValue='Sander'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            inputRef={passwordRef}
            defaultValue='test'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 1, mb: 1 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            type='submit'
            fullWidth
            variant='outlined'
            sx={{ mt: 1, mb: 1 }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </Box>
      <Snackbar
        sx={{
          position: 'fixed',
          top: 0
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <SnackbarContent message={snackbarMessage} />
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
