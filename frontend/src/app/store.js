import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import friendReducer from '../features/friend/friendSlice';
import chatReducer from '../features/chat/chatSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    friend: friendReducer,
    chat: chatReducer,
    theme: themeReducer,
  },
});
