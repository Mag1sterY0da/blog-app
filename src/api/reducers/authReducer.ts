import { AuthAction } from '@/types/api/auth/AuthAction';
import { AuthState } from '@/types/api/auth/AuthState';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload || null,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    case 'UPDATE': {
      return {
        ...state,
        user: action.payload || null,
        isAuthenticated: true
      };
    }
    default:
      return state;
  }
};

export default authReducer;
