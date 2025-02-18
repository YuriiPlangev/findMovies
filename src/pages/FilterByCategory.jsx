import { useSelector, useDispatch } from "react-redux";
import { fetchGenres } from '../redux/genreSlice';
import { useEffect, useState, useRef } from "react";
import TopRated from "../components/TopRated";
import FilterNav from "../components/FilterNav";
import YearsSlider from "../components/YearsSlider";

function FilterByCategory() {
    const dispatch = useDispatch();
    const { movieGenres, seriesGenres } = useSelector((state) => state.genres);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [showGenres, setShowGenres] = useState(false);
    const [showYears, setShowYears] = useState(false);
    const categories = useSelector((state) => state.categories.category);

    const genresRef = useRef(null); 

    const handleShowGenres = () => {
        setShowGenres(!showGenres);
        setShowYears(false);
    };

    const handleShowYears = () => {
        setShowYears(!showYears);
        setShowGenres(false);
    };

    const handleMovieGenreClick = (genre_id) => {
        setSelectedGenres((prevGenres) =>
            prevGenres.includes(genre_id)
                ? prevGenres.filter((id) => id !== genre_id)
                : [...prevGenres, genre_id]
        );
    };

    useEffect(() => {
        dispatch(fetchGenres());
        function handleClickOutside(event) {
            if (genresRef.current && !genresRef.current.contains(event.target)) {
                setShowGenres(false);  
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch]);

    return (
        <>
            <FilterNav
                handleShowGenres={handleShowGenres}
                showGenres={showGenres}
                handleShowYears={handleShowYears}
                showYears={showYears}
                setShowYears={setShowYears}
                onCategoryChange={() => {
                    setSelectedGenres([]);
                }}
            />

            <div
                ref={genresRef}   
                className={`absolute left-[700px] z-1000 rounded-[8px] bg-gray-800 border-[#FDD835] max-w-[350px] text-center ${showGenres ? "border-1" : ""}`}
            >
                <ul className={`grid grid-cols-2 ${showGenres ? "block" : "hidden"}`}>
                    {(categories === "Movies" ? movieGenres : seriesGenres).map((genre) => (
                        <li
                            key={genre.id}
                            onClick={() => handleMovieGenreClick(genre.id)}
                            className={`p-2 cursor-pointer ${selectedGenres.includes(genre.id) ? "text-[#FDD835] font-bold" : "text-white"}`}
                        >
                            {genre.name}
                        </li>
                    ))}
                </ul>
            </div>
            <YearsSlider setShowYears={setShowYears} showYears={showYears} />
            <TopRated selectedGenres={selectedGenres} />
        </>
    );
}

export default FilterByCategory;
