import React from 'react'
import UberLogo from '../assets/logo-uber.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserLogin = () => {
    const [email, setEmail]=useState('');
    const [password, setPassword]= useState('');
    const [userData, setUserData]=useState('')

    const submitHandler=(e)=>{
        e.preventDefault();
        
        setUserData({
            email:email,
            password:password
        })
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