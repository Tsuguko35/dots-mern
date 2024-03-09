import React, { useEffect, useState } from 'react'

import '../../styles/staffOnboarding.css'

import cictlogo from '../../assets/images/cict-logo.png'
import bulsuLogo from '../../assets/images/bulsuLogo.png'
import finish_setup from '../../assets/images/finish_setup.png'
import { useNavigate } from 'react-router-dom';

// Icons

import * as IoIcons from 'react-icons/io'

import OtpInput from 'react-otp-input'
import { Timer } from '../../components';
import { logOutUser } from '../../context'
import { otpRequest, otpVerify} from '../../utils'
import toast from 'react-hot-toast'
import { FinishStaffSetup } from '../../context/action'

function StaffOnboarding() {
    const navigate = useNavigate()
    const steps = [
        'Enter Email',
        'Verify OTP',
        'Reset Password',
        'Completed',
    ];

    const [activeStep, setActiveStep] = useState(0)
    const [otp, setOtp] = useState(0)
    const [user, setUser] = useState(null)
    const [error, setError] = useState({ isError: false, errorMessage: '' })
    const [startTimer, setStartTimer] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [accountDetails, setAccountDetails] = useState({
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
    })

    const getUser = () => {
        setUser(JSON.parse(localStorage.getItem('profile')))
        redirectUser()
    }

    const redirectUser = () => {
        if(user){
            if(user.status === 'Temporary'){
                if(activeStep === 0){
                    sendOTPCode()
                }
            }
            else if(user.status !== 'Temporary'){
                navigate('/Dashboard')
            }
        }
    }

    const isAnyFieldEmpty = (accountDetails) => {
        for (let key in accountDetails) {
            if (accountDetails.hasOwnProperty(key) && accountDetails[key] === '') {
                return true; // Found an empty field
            }
        }
        return false; // No empty fields found
    }

    const sendOTPCode = async() => {
        setError({ isError: false, errorMessage: '' })
        localStorage.removeItem('timerTime')
        setStartTimer(true)

        //Send OTP
        const otpRes = await otpRequest({ action: "Account setup", receiver: user.email })

        if(otpRes?.status === 400){
            setError({ isError: true, errorMessage: 'An error has occured while sending the Otp' })
        }
    }

    const resendOTP = async() => {
        setError({ isError: false, errorMessage: '' })
    
        //Reset Timer
        localStorage.removeItem('timerTime')
        setStartTimer(true)
        
        const otpRes = await otpRequest({ action: "Registration", receiver: user.email })
    
        if(otpRes?.status === 400){
            setError({ isError: true, errorMessage: 'An error has occured while sending the Otp' })
        }
    }

    const verifyOTPCode = async() => {
        setError({ isError: false, errorMessage: '' })
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
                setActiveStep(1)
            }
            else if(verifyOtpRes?.status === 400){
                setError({ isError: true, errorMessage: verifyOtpRes?.errorMessage })
            }
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

    useEffect(() =>{
        document.title = "Finish Account Setup"
        getUser()
    }, [])

    //Log out User
    const logout = async() => {
        const res = await logOutUser()
        if(res?.status === 200){
            navigate('/')
        }

        if(res?.status === 400){
            toast.error(res.data?.errorMessage)
        }
    }

    const handleFinishSetup = async() => {
        setError({isError: false, errorMessage: ''})

        if(isAnyFieldEmpty(accountDetails)){
            setError({isError: true, errorMessage: 'All fields must be filled up.'})
        }
        else{
            if(accountDetails.password !== accountDetails.confirmPassword){
                setError({isError: true, errorMessage: 'Passwords do not match.'})
            }
            else if(accountDetails.password.length < 6){
                setError({ isError: true, errorMessage: 'Password must be 6 to 30 characters long' })
            }
            else{
                const res = await FinishStaffSetup({ user_id: user.user_id, full_Name: `${accountDetails.firstName} ${accountDetails.lastName}`, password: accountDetails.password })

                if(res?.status === 200){
                    setActiveStep(2)
                }
                else{
                    setError({ isError: true, errorMessage: res?.errorMessage })
                }
            }
        }
    }

    return (
        <section id='Staff_Onboarding' className='Forgot_Password'>
            <div className="wrapper">
                <div className="Stepper_Holder">
                </div>
                <div className="Forgot_Password_Container">
                    {activeStep === 0 && (
                        <div className="Back_Icon" onClick={() => logout()}>
                            <IoIcons.IoMdArrowRoundBack size={"20px"}/>
                            <p>Back</p>
                        </div>
                    )}
                    <div className="Forgot_Password_Logos">
                        <img src={bulsuLogo} alt="bulsuLogo" />
                        <img src={cictlogo} alt="cictLogo" />
                    </div>
                    <div className="Forgot_Password_Content">
                        {activeStep === 0 ?(
                            <React.Fragment>
                                <div className="Forgot_Password_Label">
                                    <div className="Main_Label">
                                        <p>Finish Account Setup</p>
                                    </div>
                                    <div className="Sub_Label">
                                        <p>Enter the OTP code sent to {user && user.email}. Enter</p>
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
                                    {error.isError && (
                                        <div className="errorMessage">
                                            <p>{error.errorMessage}</p>
                                        </div>
                                    )}
                                    <div className="Forgot_Password_Button">
                                        <button onClick={() => verifyOTPCode()}>Verify</button>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                        :activeStep === 1 ?(
                            <React.Fragment>
                                <div className="Forgot_Password_Label">
                                    <div className="Main_Label">
                                        <p>Account Details</p>
                                    </div>
                                    <div className="Sub_Label">
                                        <p>The OTP code has been verified. You can now finish the account set up.</p>
                                    </div>
                                </div>
                                <div className="Forgot_Password_Content_Inner">
                                    <div className="Forgot_Password_Input">
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
                                                    value={accountDetails.firstName}
                                                    onChange={(e) => setAccountDetails({...accountDetails, firstName: e.target.value})}/>
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
                                                    value={accountDetails.lastName}
                                                    onChange={(e) => setAccountDetails({...accountDetails, lastName: e.target.value})}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Input_Group">
                                            <span className='Input_Label'>Password</span>
                                            <div className={!error.isError ? "Custom_Password" : "Custom_Password error"}>
                                                <input 
                                                    className='Input'
                                                    disabled={submit}
                                                    type={showPassword.some(showPass => showPass.for === "Password") ? 'text': 'password'}
                                                    placeholder='Password'
                                                    maxLength={30}
                                                    value={accountDetails.password}
                                                    onChange={(e) => setAccountDetails({...accountDetails, password: e.target.value})}
                                                    />
                                                <div className="Icon" onClick={() => handleClickShowPassword("Password")}>
                                                    {showPassword.some(showPass => showPass.for === "Password") ? <IoIcons.IoMdEyeOff size={'25px'}/>: <IoIcons.IoMdEye size={'25px'}/>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Input_Group">
                                            <span className='Input_Label'>Confirm Password</span>
                                            <div className={!error.isError ? "Custom_Password" : "Custom_Password error"}>
                                                <input 
                                                    className='Input'
                                                    disabled={submit}
                                                    type={showPassword.some(showPass => showPass.for === "Confirm Password") ? 'text': 'password'}
                                                    placeholder='Confirm Password'
                                                    maxLength={30}
                                                    value={accountDetails.confirmPassword}
                                                    onChange={(e) => setAccountDetails({...accountDetails, confirmPassword: e.target.value})}
                                                    />
                                                <div className="Icon" onClick={() => handleClickShowPassword("Confirm Password")}>
                                                    {showPassword.some(showPass => showPass.for === "Confirm Password") ? <IoIcons.IoMdEyeOff size={'25px'}/>: <IoIcons.IoMdEye size={'25px'}/>}
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    {error.isError && (
                                        <div className="errorMessage">
                                            <p>{error.errorMessage}</p>
                                        </div>
                                    )}
                                    <div className="Forgot_Password_Button">
                                        <button onClick={() => handleFinishSetup()}>Finish Setup</button>
                                        <button className='Cancel' onClick={() => logout()}>Cancel</button>
                                    </div>
                                </div>
                            </React.Fragment> 
                        )
                        :activeStep === 2 &&(
                            <React.Fragment>
                                <div className="Forgot_Password_Label">
                                    <div className="Forgot_Password_Success_Icon">
                                        <img src={finish_setup} alt="reset_Password_success" />
                                    </div>
                                    <div className="Main_Label">
                                        <p>Account setup successfully finished!</p>
                                    </div>
                                    <div className="Sub_Label">
                                        <p>You can now log in with the new password.</p>
                                    </div>
                                </div>
                                <div className="Forgot_Password_Content_Inner">
                                    <div className="Forgot_Password_Input">
                                    </div>
                                    <div className="Forgot_Password_Button">
                                        <button onClick={() => logout()}>Go to Login</button>
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

export default StaffOnboarding