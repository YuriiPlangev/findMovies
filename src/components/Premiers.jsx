
import PremierMovie from "./PremierMovie";
import {useDispatch, useSelector} from 'react-redux';
import { fetchPremiers } from '../redux/premiersSlice';
import { useNavigate } from "react-router-dom";
import React from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,FreeMode } from 'swiper/modules';
import MovieSkeleton from "../skeletons/MovieSkeleton";
import { useTranslation } from "react-i18next";





function Premiers () {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { premiers, loading } = useSelector((state) => state.premiers)
    const categories = useSelector((state) => state.categories.category)
    const mediaType = categories === "Movies" ? "movie" : "tv";


    React.useEffect(() => {
        dispatch(fetchPremiers())
    }, [dispatch])

    return (
        <section className="mt-[50px] relative">
            <h2 className="text-[#FDD835] text-[32px] font-bold mb-8">
                {t("premiers_announcements")}
            </h2>

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
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <SwiperSlide key={index}>
                              <MovieSkeleton />
                          </SwiperSlide>
                      ))
                    : premiers.map((premier) => (
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
export default Premiers