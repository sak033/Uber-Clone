import React from 'react'
import UberLogo from '../assets/logo-uber.png'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext.jsx'

const UserSignUp = () => {
  
  const [firstname, setFirstName]=useState('')
  const [lastname, setLastName]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [userData, setUserData]=useState('')
  const [error, setError] = useState('')

  const navigate=useNavigate()
   const {user , setUser}= React.useContext(UserDataContext)
  
  const submitHandler=async (e)=>{
    e.preventDefault();

    
  if (password.length < 6) {
    setError('Password must be at least 6 characters')
    return
  }

  setError('') // clear old error

     
   const newUser={
    fullname:{
      firstname: firstname,
      lastname: lastname
    },
    email: email,
    password:password
   }

   


   const responce= await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
  
   if(responce.status===201){
   const data= responce.data

   setUser(data.user)
   localStorage.setItem('token', data.token)
    navigate('/home')

    
   }

   console.log(userData)
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

          {error && (
  <p className="text-red-600 text-sm mb-3">
    {error}
  </p>
)}


            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg '>Create Account</button>
            <p className='text-center '>Already have an account?<Link to='/userlogin' className='text-blue-600'> Login here</Link></p>
        </form>
        </div>

        <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided</p>
    </div>
  )
}

export default UserSignUp