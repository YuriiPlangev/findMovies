import { useMemo, useState } from "react";
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

    const { data, isLoading, error } = useGetFilteredQuery({
        category: categories,
        genre_id: selectedGenres.join(","),
        startYear: years[0],
        endYear: years[1],
        page,
    });

    const filtered = useMemo(() => Array.isArray(data?.results) ? data.results : [], [data]);

    const handleShowMore = () => setPage((prev) => prev + 1);

    return (
        <>
            <h2 className="text-[#FDD835] text-[36px] my-5">{t("advanced_search")}</h2>

            <section className="grid grid-cols-5 gap-y-[100px] justify-items-center w-full">
                {isLoading ? (
                    <p className="text-white text-center">Загрузка...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">Ошибка загрузки данных</p>
                ) : filtered.length === 0 ? (
                    <p className="text-white text-center">{t("no_results")}</p>
                ) : (
                    filtered.map((movie) => (
                        <Movie
                            key={movie.id}
                            item={movie}
                            onClick={() => navigate(`/media/${categories === "Movies" ? "movie" : "tv"}/${movie.id}`)}
                        />
                    ))
                )}
            </section>

            <div className="w-full flex justify-center mt-[56px]">
                {filtered.length > 0 && (
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



