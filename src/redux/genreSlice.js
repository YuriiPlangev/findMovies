import { getGenres } from "../tmdb";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGenres = createAsyncThunk (
    "genres/fetchGenres",
    async() => {
        try {
            const genresResults = await getGenres();
            return {
                movieGenres: genresResults[0].genres, 
                seriesGenres: genresResults[1].genres
            }
        } catch(err) {
            console.log(err);
            return { movieGenres: [], seriesGenres: [] };
        }
    }
)

const genresSlice = createSlice ({
    name: 'genres',
    initialState : {
        movieGenres: [],
        seriesGenres: [],
        status:"loading",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchGenres.pending, (state) => {
            state.status = "loading";
            state.error = null;
          })
          .addCase(fetchGenres.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.movieGenres = action.payload.movieGenres;
            state.seriesGenres = action.payload.seriesGenres;
        })
          .addCase(fetchGenres.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          });
    }
})

export default genresSlice.reducer
