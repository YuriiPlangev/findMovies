import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFiltered } from "../tmdb";

export const fetchFiltered = createAsyncThunk(
  "filtered/fetchFiltered",
  async ({category, genre_id, startYear, endYear, page}, { getState }) => {
      console.log("🔍 fetchTopRated вызван");
      try {
        const apiCategory = category === "Movies" ? "movie" : "tv";
        const newMovies = await getFiltered(apiCategory, genre_id, startYear, endYear, page);

        // Добавляем новые фильмы к уже загруженным
        const currentMovies = getState().filtered.filtered || [];
        return page === 1 ? newMovies : [...currentMovies, ...newMovies];
      } catch (err) {
        console.error("❌ Ошибка при загрузке топ-фильмов:", err);
        return [];
      }
    }
  );
  


  const filteredSlice = createSlice({
    name: "filtered",
    initialState: {
      filtered: [],
      status: "loading",
      error: null,
      currentPage : 1,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchFiltered.pending, (state) => {
          console.log("⏳ fetchTopRated.pending...");
          state.status = "loading";
          state.error = null;
        })
        .addCase(fetchFiltered.fulfilled, (state, action) => {
          console.log("✅ Redux обновляет topRated:", action.payload);
          state.filtered = action.payload;
        })
        .addCase(fetchFiltered.rejected, (state, action) => {
          console.log("❌ fetchTopRated.rejected:", action.error.message);
          state.status = "failed";
          state.error = action.error.message;
        });
    },
  });
  


  export default filteredSlice.reducer
