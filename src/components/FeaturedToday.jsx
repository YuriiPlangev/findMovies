import React from "react";
import Movie from "./Movie";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { changeCategoriesToMovies, changeCategoriesToSeries } from "../redux/categoriesSlice"
import { fetchMovies} from "../redux/moviesSlice"


  function FeaturedToday() {
    const categories = useSelector((state) => state.categories.category)
    const dispatch = useDispatch();
    const { movies } = useSelector((state) => state.movies)
    const navigate = useNavigate();


    React.useEffect (() => {
        dispatch(fetchMovies(categories))
    }, [dispatch, categories]);


    const settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };

    return (<section className="mt-[64px] relative">
            <h2 className="text-[#FDD835] text-[32px] font-bold">
                Featured Today
            </h2>
            <nav className="relative">
                <ul className="flex text-[17px] gap-[40px] text-[#F5F5F5] opacity-60 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[rgba(255,255,255,0.12)] after:w-full after:mb-[-10px] m-[45px]">
                    <li onClick={() => dispatch(changeCategoriesToMovies())} className={`cursor-pointer ${categories === "Movies" ? "after:content-[''] after:absolute after:top-8 after:left-[35px] after:h-[5px] after:bg-[#ffffff] after:w-[70px] after:rounded-[4px]" : ""}`}>
                        Movies
                    </li>
                    <li onClick={() => dispatch(changeCategoriesToSeries())} className={`cursor-pointer ${categories === "Series" ? "after:content-[''] after:absolute after:top-8 after:left-[125px] after:h-[5px] after:bg-[#ffffff] after:w-[70px] after:rounded-[4px]" : ""}`}>
                        Series
                    </li>
                </ul>
            </nav>
            <div className="slider-container">
                <Slider {...settings}>
                {movies.map((movie) => (
                    <Movie 
                        key={movie.id} 
                        onClick={() => navigate(`/movie/${movie.id}`)} 
                        categories={categories} 
                        item={movie} 
                    />
                    ))}
                    
                </Slider>
                
            </div>
        </section>

    );
}

export default FeaturedToday;
