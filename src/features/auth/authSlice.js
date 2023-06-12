import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    userLoading: true,
    message: { text: "", type: true },
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    clearMessage: (state) => {
      state.message = { text: "", type: true };
    },
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
  },
});

export const { setUser, clearUser, clearMessage, setMessage } =
  authSlice.actions;
export default authSlice.reducer;
