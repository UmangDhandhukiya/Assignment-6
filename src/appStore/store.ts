import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authUserSlice";
import productReducer from "./productSlice";

/**
 * Creates and configures the main Redux store for the application.
 * Parameters: None.
 * The function uses Redux Toolkit's configureStore to set up the root reducer, combining multiple state slices (auth and product) into a single store.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
