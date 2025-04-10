import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";
function FilteredButton() {
    const { t} = useTranslation();
const navigate = useNavigate()
    return(

        <button aria-label="filter" onClick={()=> navigate("/categories")} className="text-white rounded-[8px] active:scale-[0.9] border-2 p-2 right-0 top-[-8px] border-[#FDD835] absolute">
            {t("search_filter")}
        </button>
    )

}
export default FilteredButton
