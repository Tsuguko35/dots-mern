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
  RegisterUser,
  isEmailRegistered,
  validateUser
} from '../../context'

import Swal from 'sweetalert2'

import { 
  LoadingGear 
} from '../../assets/svg'

import * as IoIcons from 'react-icons/io'
import { otpRequest, otpVerify } from '../../utils'
import OTPInput from 'react-otp-input'

import { Timer } from '../../components'
import { NotificationContext } from '../../context/context'


function Registration() {
  const navigate = useNavigate()
  const [loginCredentials, setLoginCredentials] = useState({email: '', password: '', confirmPassword: '', firstName: '', lastName: ''})
  const [error, setError] = useState({ isError: false, errorMessage: '' })
  const [showOtpInputs, setShowOtpInputs] = useState(false)
  const [otp, setOtp] = useState(0)
  const [startTimer, setStartTimer] = useState(false)
  const [submit, setSubmit] = useState(false)

  const {
    user,
    setUser
  } = useContext(NotificationContext)

  const handleOTP = async(e) => {
    setError({ isError: false, errorMessage: '' })
    e.preventDefault()
    setSubmit(true)

    if(loginCredentials.password !== loginCredentials.confirmPassword){
      setSubmit(false)
      setLoginCredentials({...loginCredentials, confirmPassword: ''})
      setError({ isError: true, errorMessage:'Passwords do not match' })
    }
    else if(loginCredentials.password.length < 6){
      setSubmit(false)
      setError({ isError: true, errorMessage:'Password must be 6 to 30 characters long.' })
    }
    else if(!loginCredentials.email.endsWith('@bulsu.edu.ph')){
      setSubmit(false)
      setError({ isError: true, errorMessage:'Please use a BulSU email' })
    }
    else{
      const isEmailRegisteredRes = await isEmailRegistered({email: loginCredentials.email})

      if(isEmailRegisteredRes){
        if(isEmailRegisteredRes.status === 200){
          setSubmit(false)
          const data = isEmailRegisteredRes.data

          localStorage.removeItem('timerTime')
          setStartTimer(true)
          setShowOtpInputs(true)
          setError({ isError: false, errorMessage: '' })

          if(data.exist === true){
            setError({ isError: true, errorMessage: 'This email is already registered in the system' })
          }
          else if(data.exist === false){
            
            const otpRes = await otpRequest({ action: "Registration", receiver: loginCredentials.email })

            if(otpRes?.status === 200){
              
            }
            else if(otpRes?.status === 400){
              setSubmit(false)
              setError({ isError: true, errorMessage: 'An error has occured while sending the Otp' })
            }
          }
        }
        else if(isEmailRegisteredRes.status === 400){
          setSubmit(false)
          toast.error("An unexpected error has occured.")
        }
      }
    }
  
  }

  const resendOTP = async() => {
    setError({ isError: false, errorMessage: '' })

    //Reset Timer
    localStorage.removeItem('timerTime')
    setStartTimer(true)
    
    const otpRes = await otpRequest({ action: "Registration", receiver: loginCredentials.email })

    if(otpRes?.status === 400){
      setSubmit(false)
      setError({ isError: true, errorMessage: 'An error has occured while sending the Otp' })
    }
  }

  const verifyOTPCode = async(e) => {
    setError({ isError: false, errorMessage: '' })
    e.preventDefault()

    //Reset Timer
    localStorage.removeItem('timerTime')
    setStartTimer(false)

    //If OPT Input is empty or not complete
    if(otp.toString().length !== 6){
      setError({ isError: true, errorMessage: 'Invalid OTP code.' })
    }
    else{
      const verifyOtpRes = await otpVerify({ otpCode: otp })

      if(verifyOtpRes?.status === 200){
        handleRegister()
      }
      else if(verifyOtpRes?.status === 400){
        setSubmit(false)
        setError({ isError: true, errorMessage: verifyOtpRes?.errorMessage })
      }
    }
    
  }

  const handleRegister = () => {
    Swal.fire({
      title: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen:async() => {
        Swal.showLoading()
        const registerRes = await RegisterUser({ email: loginCredentials.email, password: loginCredentials.password, fullName: `${loginCredentials.firstName} ${loginCredentials.lastName}` })

        if(registerRes?.status === 200){
          if(registerRes?.data.success === true){
            Swal.fire({
              icon:'success',
              text:'Successfully Registered. Admins will now review your account.',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonColor: '#3A3535',
              allowEscapeKey: false,
              allowOutsideClick: false,
            }).then(() => {
              navigate('/Login')
            })
            
          }
        }
        else if(registerRes?.status === 400){
          Swal.close()
          setError({ isError: true, errorMessage: registerRes?.errorMessage })
        }
      }
    })
    
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
    document.title = "Registration"

    async function validate(){
      const isLoggedIn = window.localStorage.getItem('isLoggedIn')
      const token = window.localStorage.getItem('user')
      const user = window.localStorage.getItem('profile')
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
                setUser(res?.data)
                document.cookie = `token=${token}; path=/`
                if(user.status === 'Temporary'){
                  navigate('/Finish-Setup')
                }
                else{
                  navigate('/Dashboard')
                }
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
            <p>Document Tracking & Document Archiving</p>
          </div>
        </div>
        {/* Login Form */}
        <div className="form_wrapper">
          <div className='login_form'>
            <div className="login_and_registration_logos">
              <img src={bulsuLogo} alt="bulsuLogo" />
              <img src={cictlogo} alt="cictLogo" />
            </div>
            <div className="login_and_registration_header">
              <h3>Sign up</h3>
              <p>Enter your credentials below to create an account.</p>
            </div>
            {!showOtpInputs ? (
              <form id='credentials' onSubmit={handleOTP}>
                <div className="Name_Group">
                  <div className="Input_Group">
                    <span className='Input_Label'>First Name</span>
                    <div className={!error.isError ? "Custom_Email" : "Custom_Email error"}>
                        <input 
                          disabled={submit}
                          className='Input' 
                          required
                          maxLength={30}
                          type="text" 
                          placeholder='First Name' 
                          value={loginCredentials.firstName}
                          onChange={(e) => setLoginCredentials({...loginCredentials, firstName: e.target.value})}/>
                    </div>
                  </div>
                  <div className="Input_Group">
                  <span className='Input_Label'>Last Name</span>
                    <div className={!error.isError ? "Custom_Email" : "Custom_Email error"}>
                        <input 
                          disabled={submit}
                          className='Input' 
                          required
                          maxLength={30}
                          type="text" 
                          placeholder='Last Name' 
                          value={loginCredentials.lastName}
                          onChange={(e) => setLoginCredentials({...loginCredentials, lastName: e.target.value})}/>
                    </div>
                  </div>
                </div>
                <div className="Input_Group">
                  <span className='Input_Label'>Email</span>
                  <div className={!error.isError ? "Custom_Email" : "Custom_Email error"}>
                      <input 
                        disabled={submit}
                        className='Input' 
                        required
                        maxLength={100}
                        type="email" 
                        placeholder='Email Address' 
                        value={loginCredentials.email}
                        onChange={(e) => setLoginCredentials({...loginCredentials ,email: e.target.value})}/>
                  </div>
                </div>
                <div className="Input_Group">
                  <span className='Input_Label'>Password</span>
                  <div className={!error.isError ? "Custom_Password" : "Custom_Password error"}>
                      <input 
                        disabled={submit}
                        required
                        maxLength={30}
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
                <div className="Input_Group">
                  <span className='Input_Label'>Confirm Password</span>
                  <div className={!error.isError ? "Custom_Password" : "Custom_Password error"}>
                      <input 
                        disabled={submit}
                        className='Input'
                        required
                        maxLength={30}
                        type={showPassword.some(showPass => showPass.for === "Confirm Password") ? 'text': 'password'}
                        placeholder='Confirm Password' 
                        value={loginCredentials.confirmPassword}
                        onChange={(e) => setLoginCredentials({...loginCredentials , confirmPassword: e.target.value})}/>
                      <div className="Icon" onClick={() => handleClickShowPassword("Confirm Password")}>
                        {showPassword.some(showPass => showPass.for === "Confirm Password") ? <IoIcons.IoMdEyeOff size={'25px'}/>: <IoIcons.IoMdEye size={'25px'}/>}
                      </div>
                  </div>
                </div>
              </form>
            )
            :(
              <form id='otp' onSubmit={verifyOTPCode}>
                  <div className="Forgot_Password_Content_Inner">
                      <div className="Forgot_Password_Input">
                          <p className="Label">6-digit code</p>
                          <OTPInput
                              containerStyle={'OtpInput_Container'}
                              inputStyle={'OtpInput_Input'}
                              value={otp}
                              onChange={setOtp}
                              numInputs={6}
                              renderSeparator={<span></span>}
                              renderInput={(props) => <input {...props} />}
                          />
                          <p className='Resend'>Didn't get the code? {startTimer ? (<span>Resend in <Timer initialTime={60} onTimeout={() => setStartTimer(false)} /> seconds</span>) : (<span onClick={() => resendOTP()}>Resend it</span>)}</p>
                      </div>
                  </div>
                </form>
            )
            }
            
            {error.isError && (
              <div className="errorMessage">
                <p>{error.errorMessage}</p>
              </div>
            )}
            
            {!showOtpInputs ? (
              <Button
                disabled={submit}
                form='credentials'
                type='submit'
                variant="contained"
                className='login_button'
                style={{ backgroundColor: submit && '#e0853b' }}
              >
                  {submit ? <LoadingGear width='40px' height='40px'/> : 'Send Otp'}
              </Button>
            )
            :(
              <Button
                disabled={submit}
                variant="contained"
                form='otp'
                type='submit'
                className='login_button'
                style={{ backgroundColor: submit && '#e0853b' }}
              >
                  {submit ? <LoadingGear width='40px' height='40px'/> : 'Verify Otp'}
              </Button>
            )
            }
            
            <Box sx={{width: '100%', display: 'flex', justifyContent: "center", alignItems: "center"}} >
              <Typography sx={{color:  "#212121"}} className='signUp_Login_toggle'>
                Already have an account?&nbsp; 
              </Typography>
              <Link to={"/Login"} variant="body2" sx={{cursor: "pointer", "&:hover" : {color: "#FF647F"}, transition: "150ms"}} className='signUp_Login_toggle'>
                  Sign In
              </Link>
            </Box>
          </div>
        </div>
        
      </div>
      
      
    </section>
  )
}

export default Registration