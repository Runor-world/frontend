import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/base_url";


export const localLogin = createAsyncThunk(
    'auth/localLogin',
    async(values, thunkAPI) =>{
        try {
            const res = await axios.post( `${baseUrl}/api/auth/login`, {
                email: values.email,
                password: values.password
            })
            return res.data
        } catch (error) {
            console.log(error)
            thunkAPI.rejectWithValue('Something went wrong')
            return error.response.data.msg
        }
    }
)

export const localSignup = createAsyncThunk(
    'auth/localSignup',
    async(values, thunkAPI) => {
        try {
            const res = await axios.post(`${baseUrl}/api/auth/signup`, {
                email: values.email,
                password: values.password,
                otherName: values.otherName,
                firstName: values.firstName
            })
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue('Something went wrong')
            return error.response.data.msg   
        }
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, 
        userLoading: true, 
        message: { text: '', type: true}
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.user = payload
        }, 
        clearUser: (state) => {
            state.user = null
        },
        clearMessage: (state)=>{
            state.message = {text: '', type: true}
        }
    }, 

    extraReducers: (builder) =>{
        builder
            .addCase(localLogin.pending,  (state) =>{
                state.userLoading = true
                state.message = {text: 'Please wait ...', type: true}
            })
            .addCase(localLogin.fulfilled, (state, action) => {
                if(action.payload.user){
                    state.userLoading = false
                    state.user = action.payload.user
                    state.message = {text: action.payload.message, type: true}
                    localStorage.setItem('user', JSON.stringify(action.payload.user))
                    localStorage.setItem('token', JSON.stringify(action.payload.token))
                }else{
                    state.message = { text: action.payload, type: false }
                }
            })
            .addCase(localLogin.rejected, (state) => {
                state.userLoading = false
                state.message = { text: 'Login failed', type: false }
                localStorage.removeItem('token')
            })

            .addCase(localSignup.pending, (state) =>{
                state.userLoading = true
                state.message = { text: 'Please wait ...', type: true }
            })
            .addCase(localSignup.fulfilled, (state, action) =>{
                state.userLoading = false
                if(action.payload.user){
                    state.userLoading = false
                    state.user = action.payload.user
                    state.message = { text: action.payload.message, type: true }
                }else{
                    state.message = { text: action.payload, type: false }
                }
            })
            .addCase(localSignup.rejected, (state) =>{
                state.userLoading = false
                state.message = { text: 'Signup failed', type: false }
            })
        }
    }
)

export const {setUser, clearUser, clearMessage} = authSlice.actions
export default authSlice.reducer