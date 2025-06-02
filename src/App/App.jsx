import "./styles/App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "../widgets/Header/Header";
import MovieDetails from "../pages/MovieDetails";
import Home from "../pages/Home";
import FilterByCategory from "../pages/FilterByCategory";
import ErrorBoundary from "../pages/ErrorPage";
import Footer from "../widgets/Footer/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  function ScropllToTop() {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);
  }

  return (
    <div className="max-w-[1200px] m-auto my-7">
      <ErrorBoundary>
        <ScropllToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="" element={<Navigate to="/" />} />
          <Route path="/media/:mediaType/:movieId" element={<MovieDetails />} />
          <Route path="/categories" element={<FilterByCategory />} />
        </Routes>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
