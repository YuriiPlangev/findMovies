


  import { createSlice } from "@reduxjs/toolkit";

  const categoriesSlice = createSlice({
    name: "categories",
    initialState : { category: "Movies"},
    reducers: {
        changeCategoriesToSeries: (state) => {state.category = "Series"},
        changeCategoriesToMovies: (state) => {state.category = "Movies"},
    }
  })
  export const {changeCategoriesToMovies, changeCategoriesToSeries} = categoriesSlice.actions
  export default categoriesSlice.reducer