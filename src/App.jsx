import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Header from "./components/Header"
import MovieDetails from './pages/MovieDetails'
import Home from './pages/Home'


function App() {

  return (
    <div className="max-w-[1200px] m-auto my-7">
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/media/:mediaType/:movieId" element={<MovieDetails />} /> 
        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
    </Router>
    </div>
    
  )
}

export default App
