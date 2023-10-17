import { User } from '../User';

export interface RootState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
  };
}
