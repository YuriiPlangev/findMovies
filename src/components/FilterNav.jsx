import { useSelector, useDispatch } from "react-redux"
import { changeCategoriesToMovies, changeCategoriesToSeries, clearFilters } from "../redux/categoriesSlice"
import { useTranslation } from "react-i18next";



function FilterNav ({handleShowGenres, showGenres, handleShowYears, showYears, onCategoryChange}){
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.category)

    return (
        <nav className="relative">
        <ul className="flex text-[17px] gap-[40px] mb-10 ml-11 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[rgba(255,255,255,0.12)] after:w-full after:mb-[-10px]">
                        
                        
                        <li onClick={() => {
                                dispatch(changeCategoriesToMovies());
                                onCategoryChange()
                            }} 
                        className={`cursor-pointer text-[#F5F5F5]  opacity-60 ${categories === "Movies" ? "after:content-[''] after:absolute after:top-8 after:left-[35px] after:h-[5px] after:bg-[#ffffff] after:w-[70px] after:rounded-[4px]" : ""} `}>
                            {t("movies")}
                        </li>
                        <li onClick={() => {
                                dispatch(changeCategoriesToSeries());
                                                                onCategoryChange()

                            }}  
                        className={`cursor-pointer text-[#F5F5F5] opacity-60 ${categories === "Series" ? "after:content-[''] after:absolute after:top-8 after:left-[125px] after:h-[5px] after:bg-[#ffffff] after:w-[70px] after:rounded-[4px]" : ""} `}>
                            {t("series")}
                        </li>
                        <li className=" text-white ">
                        {t("filter")}
                        </li>
                        <li onClick={handleShowYears} className={`cursor-pointer ${showYears === true ? "text-white font-bold" : "text-[#F5F5F5] opacity-60"}`}>
                        {t("release_year")}
                        </li>
                        <li className={`cursor-pointer ${showGenres === true ? "text-white font-bold" : "text-[#F5F5F5] opacity-60"}`} onClick={handleShowGenres}>
                        {t("genres")}
                        </li>
                        
            </ul>
        </nav>
        
    )

}
export default FilterNav