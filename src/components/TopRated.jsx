import { useSelector, useDispatch } from "react-redux"
import {fetchFiltered} from '../redux/filteredSlice'
import { useEffect,useMemo, useState } from "react"
import Movie from '../components/Movie'
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";




function TopRated({selectedGenres}) {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const filtered = useSelector((state) => state.filtered?.filtered || []);
    const memoizedTopRated = useMemo(() => filtered, [filtered]);
    const navigate = useNavigate()
    const years = useSelector((state) => state.years.years);
    const categories = useSelector((state) => state.categories.category)

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        loadMovies(1);
    }, [categories, selectedGenres, years]);

    const loadMovies = async (pageToLoad) => {
        setLoading(true);
        await dispatch(fetchFiltered({
            category: categories,
            genre_id: selectedGenres.join(","),
            startYear: years[0],
            endYear: years[1],
            page: pageToLoad,
        }));
        setLoading(false);
    };

    const handleShowMore = () => {
        const nextPage = page + 1;
        loadMovies(nextPage);
        setPage(nextPage);
    };
      

        
    
    return (
    <>
        <h2 className="text-[#FDD835] text-[36px] my-5">{t("advanced_search")}</h2>
        <section className="grid grid-cols-5 gap-y-[100px] justify-items-center
 w-full">
            {
                memoizedTopRated.map((movie) => (
                    <Movie onClick={() => navigate(`/media/${categories === "Movies" ? "movie" : "tv"}/${movie.id}`)}
                     key={movie.id} 
                     item={movie}/>
                ))
            }
        </section>
        <div className="w-full flex justify-center mt-[56px]">
            {hasMore && memoizedTopRated.length > 0 && (
                <button
                    onClick={handleShowMore}
                    disabled={loading}
                    className="px-6 py-3 text-[#FDD835] rounded hover:border-1 hover:border-[#FDD835]"
                >
                    {loading ? t("loading") : t("show_more")}
                </button>
            )}
        </div>
        </>

    )
}
export default TopRated