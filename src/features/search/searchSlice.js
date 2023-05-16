import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: {
            key: "",
            result: []
        }, 
    },
    reducers: {
        setSearchKey: (state, action) =>{
            state.search.key = action.payload
        }, 
        setSearchResult: (state, action) => {
            state.search.result = action.payload
        }
    }
})

export const {setSearchKey, setSearchResult} = searchSlice.actions
export default searchSlice.reducer