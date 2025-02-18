import React, { useState, useRef } from "react";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from 'react-redux';
import { setYears } from '../redux/ReleaseYearSlice';
import { useTranslation } from "react-i18next";


const YearsSlider = ({ showYears, setShowYears }) => {
  const { t } = useTranslation();
    
  const years = useSelector((state) => state.years.years);
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
        if (sliderRef.current && !sliderRef.current.contains(event.target)) {
            setShowYears(false);  
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowYears]);

  const handleChange = (event, newYears) => {
    if (newYears[0] !== years[0] || newYears[1] !== years[1]) {
      dispatch(setYears(newYears)); 
    }
  };

  return (
    <div ref={sliderRef} className={`absolute z-100 left-[470px] w-64 p-4 bg-gray-800 text-white rounded-lg border-1 border-[#FDD835] ${showYears === true ? "block" : "hidden"}`}>
        <h3 className="text-lg mb-2">{t("release_year")}</h3>
        <Slider
            value={years}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={1900}
            max={2025}
            sx={{ color: "#FDD835" }} 
        />
        <p className="mt-2">{t("selected_years")}: {years[0]} - {years[1]}</p>
    </div>
  );
};

export default YearsSlider;
