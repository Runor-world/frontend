import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/base_url";

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (arg, thunkAPI) => {
    let response = null;
    try {
      response = await axios.get(`${baseUrl}/api/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue("Something went wrong");
      return error.response.data.msg;
    }
  }
);

export const userSearchByName = createAsyncThunk(
  "user/searchUserByName",
  async (value, thunkAPI) => {
    let response = null;
    try {
      response = await axios.post(
        `${baseUrl}/api/users`,
        { key: value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue("Something went wrong");
      return error.response.data.msg;
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  "user/status",
  async (values, thunkAPI) => {
    console.log(values);
    let response = null;
    try {
      response = await axios.patch(`${baseUrl}/api/users/status`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data.msg;
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.users) {
          state.users = payload.users;
        } else {
          state.message = payload;
        }
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.message = {
          type: false,
          text: "Failed to fetched users",
        };
      })

      // updateUserStatus life cycle
      .addCase(updateUserStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.user) {
          state.users = state.users.map((user) => {
            if (user._id === state.selectedUser._id) {
              console.log(payload.user);
              state.selectedUser = payload.user;
              return payload.user;
            }
            return user;
          });
          //   state.users = payload.users;
          state.message = { text: payload.msg, type: true };
        } else {
          state.message = { text: payload, type: false };
        }
      })
      .addCase(updateUserStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.message = {
          type: false,
          text: "Failed to update user status",
        };
      })

      // userSearchByName life cycle
      .addCase(userSearchByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userSearchByName.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.users) {
          state.users = payload.users;
        } else {
          state.message = payload;
        }
      })
      .addCase(userSearchByName.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.message = {
          type: false,
          text: "Failed to fetched users",
        };
      });
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
