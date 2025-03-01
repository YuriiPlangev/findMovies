import Search from "./Search"
import { Link } from "react-router-dom"
import "../i18next"
import { useTranslation } from "react-i18next"
import LanguageButtons from "./LanguageButtons"
import LogoIcon from "../assets/icon/LogoIcon"

function Header () {
    const { i18n} = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

return (
    <header className="flex items-center py-7 relative z-10">
        <Link to="/">
        <LogoIcon/>
        </Link>
        <Search/>
      <LanguageButtons changeLanguage={changeLanguage} />
    </header>
)
}
export default Header