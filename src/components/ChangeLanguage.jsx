import React from 'react';
import { useTranslation } from 'react-i18next';


export default = () => {
   const { t, i18n } = useTranslation();

   const handleLangSwitch = (e) => {
    const lang = e.target.dataset.lang;
    i18n.changeLanguage(lang);
  }

  return (
    <button 
        className="btn btn-primary"
        data-lang="en"
        onClick={handleLangSwitch}
    >
       {t('languages.en')}
    </button>
  );
}