import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { setUser } from "../auth/authSlice";
import {getTodayFormatedDate, toISODate} from '../../utils/date'

export const updateProfileBackgroundPhoto = createAsyncThunk(
    'profile/updateBackgroundPhoto',
    async(image, thunkAPI) => {
        try {
            const formData = new FormData()
            formData.append('image', image.file)
            const res = await axios.patch(`${baseUrl}/api/profile/backgroundphoto`, 
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue(error.data)
        }
    }
)

export const updateProfilePhoto = createAsyncThunk(
    'profile/updatePhoto',
    async(image, thunkAPI) => {
        try {
            const formData = new FormData()
            formData.append('image', image.file)
            const res = await axios.patch(`${baseUrl}/api/profile/photo`, 
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue(error.data)
        }
    }
)


export const createUserServiceProfile = createAsyncThunk(
    'profile/service-create',
    async(values, thunkAPI) => {
        try {
            const res = await axios.post(`${baseUrl}/api/profile/service`, 
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue(error.data)
        }
    }
)

export const getAllProfiles = createAsyncThunk(
    'profile/getAllProfiles',
    async(arg, thunkAPI) =>{
        try {
            const res = await axios.get(`${baseUrl}/api/profile`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue(error.data)
        }
    }
)

export const updateProfile = createAsyncThunk(
    'profile/update',
    async(values, thunkAPI) =>{
        try {
            const res = await axios.patch(`${baseUrl}/api/profile/personal`, 
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if(res.data.user){
                thunkAPI.dispatch(setUser(res.data.user))
                localStorage.setItem('user', JSON.stringify(res.data.user))
            }
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue('something went wrong')
        }
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        personalProfile: {
            bio: 'my beatiful bio',
            birthday: getTodayFormatedDate(),
            city: 'my city',
            country: 'my country'
        },
        serviceProfile: null,
        isLoading: true,
        message: { text: '', type: true },
        errorMessage: ''
    },
    reducers: {
        setErrorMessage: (state, {payload}) => {
            state.errorMessage = payload
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(getAllProfiles.fulfilled, (state, {payload}) =>{
                state.isLoading = false
                if(payload){
                    state.personalProfile = {
                        ...payload.personalProfile,
                        birthday: toISODate(payload.personalProfile.birthday)
                    }
                    state.serviceProfile = payload.serviceProfile
                }else{
                    state.errorMessage = 'Something went wrong'
                }
            })
            .addCase(getAllProfiles.rejected, (state, action)=>{
                state.errorMessage = action.payload
                state.isLoading = false
            })
            .addCase(getAllProfiles.pending, (state, action)=>{
                state.isLoading = true
            })

            .addCase(updateProfile.fulfilled, (state, {payload}) =>{
                state.isLoading = false
                if(payload){
                    const {personalProfile} = payload
                    state.personalProfile = {
                        ...personalProfile, 
                        bio: personalProfile.bio ?? state.personalProfile.bio,
                        country: personalProfile.country ?? state.personalProfile.country,
                        city: personalProfile.city ?? state.personalProfile.city,
                        birthday: toISODate(personalProfile.birthday) ?? state.personalProfile.birthday
                    }
                }else{
                    state.errorMessage = 'Something went wrong'
                }
            })
            .addCase(updateProfile.rejected, (state, action)=>{
                state.errorMessage = action.payload
                state.isLoading = false
            })
            .addCase(updateProfile.pending, (state, action)=>{
                state.isLoading = false
            })

            // profile background image update/upload
            .addCase(updateProfileBackgroundPhoto.fulfilled, (state, {payload}) =>{
                state.isLoading = false
                if(payload){
                    state.personalProfile = payload.profile
                    state.errorMessage = ''
                }else{
                    state.errorMessage = 'Upload failed'
                }
            })
            .addCase(updateProfileBackgroundPhoto.rejected, (state, action)=>{
                state.errorMessage = action.payload
                state.isLoading = false
            })
            .addCase(updateProfileBackgroundPhoto.pending, (state, action)=>{
                state.isLoading = false
            })

            // profile image update/upload
            .addCase(updateProfilePhoto.fulfilled, (state, {payload}) =>{
                state.isLoading = false
                if(payload){
                    state.personalProfile = payload.profile
                    state.errorMessage = ''
                }else{
                    state.errorMessage = 'Upload failed'
                }
            })
            .addCase(updateProfilePhoto.rejected, (state, action)=>{
                state.errorMessage = action.payload
                state.isLoading = false
            })
            .addCase(updateProfilePhoto.pending, (state, action)=>{
                state.isLoading = false
            })

            // profile service create
            .addCase(createUserServiceProfile.fulfilled, (state, {payload}) =>{
                state.isLoading = false
                if(payload){
                    state.serviceProfile = payload.userServiceProfile
                    state.message = { text: payload.msg, type: true }
                }else{
                    state.message = { text: 'Creating service failed', type: false }
                }
            })
            .addCase(createUserServiceProfile.rejected, (state, action)=>{
                state.errorMessage = action.payload
                state.message = { text: action.payload, type: false }
                state.isLoading = false
            })
            .addCase(createUserServiceProfile.pending, (state, action)=>{
                state.isLoading = false
                state.message = { text: 'Creating service profile... ', type: true }
            })
    }
})
export const {setErrorMessage} = profileSlice.actions
export default profileSlice.reducer