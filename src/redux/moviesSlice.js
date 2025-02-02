import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjIzYzY0NjgyNTViZmM3ZmYwNDE4NDhjNzE3MjFkOCIsIm5iZiI6MTczODE2NzAyNi4xMiwic3ViIjoiNjc5YTUyZjJmYzE0ZDI0ZTM1YTk3ZTM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.E4f9IoqSvOvMwoQZ2Sh5STg-c6uV1ZkcR1P20xIIC6Y'
    }
};

export const fetchMovies = createAsyncThunk (
    `movies/fetchMovies`,
    async (category, thunkApi) => {
        const urlMovies = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
        const urlSeries = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
        const response = await fetch(category === "Movies" ? urlMovies : urlSeries, options);
        const data = await response.json();
        return data.results || [];

    }   
)
const moviesSlise = createSlice ({
    name: "Movies",
    initialState: {
    movies: [],
},
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
          })
    }
},);

export default moviesSlise.reducer
