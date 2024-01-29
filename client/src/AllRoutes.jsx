import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home';

const AllRoutes = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/Auth" element={<Auth/>}/>
    </Routes>
  )
}

export default AllRoutes