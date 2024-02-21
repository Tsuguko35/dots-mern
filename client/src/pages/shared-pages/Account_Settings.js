import React, { useEffect, useState } from 'react'
import { PageHeader, Timer } from '../../components'
import '../../styles/account_settings.css'
import { 
    Avatar,
    TextField 
} from '@mui/material'

import OtpInput from 'react-otp-input'

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


function Account_Settings() {
    const [showSetting, setShowSetting] = useState('account')
    const [requestOtp, setRequestOtp] = useState(false)
    const [showTimer, setShowTimer] = useState(true)
    const [otp, setOtp] = useState('')

    useEffect(() => {
        document.title = `Account Settings`
    }, [])

    const resendOtpCode = () => {
        setShowTimer(true)
    }

    // Handle change
    const handleOtpChange = (otp) => setOtp(otp)

    
    return (
        <section id='Account_Settings' className='Account_Settings'>
            <div className="wrapper">
                <PageHeader page={"Account Settings"} />
                <div className="Settings_Container">
                    <div className="Left-Side">
                        <div className="Profile_Pic">
                            <Avatar className='Pic'>M</Avatar>
                            <div className="Pic_Change_Holder">
                                <div className="Pic_Change">
                                    <CiIcons.CiImageOn size={'30px'}/>
                                    <input type="file" accept='image/jpeg, image/png'/>
                                </div>
                            </div> 
                        </div>
                        <div className="Profile_Name_Role">
                            <div className="Name">
                                <p>John Jazpher Carpio</p>
                            </div>
                            <div className="Email">
                                <p>carpio.johnjazpher.dc.188@gmail.com</p>
                            </div>
                            <div className="Role">
                                <p>Dean</p>
                            </div>
                        </div>
                    </div>
                    <div className="Right-Side">
                        <div className="Label">
                            General Info
                        </div>
                        <div className="Info_Holder">
                            <div className="Info">
                                <div className="Info_Label">
                                    <span>Name</span>
                                </div>
                                <div className="Info_Value">
                                    <div className="Value">
                                        <p>Jazpher Carpio</p>
                                    </div>
                                    <div className="Info_Edit">
                                        <span>Change Name</span>    
                                    </div>
                                </div>
                            </div>
                            <div className="Info">
                                <div className="Info_Label">
                                    <span>Email</span>
                                </div>
                                <div className="Info_Value">
                                    <div className="Value">
                                        <p>carpio.johnjazpher.dc.3188@gmail.com</p>
                                    </div>
                                    <div className="Info_Edit">
                                        <span>Change Email</span>    
                                    </div>
                                </div>
                            </div>
                            <div className="Info">
                                <div className="Info_Label">
                                    <span>Password</span>
                                </div>
                                <div className="Info_Value">
                                    <div className="Value">
                                        <p>**********</p>
                                    </div>
                                    <div className="Info_Edit">
                                        <span>Change Password</span>    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Save_Profile">
                            <button>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Account_Settings