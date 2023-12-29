import { createSlice } from "@reduxjs/toolkit";

const serviceManSlice = createSlice({
  name: "serviceman",
  initialState: {
    serviceMen: [],
    serviceMan: {},
    isLoading: true,
    message: "",
    searchey: "",
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
    setSearchkey: (state, { payload }) => {
      state.searchey = payload;
    },
  },
});

export const { setMessage, clearMessage, setServiceMan, setSearchkey } =
  serviceManSlice.actions;
export default serviceManSlice.reducer;
