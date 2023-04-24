import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/base_url";

export const getServices = createAsyncThunk(
    'services/getList',
    async(arg, thunkAPI) => {
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
const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        services: [],
        isLoading: true,
        errorMessage: ''
    },
    extraReducers: (builder) => {
        builder
            .addCase(getServices.fulfilled, (state, {payload})=>{
                state.isLoading = false
                console.log(payload)
                if(payload){
                    state.services = payload.services
                }else{
                    state.errorMessage = 'Something went wrong'
                }
            })
            .addCase(getServices.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getServices.rejected, (state, action)=>{
                state.errorMessage = action.payload
                state.isLoading = false
            })
    }
})

export default serviceSlice.reducer