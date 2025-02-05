import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { fetchMovieDetails } from '../redux/detailsSlice';

function MovieDetails() {
    const { mediaType, movieId } = useParams();
    const dispatch = useDispatch();
    const { movie, credits, loading, error } = useSelector((state) => state.details);

    React.useEffect(() => {
        console.log("📌 movieId из useParams:", movieId);
        const type = movieId.startsWith("tv") ? "tv" : "movie";  // Определяем тип
        if (movieId && mediaType) {
            dispatch(fetchMovieDetails({ type : mediaType, movieId }));  // Передаем type
        }
    }, [dispatch, movieId, mediaType]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!movie) return <p>Фильм не найден.</p>;

    const runtime = `${Math.floor(movie.runtime / 60)}h ${(movie.runtime % 60)}m`;
    const directors = credits?.crew?.filter(
        (person) => person.known_for_department === "Directing")
        .slice(0,2)
    const writers = credits?.crew?.filter(
        (person) => person.known_for_department === "Writer" || person.known_for_department === "Writing")
        .slice(0,2);   
    const actors = credits?.cast?.slice(0, 5).map((actor) => `${actor.name}, `);
    const runtimeTv = `${movie.number_of_seasons} ${movie.number_of_seasons === 1 ? "season" : "seasons"}, ${movie.number_of_episodes} ${movie.number_of_episodes === 1 ? "episode" : "episodes"}`

    return (
        <>
            <div className="bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_3.84%,rgba(0,0,0,0)_46.32%,rgba(255,255,255,0.08)_95.33%)] mx-[-231px]">
                <div className="max-w-[1200px] m-auto py-[48px] flex">
                    <div>
                        <p className="text-[#FDD835] text-[18px] font-bold">
                            {mediaType === "movie" ? "Movie" : "Series"}
                        </p>
                        <h2 className="text-[#F5F5F5] text-5xl my-1.5">
                            {movie.title || movie.name}
                        </h2>
                        <div className="text-white text-[15px] flex gap-[15px]">
                            <span>{movie.release_date || movie.first_air_date}</span>
                            <span>{mediaType === "movie" ? runtime : runtimeTv}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 ml-auto">
                        <p className="flex gap-2 text-3xl text-white items-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<rect width="20" height="20" fill="#1E1E1E"/>
<g id="Find Movies - Home Page" clipPath="url(#clip0_0_1)">
<rect width="1440" height="1133" transform="translate(-136 -505)" fill="inherit"/>
<g id="Movie - cover">
<rect id="Rectangle 11" x="-8" y="-226" width="171" height="258" rx="8" fill="url(#pattern0_0_1)"/>
<rect id="Rectangle 13" x="-8" y="-226" width="171" height="258" rx="8" fill="black" fillOpacity="0.24"/>
<g id="Frame 1">
<rect width="69" height="44" transform="translate(-8 -12)" fill="black"/>
<g id="Group 10">
<g id="Frame 49">
<g id="material-symbols:star-rounded">
<path id="Vector" d="M10.3765 15.4042L6.31609 17.8502C6.13672 17.9643 5.94919 18.0132 5.75351 17.9969C5.55783 17.9806 5.38661 17.9154 5.23985 17.8013C5.09308 17.6871 4.97894 17.5446 4.8974 17.3737C4.81587 17.2022 4.79956 17.0104 4.84848 16.7984L5.92473 12.1754L2.32909 9.06899C2.16602 8.92222 2.06426 8.75492 2.02382 8.56706C1.98273 8.37986 1.9948 8.19657 2.06002 8.0172C2.12525 7.83782 2.22309 7.69106 2.35355 7.57692C2.484 7.46277 2.66338 7.38939 2.89167 7.35677L7.63694 6.94095L9.47145 2.58704C9.55299 2.39136 9.67953 2.2446 9.85107 2.14676C10.022 2.04892 10.1971 2 10.3765 2C10.5559 2 10.7313 2.04892 10.9029 2.14676C11.0738 2.2446 11.2 2.39136 11.2815 2.58704L13.116 6.94095L17.8613 7.35677C18.0896 7.38939 18.269 7.46277 18.3994 7.57692C18.5299 7.69106 18.6277 7.83782 18.6929 8.0172C18.7582 8.19657 18.7706 8.37986 18.7301 8.56706C18.689 8.75492 18.5869 8.92222 18.4239 9.06899L14.8282 12.1754L15.9045 16.7984C15.9534 17.0104 15.9371 17.2022 15.8556 17.3737C15.774 17.5446 15.6599 17.6871 15.5131 17.8013C15.3664 17.9154 15.1951 17.9806 14.9994 17.9969C14.8038 18.0132 14.6162 17.9643 14.4369 17.8502L10.3765 15.4042Z" fill="url(#paint0_linear_0_1)"/>
</g>
</g>
</g>
</g>
</g>
</g>
<defs>
<pattern id="pattern0_0_1" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlinkHref="#image0_0_1" transform="matrix(0.00209552 0 0 0.00138889 -0.00292398 0)"/>
</pattern>
<linearGradient id="paint0_linear_0_1" x1="2" y1="2" x2="20.0632" y2="18.0337" gradientUnits="userSpaceOnUse">
<stop stopColor="#FFEE58"/>
<stop offset="1" stopColor="#FF8F00"/>
</linearGradient>
<clipPath id="clip0_0_1">
<rect width="1440" height="1133" fill="white" transform="translate(-136 -505)"/>
</clipPath>

</defs>
                            </svg>

                            {movie.vote_average}
                        </p>
                        <div className="text-[13px] text-[#F5F5F599]">
                            <p>{movie.vote_count}</p>
                            <span>ratings</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-7 flex gap-8">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-[272px] bg-gray-300" />
                <div className="w-full">
                    <div className="flex rounded-[8px] text-[17px border-[#FDD835] border-1">
                        <div className="bg-[#FDD835] py-2.5 pl-4 pr-6 clip-custom rounded-l-[6px]">
                            <p className="text-[#212121]">Awards & nominations</p>
                        </div>
                        <div>
                            <p className="text-[#F5F5F5] py-2.5">
                                Won 2 Oscars 130 wins & 136 nominations total
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 my-6">
                        {movie.genres.map((genre) => (
                            <div key={genre.id} className="bg-[#1d1d1d] text-white py-1.5 px-2.5 border-2 rounded-[50px] border-[#373737]">
                                {genre.name}
                            </div>
                        ))}
                    </div>
                    <p className="text-[#F5F5F5] leading-[27.2px]">{movie.overview}</p>
                    <div className="flex flex-col gap-3 mt-4">
                        <p className="text-[rgba(245,245,245,0.6)]">
                            Director: { directors.map((director) => <span className='text-[#ffffff]' key={director.id}>{director.name}, </span>)}
                        </p>
                        <p className="text-[rgba(245,245,245,0.6)]">
                            Screenplay: { writers.map((writer) => <span className='text-[#ffffff]' key={writer.id}>{writer.name}, </span>)}
                        </p>
                        <p className="text-[rgba(245,245,245,0.6)]">
                            Stars: <span className='text-[#ffffff]'>{actors}</span>
                        </p>
                        <p className="text-[rgba(245,245,245,0.6)]">
                            Countries of Origin: <span className='text-[#ffffff]'>{movie.production_countries[0] ? movie.production_countries[0].name : ""}</span>
                        </p>
                        <p className="text-[rgba(245,245,245,0.6)]">
                            Release date: <span className='text-[#ffffff]'>{movie.release_date || movie.first_air_date}</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieDetails;
