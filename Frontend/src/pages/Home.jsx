import React, { useRef, useState } from 'react'
import UberLogo from '../assets/logo-uber.png'
import UberMap from '../assets/Uber_Map.png'
import DownArrow from '../assets/arrow-down-s-line.svg'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel'
import Car from '../assets/Car.png'
import Auto from '../assets/Auto.png'
import Bike from '../assets/bike.png'



const Home = () => {
  const [pickup, setPickup]=useState('')
  const [destination, setDestination]=useState('')
  const [panelOpen, setPanelOpen]=useState(false)
  const panelRef= useRef(null)
  const panelCloseRef=useRef(null)
  

  const submitHandler=(e)=>{
  e.preventDefault()
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
      height: '70%',
      padding:20
      
    })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }
    else{
      gsap.to(panelRef.current,{
      height: '0%',
      padding:0
    })
    gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  },[panelOpen])



  return (
    <div className='h-screen relative'>
        <img className='w-16 absolute letf-5 top-5' src={UberLogo} alt="uberlogo" />

        <div className='h-sceen w-sceen'>
          <img className='h-full w-full object-cover' src={UberMap} alt="" />
        </div>

        <div className=' flex flex-col justify-end absolute h-screen top-0  w-full'>
          
          <div className=' bg-white relative h-[30%] p-6'>
            <h5
            ref={panelCloseRef}  
            onClick={()=>{
              setPanelOpen(false)
            }}
            className='absolute opacity-0 right-6 top-6 text-2xl '>
              <i className='ri-arrow-down-wide-line'></i>
            </h5>
            <h4 className='text-2xl font-semibold'>Find a Trip</h4>
            <form onSubmit={(e)=>{
              submitHandler(e)
            }} >

              <div className='line absolute h-16 w-1 top-[40%] left-10 bg-gray-900 rounded-full '></div>
            <input
            onClick={()=>{
              setPanelOpen(true)
            }}
            value={pickup}
            onChange={(e)=>{setPickup(e.target.value)}}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Add a pickup location' />
            <input 
            onClick={()=>{
              setPanelOpen(true)
            }}
            value={destination}
            onChange={(e)=>{setDestination(e.target.value)}}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' type="text " placeholder='Enter your destination' />
          </form>
          </div>

          <div ref={panelRef} className='h-0  bg-white '>
             <LocationSearchPannel/>
          </div>
        </div>

        <div className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6'>
          <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
          <div className='flex w-full border-2 mb-2 active:border-black  rounded-xl items-center justify-between p-3'>
            <img className='h-15' src={Car} alt="" />
            <div className=' ml-2 w-1/2'>
              <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'>4</i></span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-xl text-xs text-gray-600'>Affordable, compact rides</p>
              </div>
            <h2 className='text-lg font-semibold'>₹193.20</h2>
          </div>

          <div className='flex w-full border-2 mb-2 active:border-black rounded-xl items-center justify-between p-3'>
            <img className='h-15' src={Auto} alt="" />
            <div className='  w-1/2'>
              <h4 className='font-medium text-base'>UberAuto <span><i className='ri-user-3-fill'>3</i></span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-xl text-xs text-gray-600'>Affordable, Auto rides</p>
              </div>
            <h2 className='text-lg font-semibold'>₹100.20</h2>
          </div>

          <div className='flex w-full border-2 mb-2 active:border-black  rounded-xl items-center justify-between p-3'>
            <img className='h-15' src={Bike} alt="" />
            <div className='mr-5 w-1/2'>
              <h4 className='font-medium text-base'>Moto <span><i className='ri-user-3-fill'>1</i></span></h4>
              <h5 className='font-medium text-sm'>3 mins away</h5>
              <p className='font-xl text-xs text-gray-600'>Affordable, motorcycle rides</p>
              </div>
            <h2 className='text-lg font-semibold'>₹65</h2>
          </div>
        </div>
    </div>
  )
}

export default Home