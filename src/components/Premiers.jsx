
import Slider from "react-slick";
import PremierMovie from "./PremierMovie";
import {useDispatch, useSelector} from 'react-redux';
import { fetchPremiers } from '../redux/premiersSlice';
import { useNavigate } from "react-router-dom";
import React from "react";

function Premiers () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { premiers } = useSelector((state) => state.premiers)
    

    React.useEffect(() => {
        dispatch(fetchPremiers())
    }, [dispatch])
    console.log(premiers);
    const settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "linear"
      };
    const categories = useSelector((state) => state.categories.category)
    const mediaType = categories === "Movies" ? "movie" : "tv";


    return (
        <section className="mt-[110px] relative">
            <h2 className="text-[#FDD835] text-[32px] font-bold mb-8">
            Premieres and announcements
            </h2>
            <div className="slider-container">
                <Slider {...settings}>
                    {premiers.map((premier) => (
                        <PremierMovie
                        onClick={() => navigate(`/media/${mediaType}/${premier.id}`)}
                        item={premier} 
                        key={premier.id}/>
                    ))}
                </Slider>
            </div>
        </section>
    )

}
export default Premiers