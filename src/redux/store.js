import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from "./categoriesSlice"
import moviesReducer from '../redux/moviesSlice'
import premiersReducer from '../redux/premiersSlice';
import detailsReducer from '../redux/detailsSlice'

const store = configureStore({
  reducer: {
    categories : categoriesReducer,
    movies: moviesReducer,
    premiers : premiersReducer,
    details : detailsReducer,
  }
});

export default store;