import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"

import FeaturedToday from './components/FeaturedToday'
import Header from "./components/Header"
import MovieDetails from './pages/MovieDetails'
import React from 'react'
import Home from './pages/Home'


function App() {

  return (
    <div className="max-w-[1200px] m-auto my-7">
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
    </Router>
    </div>
  )
}
<FeaturedToday  />
export default App
