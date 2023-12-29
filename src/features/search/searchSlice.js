import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: {
      key: "",
      result: [],
    },
    searchBarVisible: false,
  },
  reducers: {
    setSearchKey: (state, action) => {
      state.search.key = action.payload;
    },
    setSearchResult: (state, action) => {
      state.search.result = action.payload;
    },
    showSearchBar: (state) => {
      state.searchBarVisible = true;
    },
    hideSearchBar: (state) => {
      state.searchBarVisible = false;
    },
  },
});

export const { setSearchKey, setSearchResult, hideSearchBar, showSearchBar } =
  searchSlice.actions;
export default searchSlice.reducer;
