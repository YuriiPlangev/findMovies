import { useSelector} from 'react-redux';
const categories = useSelector((state) => state.categories.category)

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjIzYzY0NjgyNTViZmM3ZmYwNDE4NDhjNzE3MjFkOCIsIm5iZiI6MTczODE2NzAyNi4xMiwic3ViIjoiNjc5YTUyZjJmYzE0ZDI0ZTM1YTk3ZTM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.E4f9IoqSvOvMwoQZ2Sh5STg-c6uV1ZkcR1P20xIIC6Y'
    }
};


export const getTrendingMovies = async () => {
    const response = await(`'https://api.themoviedb.org/3/trending${category === "Movie" ? "movie" : "tv"}/day?language=en-US`)
    const data = await response.json()
    return data.results || [];
}
export const getPremierMovies = async () => {
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2025-02-02&sort_by=popularity.desc', options)
    const data = await response.json();
    return data.results || [];
  };
  export const getMovieDetails = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
    const data = await response.json();
    return data || {};
  };
  export const getMovieCredits = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options);
    const data = await response.json();
    return data || {};
  };
  
  export const getMovieGenres = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en-US`, options);
    const data = await response.json();
    return data.genres || [];
  };