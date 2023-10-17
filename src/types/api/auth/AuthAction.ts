import { User } from '@/types/User';

export type AuthAction = {
  type: 'LOGIN' | 'LOGOUT' | 'UPDATE';
  payload?: User;
};
