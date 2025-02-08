import Slider from "react-slick";
import Movie from "./Movie";
import { useDispatch, useSelector } from "react-redux";
import { fetchMostSimilar } from "../redux/similarSlice";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Similar({ id, type }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    // Мемоизируем значение, чтобы не было лишних ререндеров
    const similar = useSelector((state) => state.similar?.similar);
    const memoizedSimilar = useMemo(() => similar, [similar]);
    

    console.log("🟡 Компонент Similar - ID:", id, "TYPE:", type);
    console.log("🟡 State similar:", similar);
    

    useEffect(() => {
        console.log("📌 Similar useEffect ID и TYPE:", id, type);
        if (id && type) {
            dispatch(fetchMostSimilar({ id, type }));
        }
    }, [dispatch, id, type]); 

    const settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "linear",
    };

    return (
        <div className="slider-container">
            <h2 className="text-[#FDD835] text-[32px] font-bold pb-7">
                Similar {type}
            </h2>
            {memoizedSimilar && memoizedSimilar.length > 0 ? (
                <Slider {...settings}>
                    {memoizedSimilar.map((movie) => (<>
                        <Movie key={movie.id} item={movie} onClick={() => navigate(`/media/${type}/${movie.id}`)} />
                        </>
                        
                    ))}
                </Slider>
            ) : (
                <p>Похожие фильмы не найдены</p>
            )}
        </div>
    );
}

export default Similar;
