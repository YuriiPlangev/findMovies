import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from "./categoriesSlice"
import moviesReducer from '../redux/moviesSlice'
import premiersReducer from '../redux/premiersSlice';
import detailsReducer from '../redux/detailsSlice'
import searchReducer from '../redux/searchSlice'
import similarSlice from "./similarSlice"; 
import trailerReducer from "./trailerSlice";
import genresSlice from "./genreSlice";
import filteredReducer from './filteredSlice';
import releaseYearsReducer from './ReleaseYearSlice'

const store = configureStore({
  reducer: {
    categories : categoriesReducer,
    movies: moviesReducer,
    premiers : premiersReducer,
    details : detailsReducer,
    search: searchReducer,
    similar: similarSlice.reducer,
    trailer : trailerReducer,
    genres : genresSlice,
    filtered: filteredReducer,
    years: releaseYearsReducer,
  }
});

export default store;