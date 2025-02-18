


// src/api/tmdbApi.js
import i18n from 'i18next';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjIzYzY0NjgyNTViZmM3ZmYwNDE4NDhjNzE3MjFkOCIsIm5iZiI6MTczODE2NzAyNi4xMiwic3ViIjoiNjc5YTUyZjJmYzE0ZDI0ZTM1YTk3ZTM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.E4f9IoqSvOvMwoQZ2Sh5STg-c6uV1ZkcR1P20xIIC6Y`
  }
};

const today = new Date().toISOString().split('T')[0];

// Функция для получения языка в формате, который нужен API
const getApiLanguage = () => {
  const lang = i18n.language || "en";
  return lang === "ua" ? "uk-UA" : "en-US";
};

// 1. Трендовые фильмы
export const getTrendingMovies = async (type) => {
  const lang = getApiLanguage();
  const response = await fetch(`https://api.themoviedb.org/3/trending/${type}/day?language=${lang}`, options);
  const data = await response.json();
  return data.results || [];
};

// 2. Премьеры
export const getPremierMovies = async (type) => {
  const lang = getApiLanguage();
  const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=${lang}&page=1&primary_release_date.gte=${today}&sort_by=popularity.desc`;
  const response = await fetch(url, options);
  const data = await response.json();
  return data.results || [];
};

// 3. Детали фильма
export const getMovieDetails = async (id, type) => {
  const lang = getApiLanguage();
  const url = `https://api.themoviedb.org/3/${type}/${id}?language=${lang}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Ошибка: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error;
  }
};

// 4. Актерский состав
export const getMovieCredits = async (id, type) => {
  const lang = getApiLanguage();
  const url = `https://api.themoviedb.org/3/${type}/${id}/credits?language=${lang}`;
  const response = await fetch(url, options);
  if (!response.ok) throw new Error("Ошибка при загрузке данных о касте");
  return await response.json();
};

// 5. Жанры
export const getGenres = async () => {
  const lang = getApiLanguage();
  const urls = [
    `https://api.themoviedb.org/3/genre/movie/list?language=${lang}`,
    `https://api.themoviedb.org/3/genre/tv/list?language=${lang}`
  ];

  try {
    const responses = await Promise.all(urls.map(url => fetch(url, options).then(res => res.json())));
    return responses;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// 6. Поиск
export const getSearchResult = async (query) => {
  const lang = getApiLanguage();
  const urls = [
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=${lang}&page=1`,
    `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=${lang}&page=1`
  ];

  try {
    const responses = await Promise.all(urls.map(url => fetch(url, options).then(res => res.json())));
    return [
      ...responses[0].results.map(movie => ({ ...movie, media_type: "movie" })),
      ...responses[1].results.map(show => ({ ...show, media_type: "tv" }))
    ];
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    return [];
  }
};

// 7. Видео
export const getVideo = async (id, type) => {
  const lang = getApiLanguage();
  const url = `https://api.themoviedb.org/3/${type}/${id}/videos?language=${lang}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error: ${error}`);
    return [];
  }
};

// 8. Похожие фильмы/сериалы
export const getSimilar = async (id, type) => {
  const lang = getApiLanguage();
  const url = `https://api.themoviedb.org/3/${type}/${id}/similar?language=${lang}&page=1`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching similar movies:`, error);
    return [];
  }
};

// 9. Трейлер
export const getTrailer = async (id, type) => {
  const lang = getApiLanguage();
  const url = `https://api.themoviedb.org/3/${type}/${id}/videos?language=${lang}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const trailers = data.results?.filter(video => video.type === "Trailer") || [];
    return trailers;
  } catch (err) {
    console.log(`Error fetching trailer`, err);
    return [];
  }
};

// 10. Фильтрация
export const getFiltered = async (category, genre_id, startYear, endYear, page) => {
  const lang = getApiLanguage();
  const url = `https://api.themoviedb.org/3/discover/${category}?language=${lang}&page=${page}&sort_by=vote_average.desc&vote_count.gte=1000&with_genres=${genre_id}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.log("❌ Ошибка при загрузке топ-фильмов:", err);
    return [];
  }
};
