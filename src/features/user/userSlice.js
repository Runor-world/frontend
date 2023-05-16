import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/base_url";

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async(arg, thunkAPI) => {
        let response = null
        try {
            response = await axios.get(`${baseUrl}/api/users`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            return response.data
        } catch (error) {
            thunkAPI.rejectWithValue('Something went wrong')
            return error.response.data.msg
        }
    }
)

export const activateSuspendUser = createAsyncThunk(
    'user/activateSuspendUser',
    async(values, thunkAPI) => {
        let response = null
        try {
            response = await axios.update(`${baseUrl}/api/users`, 
            values,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            return response.data
        } catch (error) {
            thunkAPI.rejectWithValue('Something went wrong')
            return error.response.data.msg
        }
    }
)

const userSlice = createSlice({
    name: 'user', 
    initialState: {
        users: [],
        isLoading: false, 
        message: {
            type: true, 
            text: ''
        },
        isOpened: false,
        selectedUser: null
    },
    reducers: {
        setMessage: (state, {payload}) => {
            state.message = payload
        },
        clearMessage: ( state) => {
            state.message =  {
                type: true, 
                text: ''
            }
        },
        setSelectedUser: (state, {payload}) => {
            state.selectedUser = payload
        },
        openUserModal: ( state) => {
            state.isOpened = true
        },
        closeUserModal: ( state) => {
            state.isOpened = false
        }
    }
    ,
    extraReducers: (builder) =>{
        builder
            .addCase(getAllUsers.pending, (state, {payload}) => {
                state.isLoading = true

            })
            .addCase( getAllUsers.fulfilled, ( state, {payload}) => {
                state.isLoading = false
                console.log(payload.users)
                if(payload.users){
                    state.users = payload.users
                }else{
                    state.message = payload
                }
            })
            .addCase( getAllUsers.rejected, ( state, {payload}) => {
                state.isLoading = false
                state.message =  {
                    type: false, 
                    text: 'Failed to fetched users'
                }
            })

            // ActivateSuspendUser life cycle
            .addCase(activateSuspendUser.pending, (state, {payload}) => {
                state.isLoading = true

            })
            .addCase(activateSuspendUser.fulfilled, ( state, {payload}) => {
                state.isLoading = false
                console.log(payload.users)
                if(payload.users){
                    state.users = payload.users
                }else{
                    state.message = payload
                }
            })
            .addCase(activateSuspendUser.rejected, ( state, {payload}) => {
                state.isLoading = false
                state.message =  {
                    type: false, 
                    text: 'Failed to fetched users'
                }
            })
    }
})

export const { setMessage, clearMessage, openUserModal, closeUserModal, setSelectedUser } = userSlice.actions
export default userSlice.reducer