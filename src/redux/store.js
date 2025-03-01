import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from "./categoriesSlice"
import releaseYearsReducer from './ReleaseYearSlice';

import { movieApi } from "./movieApi";

const store = configureStore({
  reducer: {
    categories : categoriesReducer,
    [movieApi.reducerPath]: movieApi.reducer,
    years: releaseYearsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export default store;