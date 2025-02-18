import React from "react";
import Movie from "./Movie";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,FreeMode } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { changeCategoriesToMovies, changeCategoriesToSeries } from "../redux/categoriesSlice"
import { fetchMovies} from "../redux/moviesSlice"
import FilteredButton from "./FilteredButton";
import MovieSkeleton from "../skeletons/MovieSkeleton";
import "../i18next";
import { useTranslation } from "react-i18next";

function FeaturedToday() {
    const { t} = useTranslation();
    const categories = useSelector((state) => state.categories.category)
    const dispatch = useDispatch();
    const { movies, loading } = useSelector((state) => state.movies)
    const navigate = useNavigate();

    React.useEffect(() => {
        dispatch(fetchMovies(categories))
    }, [dispatch, categories]);

    const mediaType = categories === "Movies" ? "movie" : "tv";

    return (
        <section className="mt-[64px] relative">
            <h2 className="text-[#FDD835] text-[32px] font-bold">
            {t("featured_today")}
            </h2>
            <nav className="relative">
                <ul className="flex text-[17px] gap-[40px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[rgba(255,255,255,0.12)] after:w-full after:mb-[-10px] m-[45px]">
                    <li
                        onClick={() => dispatch(changeCategoriesToMovies())}
                        className={` text-[#F5F5F5] opacity-60 cursor-pointer ${
                            categories === "Movies"
                                ? "after:content-[''] after:absolute after:top-8 after:left-[35px] after:h-[5px] after:bg-[#ffffff] after:w-[70px] after:rounded-[4px]"
                                : ""
                        }`}
                    >
                        {t("movies")}
                    </li>
                    <li
                        onClick={() => dispatch(changeCategoriesToSeries())}
                        className={` text-[#F5F5F5] opacity-60 cursor-pointer ${
                            categories === "Series"
                                ? "after:content-[''] after:absolute after:top-8 after:left-[125px] after:h-[5px] after:bg-[#ffffff] after:w-[70px] after:rounded-[4px]"
                                : ""
                        }`}
                    >
                       {t("series")}
                    </li>
                    <li>
                        <FilteredButton />
                    </li>
                </ul>
            </nav>
            <Swiper
                loop={true}
                modules={[FreeMode, Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                slidesPerView={6}
                spaceBetween={30}
                freeMode={true}
                className="mySwiper"
            >
               {loading 
    ? Array.from({ length: 6 }).map((_, index) => (
          <SwiperSlide key={index}>
              <MovieSkeleton />
          </SwiperSlide>
      ))
    : movies.map((movie) => (
          <SwiperSlide key={movie.id}>
              <Movie
                  key={movie.id}
                  onClick={() => navigate(`/media/${mediaType}/${movie.id}`)}
                  categories={categories}
                  item={movie}
              />
          </SwiperSlide>
      ))
}
            </Swiper>
        </section>
    );
}

export default FeaturedToday;


