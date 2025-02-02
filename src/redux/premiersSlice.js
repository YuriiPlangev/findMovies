import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reducer from "./categoriesSlice";


export const fetchPremiers = createAsyncThunk (
    "movies/fetchPremiers",
    async () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjIzYzY0NjgyNTViZmM3ZmYwNDE4NDhjNzE3MjFkOCIsIm5iZiI6MTczODE2NzAyNi4xMiwic3ViIjoiNjc5YTUyZjJmYzE0ZDI0ZTM1YTk3ZTM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.E4f9IoqSvOvMwoQZ2Sh5STg-c6uV1ZkcR1P20xIIC6Y'
            }
          };
          const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2025-02-02&sort_by=popularity.desc', options)
          const data = await response.json()
          return data.results || []
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