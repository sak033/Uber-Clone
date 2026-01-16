import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import UberLogo from '../assets/logo-uber.png'

const CaptainSignUp = () => {

  const [firstname, setFirstName]=useState('')
    const [lastname, setLastName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [userData, setUserData]=useState('')
  
   const submitHandler=(e)=>{
    e.preventDefault();
     
   setUserData({
    fullName:{
      firstName: firstname,
      lastName: lastname
    },
    email: email,
    password:password
   })

   
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-5' src={UberLogo} alt="Uber Logo" />
        <form action="" onSubmit={(e)=>{submitHandler(e)}}>
              

           <h3 className='text-base font-medium mb-2'>What's your name</h3>
            <div className='flex gap-2 mb-5'>
            <input type="text"
             required 
             value={firstname}
             onChange={(e)=>{setFirstName(e.target.value)}}
             placeholder='first name' 
             className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-base placeholder:text-sm'/>

             <input type="text"
             required 
             value={lastname}
             onChange={(e)=>{setLastName(e.target.value)}}
             placeholder='last name' 
             className='bg-[#eeeeee]   w-1/2 rounded px-4 py-2 border  text-base placeholder:text-sm'/>

           </div>
            <h3 className='text-base font-medium mb-2'>What's your email</h3>
            <input type="email"
             required 
             value={email}
             onChange={(e)=>{setEmail(e.target.value)}}
             placeholder='email@example.com' 
             className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm'/>

            <h3 className='text-base font-medium mb-2'>Enter Password</h3>
            <input type="password" 
            required 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder='password'
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm' />

            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg '>Login</button>
            <p className='text-center '>Already have an account?<Link to='/captainlogin' className='text-blue-600'> Login here</Link></p>
        </form>
        </div>

        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'> Google Privacy Policy</span> and <span className='underline'>Terms of Service </span>  apply</p>
    </div>
  )
}

export default CaptainSignUp