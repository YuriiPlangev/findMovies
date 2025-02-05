import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPremierMovies } from "../tmdb";

export const fetchPremiers = createAsyncThunk(
    "movies/fetchPremiers",
    async (_, thunkAPI) => {
        try {
            const data = await getPremierMovies("movie"); // ✅ Передаём "movie"
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Ошибка загрузки премьер");
        }
    }
);

const premiersSlice = createSlice({
    name: "Premiers",
    initialState: {
        premiers: [],
        loading: false,
        error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPremiers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPremiers.fulfilled, (state, action) => {
                state.loading = false;
                state.premiers = action.payload;
            })
            .addCase(fetchPremiers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default premiersSlice.reducer;
