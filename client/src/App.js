import React, { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Component/Login"
import Signup from "./Component/Signup"
import Sidebar from "./Component/Sidebar"

import "./App.css"

const App = () => {


  return (
    <BrowserRouter>
     
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sidebar" element={<Sidebar />} />

      </Routes>
    </BrowserRouter>


  )
}

export default App
