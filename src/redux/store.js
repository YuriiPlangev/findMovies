import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from "./categoriesSlice"
import moviesReducer from './tmdb'

const store = configureStore({
  reducer: {
    categories : categoriesReducer,
    movies: moviesReducer,
    
  }
});

export default store;