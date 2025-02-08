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
  const url = `https://api.themoviedb.org/3/${type}/${id}?language=en-US`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Ошибка: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error;
  }
};

export const getMovieCredits = async (id, type) => {
  const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`, options);
  if (!response.ok) throw new Error("Ошибка при загрузке данных о касте");
  return await response.json();
};

export const getGenres = async (type = "movie") => {
  const response = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?language=en-US`, options);
  const data = await response.json();
  return data.genres || [];
};

export const getSearchResult = async (query) => {
  const urls = [
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
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

export const getVideo = async (id, type) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`, options);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error: ${error}`);
    return [];
  }
};

export const getSimilar = async (id, type) => {
  try {
      const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`, options);

      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

      const data = await response.json();
      return data.results || [];
  } catch (error) {
      console.error(`Error fetching similar movies:`, error);
      return [];
  }
};


