import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import i18n from "../../App/i18next"

const API_URL = "https://api.themoviedb.org/3";
const API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjIzYzY0NjgyNTViZmM3ZmYwNDE4NDhjNzE3MjFkOCIsIm5iZiI6MTczODE2NzAyNi4xMiwic3ViIjoiNjc5YTUyZjJmYzE0ZDI0ZTM1YTk3ZTM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.E4f9IoqSvOvMwoQZ2Sh5STg-c6uV1ZkcR1P20xIIC6Y"; // 🔹 Укажи свой API-токен

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", API_TOKEN);
      headers.set("Accept", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTrendingMovies: builder.query({
      query: (category) => {
        const lang = i18n.language === "ua" ? "uk-UA" : "en-US";
        const type = category === "Movies" ? "movie" : "tv";
        return `/trending/${type}/day?language=${lang}`;
      },
      keepUnusedDataFor: 300,
    }),

    getPremierMovies: builder.query({
      query: (type) => {
        const lang = i18n.language === "ua" ? "uk-UA" : "en-US";
        const today = new Date().toISOString().split("T")[0];
        return `/discover/${type}?include_adult=false&include_video=false&page=1&primary_release_date.gte=${today}&sort_by=popularity.desc&language=${lang}`;
      },
    }),
    
    getMovieDetails: builder.query({
      query: ({ id, type }) => {
        const lang = i18n.language === "ua" ? "uk-UA" : "en-US"; // ✅ Динамическое обновление языка
        return `/${type}/${id}?language=${lang}&append_to_response=credits`; // ✅ Объединяем запросы
      },
      providesTags: ["MovieDetails"], // ✅ Позволяет обновлять данные при смене языка
    }),


    getGenres: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const movieGenres = await fetchWithBQ(`/genre/movie/list?language=${i18n.language}`);
        const seriesGenres = await fetchWithBQ(`/genre/tv/list?language=${i18n.language}`);
    
        if (movieGenres.error) return { error: movieGenres.error };
        if (seriesGenres.error) return { error: seriesGenres.error };
    
        return {
          data: {
            movieGenres: movieGenres.data, 
            seriesGenres: seriesGenres.data,
          },
        };
      },
    }),

    getSearchResult: builder.query({
      query: (query) => `/search/multi?query=${query}&language=${i18n.language}`,
    }),
    
    getVideo: builder.query({
      query: ({ id, type }) => `/${type}/${id}/videos?language=${i18n.language}`,
    }),

    getSimilar: builder.query({
      query: ({ id, type }) => `/${type}/${id}/similar?language=${i18n.language}`,
    }),
    
    getCredits: builder.query({
      query: ( {type, id}) => `/${type}/${id}/credits?language=${i18n.language}`,
  }),

    getFiltered: builder.query({
      query: ({ category, genre_id, startYear, endYear, page }) => {
        const type = category === "Movies" ? "movie" : "tv"; 
        const lang = i18n.language === "ua" ? "uk-UA" : "en-US"; 
        let url = `/discover/${type}?page=${page}&sort_by=vote_average.desc&vote_count.gte=1000&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31&language=${lang}`;
        
        if (genre_id) url += `&with_genres=${genre_id}`; 
        
        return url;
      },
    }),
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useGetPremierMoviesQuery,
  useGetMovieDetailsQuery,
  useGetGenresQuery,
  useGetSearchResultQuery,
  useGetVideoQuery,
  useGetSimilarQuery,
  useGetFilteredQuery,
  useGetCreditsQuery,
} = movieApi;
