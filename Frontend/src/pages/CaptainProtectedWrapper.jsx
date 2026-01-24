import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setCaptainData } = useContext(CaptainDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 1️⃣ No token → redirect
    if (!token) {
      navigate('/captainlogin')
      return
    }

    // 2️⃣ Fetch profile ONCE
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 200) {
          setCaptainData(response.data.data.captain) // ✅ correct path
          setIsLoading(false)
        }
      } catch (err) {
        console.error(err)
        localStorage.removeItem('token')
        navigate('/captainlogin')
      }
    }

    fetchProfile()
  }, [token, navigate, setCaptainData])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default CaptainProtectedWrapper
