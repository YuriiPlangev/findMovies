import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reducer from "./categoriesSlice";
import { build } from "vite";

export const fetchMovies = createAsyncThunk (
    `movies/fetchMovies`,
    async (category, thunkApi) => {
        const urlMovies = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
        const urlSeries = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjIzYzY0NjgyNTViZmM3ZmYwNDE4NDhjNzE3MjFkOCIsIm5iZiI6MTczODE2NzAyNi4xMiwic3ViIjoiNjc5YTUyZjJmYzE0ZDI0ZTM1YTk3ZTM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.E4f9IoqSvOvMwoQZ2Sh5STg-c6uV1ZkcR1P20xIIC6Y'
            }
        };

        const response = await fetch(category === "Movies" ? urlMovies : urlSeries, options);
        const data = await response.json();
        return data.results || [];

    }   
)

export const fetchPremiers = createAsyncThunk (
    "movies/fetchPremiers",
    async () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjIzYzY0NjgyNTViZmM3ZmYwNDE4NDhjNzE3MjFkOCIsIm5iZiI6MTczODE2NzAyNi4xMiwic3ViIjoiNjc5YTUyZjJmYzE0ZDI0ZTM1YTk3ZTM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.E4f9IoqSvOvMwoQZ2Sh5STg-c6uV1ZkcR1P20xIIC6Y'
            }
          };
          const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2025-01-30&sort_by=popularity.desc', options)
          const data = await response.json
          return data.results || []
    }
)
const premiersSlise = createSlice ({
    name: "premiers",
    initialState:{
        premiers:[]
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPremiers.fulfilled, (state, action) =>
        {
            state.movies.payload
        })
    }
})


const moviesSlise = createSlice ({
    name: "Movies",
    initialState: {
    movies: [],
},
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
          })
    }
},);

export default moviesSlise.reducer


// React.useEffect(() =>
//     {
//         const options = {
//             method: 'GET',
//             headers: {
//               accept: 'application/json',
//               Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjIzYzY0NjgyNTViZmM3ZmYwNDE4NDhjNzE3MjFkOCIsIm5iZiI6MTczODE2NzAyNi4xMiwic3ViIjoiNjc5YTUyZjJmYzE0ZDI0ZTM1YTk3ZTM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.E4f9IoqSvOvMwoQZ2Sh5STg-c6uV1ZkcR1P20xIIC6Y'
//             }
//           };
          
//           fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2025-01-30&sort_by=popularity.desc', options)
//           .then(res => res.json())
//             .then(data => {
//                 setPremiers(data.results)
//                 console.log(data);
                
//             })
//             .catch(err => console.error(err));
//     }, [])

//         const [premiers, setPremiers] = React.useState([])