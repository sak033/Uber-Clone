import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_API_URL}/captains/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } catch (error) {
        console.error(error)
      } finally {
        localStorage.removeItem('token')
        navigate('/captainlogin')
      }
    }

    logout()
  }, [navigate, token])

  return <div>Logging out...</div>
}

export default CaptainLogout
