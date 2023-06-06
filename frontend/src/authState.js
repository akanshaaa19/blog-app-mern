import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, isAuthenticated: false, user: null },
  reducers: {
    auth(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      if (state.token) {
        state.isAuthenticated = true;
      }
    },
    logout(state, action) {
      localStorage.clear();
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: { auth: authSlice.reducer },
});
