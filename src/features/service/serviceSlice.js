import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/base_url";

export const getServices = createAsyncThunk(
    'services/getList',
    async(values, thunkAPI) => {
        let res = null
        try {
            res = await axios.get(`${baseUrl}/api/service`)
            console.log('res: ', res)
            return res.data
        } catch (error) {
            console.log('error: ', error)
            thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

export const createService = createAsyncThunk(
    'services/create',
    async(values, thunkAPI) => {
        let res = null
        try {
            res = await axios.post(`${baseUrl}/api/service`, 
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue("Something went wrong")
            return error.response.data.msg   
        }
    }
)

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        services: [],
        isLoading: true,
        message: { text: '', type: true }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getServices.fulfilled, (state, {payload})=>{
                state.isLoading = false
                if(payload.services){
                    state.services = payload.services
                }else{
                    state.services = []
                }
            })
            .addCase(getServices.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getServices.rejected, (state, )=>{
                state.isLoading = false
            })

            // create service life-cycle
            .addCase(createService.fulfilled, (state, {payload}) => {
                state.isLoading = false
                if(payload.service){
                    state.services = [...state.services, payload.service]
                    state.message = { text: payload.msg, type: true }
                }else{
                    state.message = { text: payload, type: false }
                }
            })

            .addCase(createService.pending, (state) => {
                state.isLoading = true
                state.message = { text: 'Creating service...', type: true}
            })

            .addCase(createService.rejected, (state) => {
                state.message = { text: 'Failed to create service', type: false }
                state.isLoading = false
            })
    }
})

export default serviceSlice.reducer