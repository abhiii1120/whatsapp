import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth.slice";
import chatReducer from "../features/chats/state/chat.slice";
export let store = configureStore({
  reducer: {
    auth: authReducer,
    chat:chatReducer,
  },
});
