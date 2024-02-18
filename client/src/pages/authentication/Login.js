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


function Login() {
  const navigate = useNavigate()
  const [loginCredentials, setLoginCredentials] = useState({email: '', password: ''})
  const [error, setError] = useState({ isError: false, errorMessage: '' })
  const [submit, setSubmit] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault()
    setSubmit(true)
    const res = await logInUser({email: loginCredentials.email, password: loginCredentials.password})
    

    if(res?.status === 200){
      setSubmit(false)
      // If user is Active
      if(res.data?.active === 1){
        // If user is verified
        if(res.data?.verified === 1){
          //If account is Temporary
          if(res.data?.temporary === 0 || res.data?.temporary === null){
            console.log(true);
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
          Swal.fire({
            text:'This account has yet to be verified.',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Ok, close',
            confirmButtonColor: '#FF9944'
          })
        }
        
      }
      else{
        Swal.fire({
          text:'This account has been deactivated.',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Ok, close',
          confirmButtonColor: '#FF9944'
        })
      }
      
    }

    if(res?.status === 400){
      setSubmit(false)
      setError({ isError: 'true', errorMessage: res.errorMessage })
      setLoginCredentials({ ...loginCredentials, password: '' })
    }

  }


  // Hide Show Password
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

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
            <p>In publishing and graphic design, Lorem ipsum is a placeholder</p>
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
            <FormControl variant="outlined" className='login_registration_password'>
              <Typography sx={{fontWeight: '300', color: "#888", display: 'flex', width: "100%", justifyContent: 'start', fontSize: "0.8rem"}}>
              Email
              </Typography>
              <TextField 
                  error={error.isError}
                  type='email'
                  onChange={(e) => setLoginCredentials({...loginCredentials ,email: e.target.value})}
                  disabled={submit}
                  required
                  sx={{width: '100%'}}
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
              />
            </FormControl>
            <FormControl variant="outlined" className='login_registration_password'>
              <Typography sx={{fontWeight: '300', color: "#888", display: 'flex', width: "100%", justifyContent: 'start', fontSize: "0.8rem"}}>
              Password
              </Typography>
              <OutlinedInput
                error={error.isError}
                sx={{width: "100%"}}
                disabled={submit}
                onChange={(e) => setLoginCredentials({...loginCredentials ,password: e.target.value})}
                id="outlined-adornment-password"
                required
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {/* {isDisabled ? <Typography component="div" sx={{display: "flex", justifyContent: "center", alignItems: "center", color: "red"}}>
                {loginAttempts} Attempts failed. Please wait for {remainingTime}
            </Typography>: ""} */}
            {error.isError && (
              <Typography sx={{display: "flex", justifyContent: "center", alignItems: "center", color: "red", marginTop: "20px"}}>
                {error.errorMessage}
              </Typography>
            )}
            <Box sx={{width: "100%", display: 'flex', justifyContent: 'right', mt: '10px'}}>
              <Link variant="body2" onClick={undefined} className='signUp_Login_toggle'>
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