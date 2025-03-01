import Movie from "./Movie";
import { useNavigate } from "react-router-dom";
import React from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import MovieSkeleton from "../skeletons/MovieSkeleton";
import { useTranslation } from "react-i18next";
import { useGetSimilarQuery } from "../redux/movieApi"; // ✅ Используем RTK Query

function Similar({ id, type }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const mediaType = type === "movie" ? t("movies").toLowerCase() : t("series").toLowerCase();

    const { data, isLoading, error } = useGetSimilarQuery({ id, type }, { skip: !id || !type });

    const similar = Array.isArray(data?.results) ? data.results : [];

    return (
        <div className="slider-container">
            <h2 className="text-[#FDD835] text-[32px] font-bold pb-7">
                {t("similar")} {type}
            </h2>

            {error && <p className="text-center text-red-500">Ошибка загрузки данных</p>}

            {similar.length === 0 && !isLoading && !error && (
                <p className="text-center text-white text-3xl">
                    {t("similar_not_found", { typeName: mediaType })}
                </p>
            )}

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
                {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <MovieSkeleton />
                        </SwiperSlide>
                    ))
                    : similar.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Movie
                                item={movie}
                                onClick={() => navigate(`/media/${type}/${movie.id}`)}
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}

export default Similar;
