import { logout } from '@/api/actions/authActions';
import {
  selectIsAuthenticated,
  selectUser
} from '@/api/selectors/authSelectors';
import { User } from '@/types/User';
import { AccountCircle } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const user: User | null = useSelector(selectUser);
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/login');
  };

  return (
    <Box>
      <AppBar sx={{ position: 'sticky' }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link to='/'>Blog App</Link>
          </Typography>
          {!isAuthenticated && (
            <Link to='/login'>
              <Button color='inherit'>Login</Button>
            </Link>
          )}
          {isAuthenticated && (
            <>
              <IconButton
                color='inherit'
                onClick={handleMenuOpen}
                aria-controls='user-menu'
                aria-haspopup='true'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='user-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                disableScrollLock
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to={`/user/${user?._id}`}
                >
                  My Profile
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to='/settings'
                >
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
