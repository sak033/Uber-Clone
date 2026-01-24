import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignUp from './pages/UserSignUp.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignUp from './pages/CaptainSignUp.jsx'
import Home from './pages/Home.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx'


const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/captainlogin" element={<CaptainLogin />} />
        <Route path="/captainsignup" element={<CaptainSignUp />} />
        <Route path='/home'
         element={
         <UserProtectedWrapper>
            <Home/>
          </UserProtectedWrapper>
        }/>
      <Route/>

      <Route path='/users/logout' 
      element={
      <UserProtectedWrapper>
        <UserLogout/>
      </UserProtectedWrapper>
      }/>

      <Route path='/captain-home' element={
        <CaptainProtectedWrapper>
          <CaptainHome/>
        </CaptainProtectedWrapper>
      }/>
      </Routes>
    </div>
  )
}

export default App