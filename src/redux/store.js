import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from "./categoriesSlice"
import moviesReducer from '../redux/moviesSlice'
import premiersReducer from '../redux/premiersSlice';

const store = configureStore({
  reducer: {
    categories : categoriesReducer,
    movies: moviesReducer,
    premiers : premiersReducer
  }
});

export default store;