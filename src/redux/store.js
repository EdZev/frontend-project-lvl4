import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './index.js';

export default configureStore({
  reducer: {
    chat: chatReducer,
  },
});
