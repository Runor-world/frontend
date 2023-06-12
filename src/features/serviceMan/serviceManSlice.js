import { createSlice } from "@reduxjs/toolkit";

const serviceManSlice = createSlice({
  name: "serviceman",
  initialState: {
    serviceMen: [],
    serviceMan: {},
    isLoading: true,
    message: "",
  },
  reducers: {
    setServiceMan: (state, { payload }) => {
      state.serviceMan = payload;
    },
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    clearMessage: (state, { payload }) => {
      state.message = "";
    },
  },
});

export const { setMessage, clearMessage, setServiceMan } =
  serviceManSlice.actions;
export default serviceManSlice.reducer;
