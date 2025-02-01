
import Slider from "react-slick";
import PremierMovie from "./PremierMovie";
import {useDispatch } from 'react-redux';
import { fetchPremiers } from "../redux/tmdb";
import React from "react";

function Premiers () {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchPremiers)
    }, [dispatch])
   


    const settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "linear"
      };


    return (
        <section className="mt-[110px] relative">
            <h2 className="text-[#FDD835] text-[32px] font-bold mb-8">
            Premieres and announcements
            </h2>
            <div className="slider-container">
                <Slider {...settings}>
                    {premiers.map((movies) => (
                        <PremierMovie item={movies} key={movies.id}/>
                    ))}
                </Slider>
            </div>
        </section>
    )

}
export default Premiers