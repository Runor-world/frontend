import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import profileSlice from './features/profile/profileSlice'
import sidebarReducer from './features/sidebar/sidebarSlice'
import serviceSlice from './features/service/serviceSlice'
import userSlice from './features/user/userSlice'
import searchSlice from './features/search/searchSlice'
import serviceManSlice from './features/serviceMan/serviceManSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        profile: profileSlice,
        service: serviceSlice,
        users: userSlice,
        search: searchSlice,
        serviceman: serviceManSlice
    }
})