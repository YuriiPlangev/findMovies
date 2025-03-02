import { useState, useEffect } from "react";
import Movie from '../components/Movie';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useGetFilteredQuery } from "../redux/movieApi"; 

function TopRated({ selectedGenres }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const years = useSelector((state) => state.years?.years || [1900, 2025]);
    const categories = useSelector((state) => state.categories.category);
    
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]); // Храним загруженные страницы
    const [hasMore, setHasMore] = useState(true);

    const { data, isLoading, error } = useGetFilteredQuery({
        category: categories,
        genre_id: selectedGenres.join(","),
        startYear: years[0],
        endYear: years[1],
        page,
    });

    useEffect(() => {
        setPage(1);
        setMovies([]);
        setHasMore(true);
    }, [categories, selectedGenres, years]);

    useEffect(() => {
        if (data?.results) {
            setMovies((prev) => [...prev, ...data.results]);
            if (data.results.length === 0) setHasMore(false); // Если данных нет, отключаем кнопку
        }
    }, [data]);

    const handleShowMore = () => setPage((prev) => prev + 1);

    return (
        <>
            <h2 className="text-[#FDD835] text-[36px] my-5">{t("advanced_search")}</h2>

            <section className="grid grid-cols-5 gap-y-[100px] justify-items-center w-full">
                {isLoading && page === 1 ? (
                    <p className="text-white text-center">Загрузка...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">Ошибка загрузки данных</p>
                ) : movies.length === 0 ? (
                    <p className="text-white text-center">{t("no_results")}</p>
                ) : (
                    movies.map((movie) => (
                        <Movie
                            key={movie.id}
                            item={movie}
                            onClick={() => navigate(`/media/${categories === "Movies" ? "movie" : "tv"}/${movie.id}`)}
                        />
                    ))
                )}
            </section>

            <div className="w-full flex justify-center mt-[56px]">
                {hasMore && movies.length > 0 && (
                    <button
                        onClick={handleShowMore}
                        disabled={isLoading}
                        className="px-6 py-3 text-[#FDD835] rounded hover:border-1 hover:border-[#FDD835]"
                    >
                        {isLoading ? t("loading") : t("show_more")}
                    </button>
                )}
            </div>
        </>
    );
}

export default TopRated;
