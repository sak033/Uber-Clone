import React from 'react'
import UberLogo from '../assets/logo-uber.png'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserLogin = () => {
    const [email, setEmail]=useState('');
    const [password, setPassword]= useState('');
    const [userData, setUserData]=useState('')

    const {user, setUser}=useContext(UserDataContext)
    const navigate=useNavigate()

    const submitHandler=async (e)=>{
        e.preventDefault();
        

        
        const userData={
            email:email,
            password:password
        }
      const responce= await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login` , userData)

      console.log(responce.data)


      if(responce.status===200){
        const data=responce.data 
        setUser(data.user)
        localStorage.setItem('token', responce.data.data.token)
        navigate('/home')
      }
         
       console.log(userData)
        setEmail('');
        setPassword('');
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-5' src={UberLogo} alt="Uber Logo" />
        <form action="" onSubmit={(e)=>{submitHandler(e)}}>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input type="email"
             required 
             value={email}
             onChange={(e)=>{
                setEmail(e.target.value)
             }}
             placeholder='email@example.com' 
             className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'/>

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input type="password" 
            required 
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }
            }
            placeholder='password'
            className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />

            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>
            <p className='text-center '>New here? <Link to='/usersignup' className='text-blue-600'>Creat new Account</Link></p>
        </form>
        </div>

        <div>
           <Link to='/captainlogin' className='bg-[#10b461] flex items-center justify-center  text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as Captain</Link> 
        </div>
    </div>
  )
}

export default UserLogin