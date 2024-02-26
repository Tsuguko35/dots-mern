import React, { useState } from 'react'

import '../../styles/forgot_password.css'

import cictlogo from '../../assets/images/cict-logo.png'
import bulsuLogo from '../../assets/images/bulsuLogo.png'
import reset_password from '../../assets/images/reset_password.png'
import { FormControl, IconButton, InputAdornment, OutlinedInput, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as LuIcons from 'react-icons/lu'
import * as HiIcons from 'react-icons/hi'
import * as GoIcons from 'react-icons/go'
import * as MdIcons from 'react-icons/md'
import * as CiIcons from 'react-icons/ci'

import OtpInput from 'react-otp-input'
import { Timer } from '../../components';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Forgot_Password() {
    const navigate = useNavigate()
    const steps = [
        'Enter Email',
        'Verify OTP',
        'Reset Password',
        'Completed',
    ];

    const [activeStep, setActiveStep] = useState(0)
    const [otp, setOtp] = useState(0)
    const [startTimer, setStartTimer] = useState(false)

    const sendOTPCode = () => {
        setActiveStep(1)
        localStorage.removeItem('timerTime')
        setStartTimer(true)
    }

    const resendOTP = () => {
        localStorage.removeItem('timerTime')
        setStartTimer(true)
    }

    const verifyOTPCode = () => {
        localStorage.removeItem('timerTime')
        setActiveStep(2)
        setStartTimer(false)
    }

    const resetPassword = () => {
        setActiveStep(4)
    }

    const finishResetPass = () => {
        navigate('/')
    }

    // Hide Show Password
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

    return (
        <section id='Forgot_Password' className='Forgot_Password'>
            <div className="wrapper">
                <div className="Stepper_Holder">
                <Stepper className='Stepper' activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                </div>
                <div className="Forgot_Password_Container">
                    {activeStep === 0 && (
                        <div className="Back_Icon" onClick={() => navigate(-1)}>
                            <IoIcons.IoMdArrowRoundBack size={"20px"}/>
                            <p>Back</p>
                        </div>
                    )}
                    <div className="Forgot_Password_Logos">
                        <img src={bulsuLogo} alt="bulsuLogo" />
                        <img src={cictlogo} alt="cictLogo" />
                    </div>
                    <div className="Forgot_Password_Content">
                        {activeStep === 0 ? (
                            <React.Fragment>
                                <div className="Forgot_Password_Label">
                                    <div className="Main_Label">
                                        <p>Forgot Password</p>
                                    </div>
                                    <div className="Sub_Label">
                                        <p>Enter your email address. An OTP code will be sent to the email for the password reset.</p>
                                    </div>
                                </div>
                                <div className="Forgot_Password_Content_Inner">
                                    <div className="Forgot_Password_Input">
                                        <div className="Input_Group">
                                            <span className='Input_Label'>Email</span>
                                            <div className="Custom_Email">
                                                <input className='Input' type="email" placeholder='Email Address'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Forgot_Password_Button">
                                        <button onClick={() => sendOTPCode()}>Send OTP Code</button>
                                    </div>
                                </div>
                            </React.Fragment>
                            
                        )
                        :activeStep === 1 ?(
                            <React.Fragment>
                                <div className="Forgot_Password_Label">
                                    <div className="Main_Label">
                                        <p>Verify Email Address</p>
                                    </div>
                                    <div className="Sub_Label">
                                        <p>The OTP code has been sent to gmail_account@gmail.com. Enter the OTP code to proceed.</p>
                                    </div>
                                </div>
                                <div className="Forgot_Password_Content_Inner">
                                    <div className="Forgot_Password_Input">
                                        <p className="Label">6-digit code</p>
                                        <OtpInput
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
                                    <div className="Forgot_Password_Button">
                                        <button onClick={() => verifyOTPCode()}>Verify</button>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                        :activeStep === 2 ?(
                            <React.Fragment>
                                <div className="Forgot_Password_Label">
                                    <div className="Main_Label">
                                        <p>Reset Password</p>
                                    </div>
                                    <div className="Sub_Label">
                                        <p>The OTP code has been verified. You can now reset your password</p>
                                    </div>
                                </div>
                                <div className="Forgot_Password_Content_Inner">
                                    <div className="Forgot_Password_Input">
                                        <div className="Input_Group">
                                            <span className='Input_Label'>Password</span>
                                            <div className="Custom_Password">
                                                <input 
                                                    className='Input' 
                                                    type={showPassword.some(showPass => showPass.for === "Password") ? 'text': 'password'}
                                                    placeholder='Password' 
                                                    // onChange={(e) => setLoginCredentials({...loginCredentials ,password: e.target.value})}
                                                    />
                                                <div className="Icon" onClick={() => handleClickShowPassword("Password")}>
                                                    {showPassword.some(showPass => showPass.for === "Password") ? <IoIcons.IoMdEyeOff size={'25px'}/>: <IoIcons.IoMdEye size={'25px'}/>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Input_Group">
                                            <span className='Input_Label'>Confirm Password</span>
                                            <div className="Custom_Password">
                                                <input 
                                                    className='Input' 
                                                    type={showPassword.some(showPass => showPass.for === "Confirm Password") ? 'text': 'password'}
                                                    placeholder='Confirm Password' 
                                                    // onChange={(e) => setLoginCredentials({...loginCredentials ,password: e.target.value})}
                                                    />
                                                <div className="Icon" onClick={() => handleClickShowPassword("Confirm Password")}>
                                                    {showPassword.some(showPass => showPass.for === "Confirm Password") ? <IoIcons.IoMdEyeOff size={'25px'}/>: <IoIcons.IoMdEye size={'25px'}/>}
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    <div className="Forgot_Password_Button">
                                        <button onClick={() => resetPassword()}>Reset Password</button>
                                        <button className='Cancel' onClick={() => navigate(-1)}>Cancel</button>
                                    </div>
                                </div>
                            </React.Fragment> 
                        )
                        :activeStep === 4 &&(
                            <React.Fragment>
                                <div className="Forgot_Password_Label">
                                    <div className="Forgot_Password_Success_Icon">
                                        <img src={reset_password} alt="reset_Password_success" />
                                    </div>
                                    <div className="Main_Label">
                                        <p>Password has been reset successfully!</p>
                                    </div>
                                    <div className="Sub_Label">
                                        <p>You can now log in with the new password.</p>
                                    </div>
                                </div>
                                <div className="Forgot_Password_Content_Inner">
                                    <div className="Forgot_Password_Input">
                                    </div>
                                    <div className="Forgot_Password_Button">
                                        <button onClick={() => finishResetPass()}>Go to Login</button>
                                    </div>
                                </div>
                            </React.Fragment> 
                        )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Forgot_Password