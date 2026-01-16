import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import UberLogo from '../assets/logo-uber.png'

const CaptainLogin = () => {
  const [email, setEmail]=useState('');
      const [password, setPassword]= useState('');
      const [captainData, setCaptainData]=useState('')
  
      const submitHandler=(e)=>{
          e.preventDefault();
          
          setCaptainData({
              email:email,
              password:password
          })
         console.log(captainData)
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
            <p className='text-center '>Want to join a fleet?<Link to='/captainsignup' className='text-blue-600'> Register as a Captain</Link></p>
        </form>
        </div>

        <div>
           <Link to='/userlogin' className='bg-[#f3c164] flex items-center justify-center  text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as User</Link> 
        </div>
    </div>
  )
}

export default CaptainLogin