import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/base_url";

export const getServices = createAsyncThunk(
    'services/getList',
    async(values, thunkAPI) => {
        let res = null
        try {
            res = await axios.get(`${baseUrl}/api/service`)
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)
export const updateService = createAsyncThunk(
    'service/update',
    async(values, thunkAPI) => {
        let res = null
        try {
            res = await axios.patch(`${baseUrl}/api/service`, 
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
        isLoading: false,
        message: { text: '', type: true },
        formIsOpened: false, 
        selectedService: null
    },
    reducers: {
        setMessage: (state, {payload}) => {
            state.message = payload
        },
        openForm: (state, action) => {
            state.selectedService = action.payload
            state.formIsOpened = true
            state.message = {text: '', type: true}
        },
        closeForm: ( state) => {
            state.formIsOpened = false
        },
        setSelectedService: (state, action) => {
            state.selectedService = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getServices.fulfilled, (state, {payload})=>{
                state.isLoading = false
                if(payload){
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

            // update service life-cycle
            .addCase(updateService.fulfilled, (state, {payload}) => {
                state.isLoading = false
                if(payload.service){
                    state.services = state.services.map( service => {
                        if(service._id === payload.service._id){
                            return payload.service
                        }
                        return service
                    })
                    state.message = { text: payload.msg, type: true }
                }else{
                    state.message = { text: payload, type: false }
                }
            })

            .addCase(updateService.pending, (state) => {
                state.isLoading = true
                state.message = { text: 'Updating service...', type: true}
            })

            .addCase(updateService.rejected, (state) => {
                state.message = { text: 'Failed to update service', type: false }
                state.isLoading = false
            })
    }
})

export const {openForm, closeForm, setSelectedService, setMessage} = serviceSlice.actions
export default serviceSlice.reducer