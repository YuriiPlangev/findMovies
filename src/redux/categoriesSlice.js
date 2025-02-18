


  import { createSlice } from "@reduxjs/toolkit";

  const categoriesSlice = createSlice({
    name: "categories",
    initialState : { category: "Movies"},
    reducers: {
        changeCategoriesToSeries: (state) => {state.category = "Series"},
        changeCategoriesToMovies: (state) => {state.category = "Movies"},
        clearFilters: (state) => {
          state.selectedGenres = [];
          state.selectedYear = null;
      }
    }
  })
  export const {changeCategoriesToMovies, changeCategoriesToSeries, clearFilters} = categoriesSlice.actions
  export default categoriesSlice.reducer