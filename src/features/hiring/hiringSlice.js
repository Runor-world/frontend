import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const hiringSlice = createSlice({
  name: "hiring",
  initialState: {
    hiring: {},
    message: { text: "", error: true },
    success: false,
    hirings: [],
    service: {},
    isLoading: true,
  },
  reducers: {
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    clearMessage: (state) => {
      state.message = { text: "", error: true };
    },
    setService: (state, { payload }) => {
      state.service = payload;
      state.isLoading = false;
    },
  },
});

export const { setServiceProvider, setMessage, clearMessage, setService } =
  hiringSlice.actions;
export default hiringSlice.reducer;
