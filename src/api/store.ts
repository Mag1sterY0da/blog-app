import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import authReducer from './reducers/authReducer';
import { commentServices } from './services/commentServices';
import { postServices } from './services/postServices';
import { userServices } from './services/userServices';

const rootReducer = combineReducers({
  auth: authReducer,
  [userServices.reducerPath]: userServices.reducer,
  [postServices.reducerPath]: postServices.reducer,
  [commentServices.reducerPath]: commentServices.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
});

export default store;
