import Movie from "./Movie";
import { useDispatch, useSelector } from "react-redux";
import { fetchMostSimilar } from "../redux/similarSlice";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import MovieSkeleton from "../skeletons/MovieSkeleton";
import { useTranslation } from "react-i18next";



function Similar({ id, type }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { similar, loading } = useSelector((state) => state.similar);
    const mediaType = type === "movie" ? t("movies").toLowerCase() : t("series").toLowerCase();

    useEffect(() => {
        if (id && type) {
            dispatch(fetchMostSimilar({ id, type }));
        }
    }, [dispatch, id, type]);
    console.log(loading);
    

    return (
        <div className="slider-container">
            <h2 className="text-[#FDD835] text-[32px] font-bold pb-7">
                {t("similar")} {type}
            </h2>
            {similar.length === 0 && !loading && (
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
    {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
                <MovieSkeleton />
            </SwiperSlide>
        ))
        : similar.length > 0 ? (
            similar.map((movie) => (
                <SwiperSlide key={movie.id}>
                    <Movie
                        item={movie}
                        onClick={() => navigate(`/media/${type}/${movie.id}`)}
                    />
                </SwiperSlide>
            ))
        ) : null
    }
</Swiper>
           
        </div>
    );
}

export default Similar;
