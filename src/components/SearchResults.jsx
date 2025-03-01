import { useGetMovieCreditsQuery } from "../redux/movieApi";
import { useTranslation } from "react-i18next";
import moviePlaceholder from '../assets/moviePlaceholder.jpg';

function SearchResults({ movie, onClick }) {

    const { t } = useTranslation();
    const { data: credits, isLoading } = useGetMovieCreditsQuery(movie.id);

    const actors = credits?.cast?.slice(0, 3).map(actor => actor.name).join(", ") || "Нет данных";

    return (
        <article onClick={onClick} className="h-[110px] w-full p-[12px] flex gap-5 cursor-pointer bg-[#212121]">
            <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : moviePlaceholder}
                alt={movie.title || movie.name}
                className="h-full w-[55px]"
            />
            <div className="text-[#F5F5F5]">
                <h3 className="text-[21px]">{movie.title || movie.name}</h3>
                <p className="text-[15px] opacity-60">{movie.release_date || movie.first_air_date}</p>
                <p className="text-[17px]">{isLoading ? t("loading_actors") : actors}</p>
            </div>
        </article>
    );
}

export default SearchResults;
