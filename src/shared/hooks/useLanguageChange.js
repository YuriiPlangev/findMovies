
import { useEffect } from 'react';
import i18n from 'i18next';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/moviesSlice';
const useLanguageChange = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      console.log(`🌐 Язык изменен на: ${lng}`);
      dispatch(fetchMovies()); 
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [dispatch]);
};

export default useLanguageChange;