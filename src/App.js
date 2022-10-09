import React from 'react'
import Main from './components/main'
import Register from './components/register'
import Profile from './components/profile'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'

function App() {


  return (

    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

