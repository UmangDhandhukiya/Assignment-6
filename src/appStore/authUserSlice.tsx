import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("user"),
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      localStorage.setItem("registeredUser", JSON.stringify(action.payload));
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { register, login, logout } = authUserSlice.actions;
export default authUserSlice.reducer;
