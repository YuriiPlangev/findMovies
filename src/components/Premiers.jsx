import React from "react";
import PremierMovie from "./PremierMovie";
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import MovieSkeleton from "../skeletons/MovieSkeleton";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useGetPremierMoviesQuery } from "../redux/movieApi"; 

function Premiers() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories.category);
    const mediaType = categories === "Movies" ? "movie" : "tv";

    const { data: premiers = [], isLoading, error } = useGetPremierMoviesQuery(mediaType);

    return (
        <section className="mt-[50px] relative">
            <h2 className="text-[#FDD835] text-[32px] font-bold mb-8">
                {t("premiers_announcements")}
            </h2>

            {error && <div className="text-red-500">Ошибка загрузки данных</div>}

            <Swiper
                loop={true}
                modules={[FreeMode, Autoplay]}
                autoplay={{
                    delay: 3000,
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
                    : premiers?.results?.map((premier) => ( 
                          <SwiperSlide key={premier.id}>
                              <PremierMovie
                                  onClick={() =>
                                      navigate(`/media/${mediaType}/${premier.id}`)
                                  }
                                  item={premier}
                              />
                          </SwiperSlide>
                      ))}
            </Swiper>
        </section>
    );
}

export default Premiers;
