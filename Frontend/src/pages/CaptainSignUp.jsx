import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import UberLogo from '../assets/logo-uber.png'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignUp = () => {

  const navigate= useNavigate()

  const [firstname, setFirstName]=useState('')
  const [lastname, setLastName]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
    const [vehicleColor, setVehicleColor]=useState('')
    const [vehiclePlate, setVehiclePlate]=useState('')
    const [vehicleCapacity, setVehicleCapacity]=useState('')
    const [vehicleType, setVehicleType]=useState('')


  const { setCaptainData } = React.useContext(CaptainDataContext);

   const submitHandler= async(e)=>{
    e.preventDefault();
     
   const captainData={
    fullname:{
      firstname: firstname,
      lastname: lastname
    },
    email: email,
    password:password,
    vehicle:{
      color:vehicleColor,
      plate: vehiclePlate,
      capacity: Number(vehicleCapacity),
      vehicleType: vehicleType
    }
   }

   const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData )

   if(response.status===201){
    const data=response.data
    setCaptainData(response.data.data.captain);

    
    navigate('/captain-home')
   }

   
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setVehicleColor('')
    setVehicleCapacity('')
    setVehiclePlate('')
    setVehicleType('')
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
            <h3 className='text-base font-medium mb-2'>Vehicle Information</h3>
            <div className='flex gap-2 mb-5'>
              <input type="text"
                required 
                value={vehicleColor}
                onChange={(e)=>{setVehicleColor(e.target.value)}}
                placeholder='vehicle color' 
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm'/>

              <input type="text"
                required 
                value={vehiclePlate}
                onChange={(e)=>{setVehiclePlate(e.target.value)}}
                placeholder='vehicle plate' 
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm'/>
            </div>

            <div className='flex gap-2 mb-5'>
              <input type="number"
                required 
                value={vehicleCapacity}
                onChange={(e)=>{setVehicleCapacity(e.target.value)}}
                placeholder='vehicle capacity' 
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm'/>

              <select 
                required 
                value={vehicleType}
                onChange={(e)=>{setVehicleType(e.target.value)}}
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base'>
                <option value="">Select vehicle type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="bike">Bike</option>
              </select>
            </div>

            


            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg '>Create Captain account</button>
            <p className='text-center '>Already have an account?<Link to='/captainlogin' className='text-blue-600'> Login here</Link></p>
        </form>
        </div>

        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'> Google Privacy Policy</span> and <span className='underline'>Terms of Service </span>  apply</p>
    </div>
  )
}

export default CaptainSignUp