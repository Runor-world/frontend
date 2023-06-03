import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import profileSlice from "./features/profile/profileSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import serviceSlice from "./features/service/serviceSlice";
import userSlice from "./features/user/userSlice";
import searchSlice from "./features/search/searchSlice";
import serviceManSlice from "./features/serviceMan/serviceManSlice";
import hiringSlice from "./features/hiring/hiringSlice";
import modalSlice from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    profile: profileSlice,
    service: serviceSlice,
    users: userSlice,
    search: searchSlice,
    serviceman: serviceManSlice,
    hiring: hiringSlice,
    modal: modalSlice,
  },
});
