import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPremierMovies} from "../tmdb";

export const fetchPremiers = createAsyncThunk (
    "movies/fetchPremiers",
    async () => {
          const data = await getPremierMovies()
          return data;
    }
)
const premiersSlise = createSlice ({
    name: "Premiers",
    initialState: {
        premiers:[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPremiers.fulfilled, (state, action) =>
        {
            state.premiers = action.payload;
        })
    }
})

export default premiersSlise.reducer