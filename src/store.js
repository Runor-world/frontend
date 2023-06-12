import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "./features/auth/authSlice";
import profileSlice from "./features/profile/profileSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import serviceSlice from "./features/service/serviceSlice";
import userSlice from "./features/user/userSlice";
import searchSlice from "./features/search/searchSlice";
import hiringSlice from "./features/hiring/hiringSlice";
import modalSlice from "./features/modal/modalSlice";
import { emptyApi } from "./features/api/emptyApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    profile: profileSlice,
    service: serviceSlice,
    users: userSlice,
    search: searchSlice,
    hiring: hiringSlice,
    modal: modalSlice,
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptyApi.middleware),
});
setupListeners(store.dispatch);
