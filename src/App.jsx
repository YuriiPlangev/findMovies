import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import MovieDetails from './pages/MovieDetails';
import Home from './pages/Home';
import FilterByCategory from './pages/FilterByCategory';
import ErrorBoundary from './pages/ErrorPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="max-w-[1200px] m-auto my-7">
      <ErrorBoundary>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/media/:mediaType/:movieId" element={<MovieDetails />} /> 
            <Route path="/categories" element={<FilterByCategory />} />
            <Route path="*" element={<div>404 - Страница не найдена</div>} />
          </Routes>
          <Footer/>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
