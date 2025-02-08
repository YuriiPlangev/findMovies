import { getSearchResult } from "../tmdb";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reducer from "./detailsSlice";

export const fetchSearchResults = createAsyncThunk (
    'search/fetchSearchResults',
    async (query, thunkApi) => {
        try {
            const searchResults = await getSearchResult(query)
            return searchResults
        } catch (error) {
            console.log(`Error:${error}`)

            return thunkApi.rejectWithValue("Error download data"); 
        }
    }
)

const searchSlice = createSlice ({
    name: 'search',
    initialState : {
        searchResults: [],
        status:"loading",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSearchResults.pending, (state) => {
            state.status = "loading";
            state.error = null;
          })
          .addCase(fetchSearchResults.fulfilled, (state, action) => {
            console.log("Ответ от API:", action.payload);
            state.status = "succeeded";
            state.searchResults = action.payload; 
        })
          .addCase(fetchSearchResults.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          });
    }
})

export default searchSlice.reducer
