import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './content/usuario/login.jsx'
import MainPage from './content/domicilios/mainpage.jsx'
import "bootstrap/dist/css/bootstrap.min.css"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App