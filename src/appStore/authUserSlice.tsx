import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
  // confirmPass: string;
}

interface AuthState {
  users: User[];
  user: User | null;
  isAuthenticated: boolean;
}

const loadUsers = (): User[] => JSON.parse(localStorage.getItem("users") || "[]");
const loadCurrentUser = (): User | null => JSON.parse(localStorage.getItem("currentUser") || "null");

const initialState: AuthState = {
  users: loadUsers(),
  user: loadCurrentUser(),
  isAuthenticated: !!loadCurrentUser(),
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      const users = loadUsers();
      const exists = users.some((item) => item.email === action.payload.email);

      if (!exists) {
        users.push(action.payload);
        localStorage.setItem("users", JSON.stringify(users));
        state.users = users;
      }
    },  
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const users = loadUsers();
      // console.log(users)
      // console.log(action.payload)
      const found = users.find(
        (item) => item.email === action.payload.email && item.password === action.payload.password
      );
      // console.log(found)
      if (found) {
        state.user = found;
        state.isAuthenticated = true;
        localStorage.setItem("currentUser", JSON.stringify(found));
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
    },
    editProfile: (state, action: PayloadAction<{ name: string; email: string }>) => {
      if (state.user) {
        const users = loadUsers().map((item) =>
          item.email === state.user!.email ? { ...item, ...action.payload } : item
        );

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify({ ...state.user, ...action.payload }));

        state.users = users;
        state.user = { ...state.user, ...action.payload };
      }
    },
    changePassword: (state, action: PayloadAction<{ oldPassword: string; newPassword: string }>) => {
      if (state.user && state.user.password === action.payload.oldPassword) {
        const users = loadUsers().map((item) =>
          item.email === state.user!.email ? { ...item, password: action.payload.newPassword } : item
        );

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...state.user, password: action.payload.newPassword })
        );

        state.users = users;
        state.user = { ...state.user, password: action.payload.newPassword };
      }
    },
  },
});

export const { register, login, logout, editProfile, changePassword } = authUserSlice.actions;
export default authUserSlice.reducer;
