import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovieDetails, getMovieCredits } from "../tmdb";

// Создаём asyncThunk для загрузки информации о фильме
export const fetchMovieDetails = createAsyncThunk(
    "details/fetchMovieDetails",
    async (movieId, thunkApi) => {
        try {
            console.log("🔍 Запрашиваем фильм с ID:", movieId);
            
            const details = await getMovieDetails(movieId);
            const credits = await getMovieCredits(movieId);
            
            console.log("✅ Получены данные о фильме:", details);
            console.log("✅ Получены данные о касте:", credits);
            
            return { details, credits };
        } catch (error) {
            console.error("❌ Ошибка при загрузке фильма:", error);
            return thunkApi.rejectWithValue("Ошибка загрузки данных");
        }
    }
);

const detailsSlice = createSlice({
    name: "details",
    initialState: {
        movie: null,
        credits: [],
        loading: false,  // ✅ Добавили
        error: null      // ✅ Добавили
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.loading = true;  // ✅ Устанавливаем загрузку
                state.error = null;    // ✅ Очищаем ошибку
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.loading = false;   // ✅ Отключаем загрузку
                state.movie = action.payload.details;
                state.credits = action.payload.credits;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // ✅ Запоминаем ошибку
            });
    }
});

export default detailsSlice.reducer;