import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/base_url";

export const getAllServiceMen = createAsyncThunk(
    'serviceMan/getAll',
    async(values, thunkAPI) => {
        let res = null
        try {
            res = await axios.get(`${baseUrl}/api/serviceman`)
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

const serviceManSlice = createSlice({
    name: 'serviceman',
    initialState: {
        serviceMen: [],
        isLoading: false,
        message: ''
    },
    reducers: {
        setMessage: (state, {payload}) =>{
            state.message = payload
        },
        clearMessage: (state, {payload}) =>{
            state.message = ''
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(getAllServiceMen.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(getAllServiceMen.fulfilled, ( state, {payload})=>{
                state.isLoading = false
                state.message = payload.msg
                state.serviceMen = payload.serviceMen
            })
            .addCase(getAllServiceMen.rejected, ( state, payload) =>{
                state.isLoading = false
                state.message = payload.msg
            })
    }
})

export const {setMessage, clearMessage} = serviceManSlice.actions
export default serviceManSlice.reducer