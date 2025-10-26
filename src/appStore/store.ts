import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authUserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
