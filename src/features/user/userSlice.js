import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isLoading: false,
    message: {
      type: true,
      text: "",
    },
    isOpened: false,
    selectedUser: null,
  },
  reducers: {
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    clearMessage: (state) => {
      state.message = {
        type: true,
        text: "",
      };
    },
    setSelectedUser: (state, { payload }) => {
      state.selectedUser = payload;
    },
    openUserModal: (state) => {
      state.isOpened = true;
      clearMessage();
    },
    closeUserModal: (state) => {
      state.isOpened = false;
      state.message = { text: "", type: true };
    },
  },
});

export const {
  setMessage,
  clearMessage,
  openUserModal,
  closeUserModal,
  setSelectedUser,
} = userSlice.actions;
export default userSlice.reducer;
