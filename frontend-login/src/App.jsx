import React from 'react'
import Home from './pages/Home'
import Register from './pages/register.jsx';
import { Routes, Route } from 'react-router'
import Login from './pages/Login.jsx';

function App() {
  return (
    <Routes>
      <Route index element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
    </Routes>
    
       
  )
}

export default App
