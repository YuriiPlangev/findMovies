import UkraineIcon from "../assets/icon/UkraineIcon"
import EnIcon from "../assets/icon/EnIcon"
function LanguageButtons ({changeLanguage}) {
    return(
<div className="flex gap-1 ml-2">
<button onClick={() => changeLanguage('en')}><EnIcon/></button>
<button onClick={() => changeLanguage('ua')}><UkraineIcon/></button>

</div>
)
}
export default LanguageButtons
