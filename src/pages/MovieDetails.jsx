import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Similar from "../widgets/Similar/Similar";
import Trailer from "../features/trailer/ui/Trailer";
import DetailsSkeleton from "../shared/skeletons/DetailsSkeleton";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useGetMovieDetailsQuery } from "../shared/Api/movieApi";

function MovieDetails() {
    const { t } = useTranslation();
    const { mediaType, movieId } = useParams();


    const { data: movie, isLoading, error, refetch } = useGetMovieDetailsQuery(
        { id: movieId, type: mediaType },
        { skip: !movieId }
    );

    useEffect(() => {
        const handleLanguageChange = () => {
            refetch();
        };
        i18n.on("languageChanged", handleLanguageChange);

        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, [refetch]);

    if (isLoading) return <DetailsSkeleton />;
    if (error) return <p className="text-red-500">{t("error")}: {error.message}</p>;
    if (!movie) return <p>{t("error")}</p>;

    const runtime = movie.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
        : `${movie.number_of_seasons} ${t("season", { count: movie.number_of_seasons })}, ${movie.number_of_episodes} ${t("episode", { count: movie.number_of_episodes })}`;

    const directors = [...new Set(
        movie?.credits?.crew
            ?.filter((person) => person.job === "Director")
            .map((person) => person.name)
    )].join(", ") || t("unknown");

    const writers = [...new Set(
        movie?.credits?.crew
            ?.filter((person) => person.job === "Screenplay" || person.job === "Writer")
            .map((person) => person.name)
    )].join(", ") || t("unknown");

    const actors = movie?.credits?.cast?.slice(0, 5).map((actor) => actor.name).join(", ") || t("unknown");

    const countries = movie.production_countries?.map((c) => c.name).join(", ") || t("unknown");

    const genres = movie.genres?.map((genre) => (
        <div key={genre.id} className="bg-[#1d1d1d] text-white py-1.5 px-2.5 border-2 rounded-[50px] border-[#FDD835]">
            {genre.name}
        </div>
    ));

    
    return (
        <>
            <div className="bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_3.84%,rgba(0,0,0,0)_46.32%,rgba(255,255,255,0.08)_95.33%)] mx-[-231px]">
                <div className="max-w-[1200px] m-auto py-[48px] flex">
                    <div>
                        <p className="text-[#FDD835] text-[18px] font-bold">
                            {mediaType === "movie" ? t("movie") : t("tv")}
                        </p>
                        <h2 className="text-[#F5F5F5] text-5xl my-1.5">
                            {movie.title || movie.name}
                        </h2>
                        <div className="text-white text-[15px] flex gap-[15px]">
                            <span>{movie.release_date || movie.first_air_date}</span>
                            {movie.vote_count > 1 && <span>{runtime}</span>}
                        </div>
                    </div>

                    {movie.vote_count > 1 && (
                        <div className="flex items-center gap-5 ml-auto">
                            <p className="flex gap-2 text-3xl text-white items-center">
                                ⭐ {movie.vote_average.toFixed(1)}
                            </p>
                            <div className="text-[13px] text-[#F5F5F599]">
                                <p>{movie.vote_count}</p>
                                <span>{t("ratings")}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="py-7 flex gap-8">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-[272px] bg-gray-300"
                />
                <div className="w-full">
                    <div className="flex gap-4 mb-6">{genres}</div>

                    <p className="text-[#F5F5F5] leading-[27.2px]">{movie.overview}</p>

                    <div className="flex flex-col gap-3 mt-4">
                        <p className="text-[rgba(245,245,245,0.6)]">
                            {t("director")}: <span className="text-[#ffffff]">{directors}</span>
                        </p>
                        <p className="text-[rgba(245,245,245,0.6)]">
                            {t("screenplay")}: <span className="text-[#ffffff]">{writers}</span>
                        </p>
                        <p className="text-[rgba(245,245,245,0.6)]">
                            {t("stars")}: <span className="text-[#ffffff]">{actors}</span>
                        </p>
                        <p className="text-[rgba(245,245,245,0.6)]">
                            {t("countries_of_origin")}: <span className="text-[#ffffff]">{countries}</span>
                        </p>
                        <p className="text-[rgba(245,245,245,0.6)]">
                            {t("release_date")}: <span className="text-[#ffffff]">{movie.release_date || movie.first_air_date}</span>
                        </p>
                    </div>

                    <Trailer id={movieId} type={mediaType} />
                </div>
            </div>

            <Similar id={movieId} type={mediaType} />
        </>
    );
}

export default MovieDetails;
