import React, { useEffect } from 'react'
import '../../styles/dashboard.css'
import { logOutUser } from '../../context'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function Dashboard() {
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Dashboard'

    
  }, [])

  const logout = async() => {
    const res = await logOutUser()
    if(res?.status === 200){
      document.cookie = 'token=; Max-Age=0; secure'
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('profile')
      window.localStorage.removeItem('isLoggedIn')
      navigate('/')
    }

    if(res?.status === 400){
      toast.error(res.data?.errorMessage)
    }
  }


  return (
    <section id='Dashboard' className='Dashboard'>
      <div className="wrapper">
        <Toaster position="bottom-center" />
          <p>Dashboard</p>
        <button onClick={(e) => logout()}>Logout</button>
      </div>
    </section>
  )
}

export default Dashboard