import UkraineIcon from "../../../shared/assets/icon/UkraineIcon"
import EnIcon from "../../../shared/assets/icon/EnIcon"
function LanguageButtons ({changeLanguage}) {
    return(
<div className="flex gap-1 ml-2">
<button aria-label="en" onClick={() => changeLanguage('en')}><EnIcon aria-hidden="true"/><span className="sr-only">EN</span></button>
<button aria-label="ua" onClick={() => changeLanguage('ua')}><UkraineIcon aria-hidden="true"/> <span className="sr-only">UA</span></button>

</div>
)
}
export default LanguageButtons
