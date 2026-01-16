import React from 'react'
import UberLogo from '../assets/logo-uber.png'
import LandingImage from '../assets/uber-landingImage.png'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
        <div className=' bg-[url("../assets/uber-landingImage.png")] h-screen pt-8  flex justify-between flex-col'
        style={{backgroundImage: `url(${LandingImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <img className='w-16 ml-8' src={UberLogo} alt="Uber Logo" />
            <div className='bg-white  pb-7 py-5 px-10'>
                <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
                <Link to='/userlogin'className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 '>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home