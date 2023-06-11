import { createSlice } from "@reduxjs/toolkit";
import { getTodayFormatedDate } from "../../utils/date";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    personalProfile: {
      bio: "my beatiful bio",
      birthday: getTodayFormatedDate(),
      city: "my city",
      country: "my country",
    },
    serviceProfile: null,
    isLoading: true,
    message: { text: "", type: true },
  },
  reducers: {
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    clearMessage: (state) => {
      state.message = { text: "", type: true };
    },
  },
});
export const { setErrorMessage, setMessage, clearMessage } =
  profileSlice.actions;
export default profileSlice.reducer;
