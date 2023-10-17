import { User } from '@/types/User';

export const login = (user: User) => {
  return {
    type: 'LOGIN',
    payload: user
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const update = (user: User) => {
  return {
    type: 'UPDATE',
    payload: user
  };
};
