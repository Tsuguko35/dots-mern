import React, { useContext, useEffect, useState } from 'react'

import '../../styles/login_and_registration.css'

import toast, { Toaster } from 'react-hot-toast'
import { 
  Box,
  Typography
} from '@mui/material'

import { 
  Button,
} from '@mui/base'

import { 
  Link, useNavigate 
} from 'react-router-dom'

import cictlogo from '../../assets/images/cict-logo.png'
import bulsuLogo from '../../assets/images/bulsuLogo.png'
import dotsIllustration from '../../assets/images/dotsIllustration.png'

import { 
  Typewriter
} from 'react-simple-typewriter'

import { 
  logInUser, 
  validateUser
} from '../../context'

import Swal from 'sweetalert2'

import { 
  LoadingGear 
} from '../../assets/svg'

import * as IoIcons from 'react-icons/io'
import { NotificationContext } from '../../context/context'
import { Timer } from '../../components'


function Login() {
  const navigate = useNavigate()
  const [loginCredentials, setLoginCredentials] = useState({email: '', password: ''})
  const [error, setError] = useState({ isError: false, errorMessage: '' })
  const [submit, setSubmit] = useState(false)
  const [maxAttempts, setMaxAttempts] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(parseInt(localStorage.getItem('loginAttemptCount')) || 0)

  const {
    setUser
  } = useContext(NotificationContext)

  const handleSubmit = async(e) => {
    e.preventDefault()
    addLoginAttempt()
    setSubmit(true)
    const res = await logInUser({email: loginCredentials.email, password: loginCredentials.password})
    if(res?.status === 200){
      setSubmit(false)
      // If user is Active
      if(res.data?.status === 'Active'){
        Swal.fire({
          icon:'success',
          text:'Logged In Successfully.',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          setUser(res?.data)
          window.localStorage.setItem('isLoggedIn', true)
          window.localStorage.setItem('dotsUser', res.data?.token)
          window.localStorage.setItem('profile', JSON.stringify(res.data))
          navigate('/Dashboard')
        })
      }
      // If user is verified
      else if(res.data?.status === 'Pending'){
        setError({ isError: true, errorMessage: 'This account is not yet approved.' })
      }
      else if(res.data?.status === 'Temporary'){
        Swal.fire({
          icon:'success',
          text:'Logged In Successfully.',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          window.localStorage.setItem('isLoggedIn', true)
          window.localStorage.setItem('dotsUser', res.data?.token)
          window.localStorage.setItem('profile', JSON.stringify(res.data))
          navigate('/Finish-Setup')
        })
      }
      else{
          setError({ isError: true, errorMessage: 'This account is deactivated.' })
      }
    }

    if(res?.status === 400){
      setSubmit(false)
      setError({ isError: true, errorMessage: res.errorMessage })
      setLoginCredentials({ ...loginCredentials, password: '' })
    }

  }

  const getAttemptCount = () => {
    const count = localStorage.getItem('loginAttemptCount');
    return count ? parseInt(count) : 0;
  };
  
  const addLoginAttempt = () => {
    const count = getAttemptCount() + 1;
    setLoginAttempts(count)
    localStorage.setItem('loginAttemptCount', count);
  }

  useEffect(() => {
    if(loginAttempts === 5){
      setMaxAttempts(true)
    }
  }, [loginAttempts])

  const resetAttempts = () => {
    setLoginAttempts(0)
    setMaxAttempts(false)
    localStorage.removeItem('timerTime')
    localStorage.removeItem('loginAttemptCount')
  }


  // Hide Show Password
  const [showPassword, setShowPassword] = useState([{ show: false, for: ''}])

  const handleClickShowPassword = (props) =>  {
    if(showPassword.some(showPass => showPass.for === props)){
      setShowPassword(prev => prev.filter(showPass => showPass.for !== props));
    }
    else{
      setShowPassword(prev => [ ...prev, { show: true, for: props }])
    }
    
  }

  useEffect(() =>{
    document.title = "Login"

    async function validate(){
      const isLoggedIn = window.localStorage.getItem('isLoggedIn')
      const token = window.localStorage.getItem('dotsUser')
      const user = JSON.parse(window.localStorage.getItem('profile'))
      Swal.fire({
        title: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen:async() => {
          Swal.showLoading()
          if(isLoggedIn){
            const res = await validateUser({token})
            if(res?.status === 200){
              Swal.fire({
                icon:'success',
                text:'Logged In Successfully.',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1000
              }).then(() => {
                //Clear login Attempts
                setLoginAttempts(0)
                setMaxAttempts(false)
                localStorage.removeItem('timerTime')
                localStorage.removeItem('loginAttemptCount')


                setUser(res?.data)
                document.cookie = `token=${token}; path=/`
                if(user.status === 'Temporary'){
                  navigate('/Finish-Setup')
                }
                else{
                  navigate('/Dashboard')
                }
              })
              
            }else{
              window.localStorage.removeItem('isLoggedIn')
              window.localStorage.removeItem('dotsUser')
              window.localStorage.removeItem('profile')
              window.localStorage.removeItem('username')
              window.localStorage.removeItem('email')
              window.localStorage.removeItem('profilePic')
              Swal.close()
              document.cookie = 'token=; Max-Age=0; secure'
            }
          }
          else {
            Swal.close()
            document.cookie = 'token=; Max-Age=0; secure'
          }
        }
      })
      

      
      
    }

    validate()
  }, [])

  return (
    <section id='login_and_registration' className='login_and_registration'>
      <Toaster position="bottom-center"/>
      <div className="wrapper">
        <div className="side_illustration">
          <img src={dotsIllustration} alt="" />
          <div className="side_illustration_labels">
            <h1>Dean's Office Transaction System</h1>
            <p>Document Tracking & Document Archiving</p>
          </div>
        </div>
        {/* Login Form */}
        <div className="form_wrapper">
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} className='login_form'>
            <div className="login_and_registration_logos">
              <img src={bulsuLogo} alt="bulsuLogo" />
              <img src={cictlogo} alt="cictLogo" />
            </div>
            <div className="login_and_registration_header">
              <h3>Hello! Welcome, <span><Typewriter words={['Dean', 'Secretary', 'Clerk', 'Student Assistant', 'Faculty']} typeSpeed={20} loop deleteSpeed={20}/></span></h3>
              <p>Enter your credentials below to sign in to your account.</p>
            </div>
            <div className="Input_Group">
              <span className='Input_Label'>Email</span>
              <div className={!error.isError ? "Custom_Email" : "Custom_Email error"}>
                  <input 
                    className='Input' 
                    type="email" 
                    disabled={submit || maxAttempts}
                    autoComplete='true' 
                    placeholder='Email Address' 
                    value={loginCredentials.email}
                    onChange={(e) => setLoginCredentials({...loginCredentials ,email: e.target.value})}/>
              </div>
            </div>
            <div className="Input_Group">
              <span className='Input_Label'>Password</span>
              <div className={!error.isError ? "Custom_Password" : "Custom_Password error"}>
                  <input 
                    className='Input' 
                    type={showPassword.some(showPass => showPass.for === "Password") ? 'text': 'password'}
                    placeholder='Password'
                    disabled={submit || maxAttempts}
                    value={loginCredentials.password}
                    onChange={(e) => setLoginCredentials({...loginCredentials ,password: e.target.value})}/>
                  <div className="Icon" onClick={() => handleClickShowPassword("Password")}>
                    {showPassword.some(showPass => showPass.for === "Password") ? <IoIcons.IoMdEyeOff size={'25px'}/>: <IoIcons.IoMdEye size={'25px'}/>}
                  </div>
              </div>
            </div>
            {maxAttempts && (
              <div className="Login_Timer">
                <p>Too many attempts. Please wait for <span><Timer initialTime={60} onTimeout={resetAttempts}/> second/s.</span></p>
              </div>
            )}
            {error.isError && (
              <div className="errorMessage">
                <p>{error.errorMessage}</p>
              </div>
            )}
            
            <Box sx={{width: "100%", display: 'flex', justifyContent: 'right', mt: '10px'}}>
              <Link to={`/Reset-Password`} variant="body2" onClick={undefined} className='signUp_Login_toggle'>
                    Forgot password?
              </Link>
            </Box>
            
            <Button
                disabled={submit || maxAttempts}
                type="submit"
                variant="contained"
                className='login_button'
                style={{ backgroundColor: submit && '#e0853b' }}
            >
                {submit ? <LoadingGear width='40px' height='40px'/> : 'Sign In'}
            </Button>
            <Box sx={{width: '100%', display: 'flex', justifyContent: "center", alignItems: "center"}} >
              <Typography sx={{color:  "#212121"}} className='signUp_Login_toggle'>
                Don't have an account?&nbsp; 
              </Typography>
              <Link to={"/Registration"} variant="body2" sx={{cursor: "pointer", "&:hover" : {color: "#FF647F"}, transition: "150ms"}} className='signUp_Login_toggle'>
                  Sign Up
              </Link>
            </Box>
          </Box>
        </div>
        
      </div>
      
      
    </section>
  )
}

export default Login