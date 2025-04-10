import Search from "../../features/Search/Search"
import { Link } from "react-router-dom"
import "../../App/i18next"
import { useTranslation } from "react-i18next"
import LogoIcon from "../../shared/assets/icon/LogoIcon"
import LanguageButtons from "../Header/ui/LanguageButtons"

function Header () {
    const { i18n} = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

return (
    <header className="flex items-center py-7 relative z-10">
        <Link to="/" aria-label="logo">
        <LogoIcon/>
        </Link>
        <Search/>
        <LanguageButtons changeLanguage={changeLanguage}/>
    </header>
)

}
export default Header