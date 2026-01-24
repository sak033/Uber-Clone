import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setUserData } = useContext(UserDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/userlogin')
      return
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Cache-Control': 'no-cache', // 🔑 prevents 304 issues
            },
          }
        )

        // 200 OR 304 → user is authenticated
        if (response.status === 200 && response.data?.data?.user) {
          setUserData(response.data.data.user)
        }

        setIsLoading(false)

      } catch (error) {
        // only logout on real auth failure
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          navigate('/userlogin')
        } else {
          setIsLoading(false)
        }
      }
    }

    fetchProfile()
  }, [token, navigate, setUserData])

  if (isLoading) return <div>Loading...</div>

  return <>{children}</>
}

export default UserProtectedWrapper
