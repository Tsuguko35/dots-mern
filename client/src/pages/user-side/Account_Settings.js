import React, { useEffect, useState } from 'react'
import { PageHeader, Timer } from '../../components'
import '../../styles/account_settings.css'
import { 
    Avatar,
} from '@mui/material'

// Icons
import * as CiIcons from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'


function Account_Settings() {
    const navigate = useNavigate()
    const userDetails = JSON.parse(window.localStorage.getItem('profile'))
    const firstLetterOfName = userDetails.full_Name ? userDetails.full_Name.charAt(0).toUpperCase() : 'A';

    useEffect(() => {
        document.title = `Account Settings`
    }, [])

    return (
        <section id='Account_Settings' className='Account_Settings'>
            <div className="wrapper">
                <PageHeader page={"Account Settings"} />
                <div className="Settings_Container">
                    <div className="Left-Side">
                        <div className="Profile_Pic">
                            <Avatar className='Pic'>{firstLetterOfName}</Avatar>
                            <div className="Pic_Change_Holder">
                                <div className="Pic_Change">
                                    <CiIcons.CiImageOn size={'30px'}/>
                                    <input type="file" accept='image/jpeg, image/png'/>
                                </div>
                            </div> 
                        </div>
                        <div className="Profile_Name_Role">
                            <div className="Name">
                                <p>{userDetails.full_Name}</p>
                            </div>
                            <div className="Email">
                                <p>{userDetails.email}</p>
                            </div>
                            <div className="Role">
                                <p>{userDetails.role}</p>
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
                                        <p>{userDetails.full_Name}</p>
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
                                        <p>{userDetails.email}</p>
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
                                    <div className="Info_Edit" onClick={() => navigate('/Reset-Password')}>
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