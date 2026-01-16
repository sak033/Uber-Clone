import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignUp from './pages/UserSignUp.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignUp from './pages/CaptainSignUp.jsx'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/captainlogin" element={<CaptainLogin />} />
        <Route path="/captainsignup" element={<CaptainSignUp />} />
      </Routes>
    </div>
  )
}

export default App