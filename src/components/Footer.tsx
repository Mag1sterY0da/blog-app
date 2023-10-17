import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      sx={{ m: 2 }}
    >
      Copyright© <Link to='/'>Blog App </Link>
      {new Date().getFullYear()}
    </Typography>
  );
};

export default Footer;
