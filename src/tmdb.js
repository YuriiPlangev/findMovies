


// // src/api/tmdbApi.js
// import i18n from 'i18next';

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjIzYzY0NjgyNTViZmM3ZmYwNDE4NDhjNzE3MjFkOCIsIm5iZiI6MTczODE2NzAyNi4xMiwic3ViIjoiNjc5YTUyZjJmYzE0ZDI0ZTM1YTk3ZTM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.E4f9IoqSvOvMwoQZ2Sh5STg-c6uV1ZkcR1P20xIIC6Y`
//   }
// };

// const today = new Date().toISOString().split('T')[0];

// // Функция для получения языка в формате, который нужен API
// const getApiLanguage = () => (i18n.language === "ua" ? "uk-UA" : "en-US");

// // Универсальная функция для запросов
// const fetchFromApi = async (endpoint) => {
//   const lang = getApiLanguage();
//   const url = `https://api.themoviedb.org/3${endpoint}&language=${lang}`;
//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     return data.results || data;
//   } catch (error) {
//     console.error(`Ошибка при запросе ${endpoint}:`, error);
//     return [];
//   }
// };

// // 1. Трендовые фильмы
// export const getTrendingMovies = (type) => fetchFromApi(`/trending/${type}/day?`);

// // 2. Премьеры
// export const getPremierMovies = (type) => fetchFromApi(`/discover/${type}?include_adult=false&include_video=false&page=1&primary_release_date.gte=${today}&sort_by=popularity.desc`);

// // 3. Детали фильма
// export const getMovieDetails = (id, type) => fetchFromApi(`/${type}/${id}?`);

// // 4. Актерский состав
// export const getMovieCredits = (id, type) => fetchFromApi(`/${type}/${id}/credits?`);

// // 5. Жанры
// export const getGenres = () => Promise.all([
//   fetchFromApi(`/genre/movie/list?`),
//   fetchFromApi(`/genre/tv/list?`)
// ]);

// // 6. Поиск
// export const getSearchResult = (query) => Promise.all([
//   fetchFromApi(`/search/movie?query=${query}&include_adult=false&page=1`),
//   fetchFromApi(`/search/tv?query=${query}&include_adult=false&page=1`)
// ]);

// // 7. Видео
// export const getVideo = (id, type) => fetchFromApi(`/${type}/${id}/videos?`);

// // 8. Похожие фильмы
// export const getSimilar = (id, type) => fetchFromApi(`/${type}/${id}/similar?page=1`);

// // 9. Трейлеры
// export const getTrailer = (id, type) => fetchFromApi(`/${type}/${id}/videos?`);

// // 10. Фильтрация
// export const getFiltered = (category, genre_id, startYear, endYear, page) => 
//   fetchFromApi(`/discover/${category}?page=${page}&sort_by=vote_average.desc&vote_count.gte=1000&with_genres=${genre_id}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`);