import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    services: [],
    isLoading: false,
    message: { text: "", type: true },
    formIsOpened: false,
    selectedService: null,
  },
  reducers: {
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    openForm: (state, action) => {
      state.selectedService = action.payload;
      state.formIsOpened = true;
      state.message = { text: "", type: true };
    },
    closeForm: (state) => {
      state.formIsOpened = false;
    },
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
  },
});

export const { openForm, closeForm, setSelectedService, setMessage } =
  serviceSlice.actions;
export default serviceSlice.reducer;
