import React from 'react'

import '../styles/setting_accounts.css'

// Icons
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as LuIcons from 'react-icons/lu'
import * as HiIcons from 'react-icons/hi'
import * as GoIcons from 'react-icons/go'
import * as GrIcons from 'react-icons/gr'
import * as MdIcons from 'react-icons/md'
import * as CiIcons from 'react-icons/ci'
import { 
    Avatar, 
    Collapse, 
    InputAdornment, 
    TextField, 
    Tooltip 
} from '@mui/material'

function Setting_Accounts() {
    return (
        <section id='Setting_Accounts' className='Setting_Accounts'>
            <div className="wrapper">
                <div className="Accounts_Top">
                    <div className="Accounts_Top_Left">
                        <button>
                        <MdIcons.MdOutlineAdd size={'20px'}/> ADD NEW STAFF
                        </button>
                    </div>
                    <div className="Accounts_Top_Right">
                        <TextField
                        className = "table-input"
                        size="small"
                        variant="outlined"
                        InputProps={{
                            placeholder: "Name",
                            startAdornment: (
                            <InputAdornment position="start">
                                <IoIcons.IoIosSearch size={'20px'}/>
                            </InputAdornment>
                            ),
                        }}
                        />
                    </div>
                </div>
                <div className="Accounts_List">
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    <div className="Account">
                        <div className="Account_Profile_Pic">
                            <Avatar className="Profile_Pic">M</Avatar>
                        </div>
                        <div className="Account_Email_Name_Status">
                            <div className="Email_Name">
                                <p className="Name">Jazpher Carpio</p>
                                <p className="Email">carpio.johnjazpher.dc.3188@gmail.com</p>
                            </div>
                            <div className="Status active">
                                <p>Active</p>
                            </div>
                        </div>
                        <div className="Account_Options">
                            <Tooltip title="Options">
                                <div className="Status_Icon">
                                    <MdIcons.MdOutlineMoreVert size={"25px"}/>
                                </div>
                            </Tooltip>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default Setting_Accounts