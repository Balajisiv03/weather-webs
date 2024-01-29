import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Auth from './pages/Auth/Auth'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/Auth" element={<Auth/>}/>
    </Routes>
  )
}

export default AllRoutes