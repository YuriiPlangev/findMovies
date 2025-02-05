import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTrendingMovies } from "../tmdb";

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (category, thunkAPI) => {
        try {
            let data;
            if (category === "Movies") {
                data = await getTrendingMovies("movie");
            } else if (category === "Series") {
                data = await getTrendingMovies("tv"); 
            }
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(`Error: ${err}`);
        }
    }
);

const moviesSlice = createSlice({
    name: "movies",
    initialState: { 
        movies: [],
        loading: false,  
        error: null      
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default moviesSlice.reducer;
