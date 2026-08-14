import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/aiChatSlice';
import subscriptionReducer from './subscrip/subscriptionSlice';
import commonReducer from '../features/common/commonSlice';

const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    chat: chatReducer,
    subscription: subscriptionReducer,
  },
});

export default store;
