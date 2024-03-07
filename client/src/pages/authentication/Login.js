import React, { useEffect, useState } from 'react'

import '../../styles/login_and_registration.css'

import toast, { Toaster } from 'react-hot-toast'
import { 
  Box,
  Container,
  CssBaseline, 
  Grid, 
  IconButton, 
  InputAdornment, 
  OutlinedInput, 
  Paper, 
  TextField, 
  Typography
} from '@mui/material'

import { 
  Button,
  FormControl 
} from '@mui/base'

import { 
  Visibility, VisibilityOff 
} from '@mui/icons-material'

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
  useDotsContext, 
  validateUser
} from '../../context'

import Swal from 'sweetalert2'

import { 
  LoadingGear 
} from '../../assets/svg'

import * as IoIcons from 'react-icons/io'


function Login() {
  const navigate = useNavigate()
  const [loginCredentials, setLoginCredentials] = useState({email: '', password: ''})
  const [error, setError] = useState({ isError: false, errorMessage: '' })
  const [submit, setSubmit] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault()
    setSubmit(true)
    const res = await logInUser({email: loginCredentials.email, password: loginCredentials.password})
    console.log(res.data);
    if(res?.status === 200){
      setSubmit(false)
      // If user is Active
      if(res.data?.active === 1){
        // If user is verified
        if(res.data?.pending === 0){
          //If account is Temporary
          if(res.data?.temporary === 0 || res.data?.temporary === null){
            Swal.fire({
              icon:'success',
              text:'Logged In Successfully.',
              showCancelButton: false,
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              window.localStorage.setItem('isLoggedIn', true)
              window.localStorage.setItem('user', res.data?.token)
              window.localStorage.setItem('profile', JSON.stringify(res.data))
              navigate('/Dashboard')
            })
          }
          else{

          }
        }
        else
        {
          setError({ isError: true, errorMessage: 'This account is not yet approved.' })
        }
        
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  useEffect(() =>{
    document.title = "Login"

    async function validate(){
      const isLoggedIn = window.localStorage.getItem('isLoggedIn')
      const token = window.localStorage.getItem('user')
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
                document.cookie = `token=${token}; path=/`
                navigate('/Dashboard')
              })
              
            }else{
              window.localStorage.removeItem('isLoggedIn')
              window.localStorage.removeItem('user')
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
                    value={loginCredentials.password}
                    onChange={(e) => setLoginCredentials({...loginCredentials ,password: e.target.value})}/>
                  <div className="Icon" onClick={() => handleClickShowPassword("Password")}>
                    {showPassword.some(showPass => showPass.for === "Password") ? <IoIcons.IoMdEyeOff size={'25px'}/>: <IoIcons.IoMdEye size={'25px'}/>}
                  </div>
              </div>
            </div>
            {/* {isDisabled ? <Typography component="div" sx={{display: "flex", justifyContent: "center", alignItems: "center", color: "red"}}>
                {loginAttempts} Attempts failed. Please wait for {remainingTime}
            </Typography>: ""} */}
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
                disabled={submit}
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