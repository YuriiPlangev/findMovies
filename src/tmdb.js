const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjIzYzY0NjgyNTViZmM3ZmYwNDE4NDhjNzE3MjFkOCIsIm5iZiI6MTczODE2NzAyNi4xMiwic3ViIjoiNjc5YTUyZjJmYzE0ZDI0ZTM1YTk3ZTM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.E4f9IoqSvOvMwoQZ2Sh5STg-c6uV1ZkcR1P20xIIC6Y`
  }
};

const today = new Date().toISOString().split('T')[0];

export const getTrendingMovies = async (type) => {
  const response = await fetch(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`, options);
  const data = await response.json();
  return data.results || [];
};

export const getPremierMovies = async (type) => {
  const response = await fetch(`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${today}&sort_by=popularity.desc`, options);
  const data = await response.json();
  return data.results || [];
};

export const getMovieDetails = async (id, type) => {
  let url;
  if (type === 'movie') {
    url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  } else if (type === 'tv') {
    url = `https://api.themoviedb.org/3/tv/${id}?language=en-US&`;
  } else {
    throw new Error('Invalid media type');
  }

  try {
    const response = await fetch(url, options);
    
    // Проверка на успешный ответ
    if (!response.ok) {
      throw new Error(`Ошибка при запросе: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error;  // Прокидываем ошибку дальше
  }
};


export const getMovieCredits = async (movieId, type) => {
  const response = await fetch(`https://api.themoviedb.org/3/${type}/${movieId}/credits?language=en-US`, options);
  if (!response.ok) {
      throw new Error("Ошибка при загрузке данных о касте");
  }
  return await response.json();
};

export const getGenres = async (type = "movie") => {
  const response = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?language=en-US`, options);
  const data = await response.json();
  return data.genres || [];
};
