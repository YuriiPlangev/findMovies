import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTrendingMovies, getTrendingSeries } from "../tmdb";

export const fetchMovies = createAsyncThunk (
    `movies/fetchMovies`,
    async (category, thunkApi) => {
        try {
        let data;
        if (category === "Movies") {
        data = await getTrendingMovies()
        } else if (category === "Series" ) {
           data = await getTrendingSeries()
        }
        return data;
    } catch (err) {
        return thunkApi.rejectWithValue("Error")

    }
}
    )
        
    const moviesSlice = createSlice({
        name: "Movies",
        initialState: { movies: [] },
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(fetchMovies.fulfilled, (state, action) => {
                state.movies = action.payload;
            });
        }
    });
    
    export default moviesSlice.reducer;
