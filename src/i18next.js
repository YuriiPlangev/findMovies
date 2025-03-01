import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
.use(LanguageDetector) 
.use(initReactI18next)
.init({
  resources: {
    en: {
      translation: {
        "featured_today": "Featured Today",
        "movie": "Movie",
        "tv": "Series",
        "movies": "Movies",
        "series": "Series",
        "search_filter": "Search by filter",
        "release_year" : "Release year",
        "release_date" : "Release date",
        "selected_years" : "Selected Years",
        "genres" : "Genres",
        "filter" : "Filters",
        "premiers_announcements" : "Premieres and announcements",
        "search_not_found" :  "No results found for “{{query}}” phrase.",
        "similar" : "Similar",
        "similar_not_found": "No similar {{typeName}} found",
        "advanced_search" : "Advanced search",
        "watch_trailer" : "Watch trailer",
        "loading_trailer" : "Loading trailer...",
        "ratings" : "ratings",
        "director" : "Director",
        "screenplay" : "Screenplay",
        "stars" : "Stars",
        "countries_of_origin" : "Countries of Origin",
        "error" : "Something went wrong.",
        "search_placeholder" : "Search",
        "loading" : "Loading...",
        "show_more" : "Show more",
        "loading_actors" : "Loading actors...",
      }
    },
    ua: {
      translation: {
        "featured_today": "Популярне сьогодні",
        "movies": "Фільми",
        "series": "Серіали",
        "movie": "Фільм",
        "tv": "Серіал",
        "search_filter": "Пошук по фільтрам",
        "release_year" : "Рік релізу",
        "release_date" : "Дата релізу",
        "selected_years" : "Обрані роки",
        "genres" : "Жанри",
        "filter" : "Фільтри",
        "premiers_announcements" : "Прем'єри та анонси",
        "search_not_found" : "За фразою “{{query}}” результатів не знайдено.",
        "similar" : "Схожі",
        "similar_not_found": "Схожі {{typeName}} не знайдені",
        "advanced_search" : "Розширений пошук",
        "watch_trailer" : "Дивитися трейлер",
        "loading_trailer" : "Завантажуємо трейлер...",
        "ratings" : "оцінок",
        "director" : "Режисер",
        "screenplay" : "Сценаріст",
        "stars" : "Актори",
        "countries_of_origin" : "Країна",
        "error" : "Щось пішло не так",
        "search_placeholder" : "Пошук",
        "loading" : "Завантаження...",
        "show_more" : "Показати більше",
        "loading_actors" : "Завантаження акторів...",
        
      }
    }
  },
  lng: localStorage.getItem('i18nextLng') || "en",
  fallbackLng: "en",
  order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
