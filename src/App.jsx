import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"

import FeaturedToday from './components/FeaturedToday'
import Header from "./components/Header"
import MovieDetails from './components/MovieDetails'
import React from 'react'
import Home from './components/Home'


function App() {

  return (
    <div className="max-w-[1200px] m-auto my-7">
      <Header/>
    <Router>
      <Routes>
        <Route path="/" element={<Home ></Home>} />
        <Route path="/movieDetails/:id" element={<MovieDetails />} />
        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
    </Router>

    
    {/* <MovieDetails/> */}
    </div>
  )
}
<FeaturedToday  />
export default App
