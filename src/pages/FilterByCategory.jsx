import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetGenresQuery } from "../shared/Api/movieApi";
import TopRated from "../widgets/Top-rated/TopRated";
import FilterNav from "../features/filter-movies/ui/FilterNav";
import YearsSlider from "../features/filter-movies/ui/YearsSlider";

function FilterByCategory() {
    const categories = useSelector((state) => state.categories.category);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [showGenres, setShowGenres] = useState(false);
    const [showYears, setShowYears] = useState(false);
    const genresRef = useRef(null);
    const { data, isLoading, error } = useGetGenresQuery();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genresRef.current && !genresRef.current.contains(event.target)) {
                setShowGenres(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleGenres = () => {
        setShowGenres((prev) => !prev);
        setShowYears(false);
    };

    const toggleYears = () => {
        setShowYears((prev) => !prev);
        setShowGenres(false);
    };

    const handleGenreClick = (genre_id) => {
        setSelectedGenres((prev) =>
            prev.includes(genre_id) ? prev.filter((id) => id !== genre_id) : [...prev, genre_id]
        );
    };

    const genres = categories === "Movies" ? data?.movieGenres?.genres || [] : data?.seriesGenres?.genres || [];

    return (
        <>
            <FilterNav
                handleShowGenres={toggleGenres}
                showGenres={showGenres}
                handleShowYears={toggleYears}
                showYears={showYears}
                setShowYears={setShowYears}
                onCategoryChange={() => setSelectedGenres([])}
            />

            <div
                ref={genresRef}
                className={`absolute left-[700px] z-1000 rounded-[8px] bg-gray-800 border-[#FDD835] max-w-[350px] text-center ${showGenres ? "border" : ""}`}
            >
                {isLoading ? (
                    <p className="text-white p-2">Загрузка...</p>
                ) : error ? (
                    <p className="text-red-500 p-2">Ошибка загрузки жанров</p>
                ) : (
                    <ul className={`grid grid-cols-2 ${showGenres ? "block" : "hidden"}`}>
                        {genres.map((genre) => (
                            <li
                                key={genre.id}
                                onClick={() => handleGenreClick(genre.id)}
                                className={`p-2 cursor-pointer ${
                                    selectedGenres.includes(genre.id) ? "text-[#FDD835] font-bold" : "text-white"
                                }`}
                            >
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <YearsSlider setShowYears={setShowYears} showYears={showYears} />

            <TopRated selectedGenres={selectedGenres} />
        </>
    );
}

export default FilterByCategory;
