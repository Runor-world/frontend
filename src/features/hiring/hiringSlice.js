import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl } from "../../utils/base_url"

export const createHiring = createAsyncThunk(
    'hiring/create',
    async(values, thunkAPI) => {
        let res = null
        try {
            res = await axios.post(`${baseUrl}/api/hiring`, 
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
        }
    }
)

export const getAllHiringsByUser = createAsyncThunk(
    'hiring/user',
    async(values, thunkAPI) => {
        let res = null
        try {
            res = await axios.get(`${baseUrl}/api/hiring/user`, 
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)


const hiringSlice = createSlice({
    name: 'hiring', 
    initialState: {
        hiring: {},
        message: {text: '', error: true},
        success: false, 
        hirings: [],
        service: {}, 
        isLoading: false
    }, 
    reducers: {
        setMessage: ( state, {payload}) => {
            state.message = payload
        },
        clearMessage: ( state) => {
            state.message = { text: '', error: true}
        }, 
        setService: (state, {payload}) =>{
            state.service = payload
        }
    }, 
    extraReducers: (builder)=>{
        builder
            // create hiring 
            .addCase(createHiring.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(createHiring.fulfilled, ( state, {payload})=>{
                state.isLoading = false
                if(payload){
                    state.message = { text: payload.msg, error: false}
                    state.hiring = payload.hiring
                }else{
                    state.message = { text: 'Hiring failed', error: true }
                }
            })
            .addCase(createHiring.rejected, ( state, payload) =>{
                state.isLoading = false
                state.message = { text: payload.msg, error: true}
            })

            // get user's hirings 
            .addCase(getAllHiringsByUser.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(getAllHiringsByUser.fulfilled, ( state, {payload})=>{
                state.isLoading = false
                if(payload){
                    state.hirings = payload.hirings
                }
            })
            .addCase(getAllHiringsByUser.rejected, ( state, payload) =>{
                state.isLoading = false
            })
    }
})

export const { setServiceProvider, setMessage, clearMessage, setService} = hiringSlice.actions
export default hiringSlice.reducer