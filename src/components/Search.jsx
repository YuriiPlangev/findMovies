import React, { useState, useEffect, useRef } from "react";
import SearchResults from "./SearchResults";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGetSearchResultQuery } from "../redux/movieApi"; 
import SearchIcon from "../assets/icon/SearchIcon";

function Search() {
    const { t } = useTranslation();
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const location = useLocation();

    const { data, isLoading, error } = useGetSearchResultQuery(query, {
        skip: !query.trim(),
    });

    const searchResults = Array.isArray(data?.results) ? data.results : [];

    const handleSearch = () => {
        if (query.trim() !== "") {
            setShowResults(true);
        }
    };

    const handleMovieClick = (movie, type) => {
        navigate(`/media/${type}/${movie.id}`);
        setShowResults(false);
    };


    useEffect(() => {
        setShowResults(false);
        setQuery("");
    }, [location.pathname]);


    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={searchRef}>
            <div className="relative z-50">
                <input
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    type="text"
                    placeholder={t("search_placeholder")}
                    className="bg-white px-[36px] py-2 rounded-lg w-[1000px]"
                />
                <button onClick={handleSearch} className="absolute left-3 top-[11px]">
                <SearchIcon />
                  </button>
            </div>

            <div className="flex flex-col absolute max-h-[400px] overflow-auto top-[75px] w-full max-w-[1000px] rounded-lg">
                {error && <p className="bg-[#212121] py-6 px-3 text-white">Ошибка: {error.message}</p>}
                {isLoading ? (
                    <p className="bg-[#212121] py-6 px-3 text-white">Загрузка...</p>
                ) : searchResults.length === 0 && query.trim() !== "" ? (
                    <p className="bg-[#212121] py-6 px-3 text-white">{t("search_not_found", { query })}</p>
                ) : (
                    showResults &&
                    searchResults.map((movie) => (
                        <SearchResults
                            key={movie.id}
                            movie={movie}
                            onClick={() => handleMovieClick(movie, movie.media_type)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Search;
