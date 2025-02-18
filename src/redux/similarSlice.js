import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSimilar } from "../tmdb";

export const fetchMostSimilar = createAsyncThunk(
    "similar/fetchMostSimilar",
    async ({ id, type }) => {
        console.log("⏳ Вызван fetchMostSimilar:", id, type); // Лог перед запросом

        try {
            const similarMovies = await getSimilar(id, type);
            const similarMoviesFiltered = similarMovies
            .filter(movie => movie.vote_count > 15)
            .sort((a, b) => b.vote_average - a.vote_average);
            console.log("🔍 Исходные похожие фильмы:", similarMovies);
            console.log("🔍 Фильтрованные фильмы:", similarMoviesFiltered);
            console.log("✅ Отправляем в Redux:", similarMoviesFiltered);
            
            return similarMoviesFiltered
                
        } catch (err) {
            console.error(`❌ Ошибка при загрузке похожих фильмов:`, err);
            return [];
        }
    }
);


const similarSlice = createSlice({
    name: "similar",
    initialState: {
        similar: [],
        loading: true,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMostSimilar.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMostSimilar.fulfilled, (state, action) => {
                state.similar = action.payload;
                state.loading = false;
            })
            .addCase(fetchMostSimilar.rejected, (state) => {
                state.loading = false;
            });
    }
});



export default similarSlice;
