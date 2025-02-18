import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovieDetails, getMovieCredits } from "../tmdb";

// ✅ Фикс аргументов в createAsyncThunk
export const fetchMovieDetails = createAsyncThunk(
    "details/fetchMovieDetails",
    async ({ type, movieId }, thunkApi) => {
        try {
           
            
            const details = await getMovieDetails(movieId, type);
            const credits = await getMovieCredits(movieId, type);
            
            
            
            return { details, credits };
        } catch (error) {
            console.error("❌ Ошибка при загрузке данных:", error);
            return thunkApi.rejectWithValue("Ошибка загрузки данных");
        }
    }
);

const detailsSlice = createSlice({
    name: 'details',
    initialState: {
      movie: null,
      credits: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMovieDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMovieDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.movie = action.payload.details || null;
          state.credits = action.payload.credits || null;
        })
        .addCase(fetchMovieDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        });
    },
  });

export default detailsSlice.reducer;
