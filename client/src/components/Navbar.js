import React, { useContext, useState } from 'react'
import '../styles/navbar.css'

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

import { 
  SidebarContext, 
  logOutUser 
} from '../context'

import { 
  Avatar, 
  Box, 
  Divider, 
  IconButton, 
  ListItemIcon, 
  Menu, 
  MenuItem, 
  Tooltip, 
  Typography 
} from '@mui/material'

import { 
  Logout, 
  PersonAdd, 
  Settings 
} from '@mui/icons-material'
import { 
  DateTime 
} from '../utils'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function Navbar() {
  const navigate = useNavigate()
  const { setToggleSidebar } = useContext(SidebarContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const redirect = (props) => {
    if(props === "SysSettings"){
      handleClose()
      navigate('/System-Settings')
    }
    else if(props === "AccSettings"){
      handleClose()
      navigate('/Account-Settings')
    }
  }


  return (
    <section id='Navbar' className='Navbar'>
      <Toaster position='bottom center'/>
      <div className="Sidebar_Toggle">
        <p><IoIcons.IoMdMenu size={'35px'} onClick={() => setToggleSidebar(true)}/></p>
      </div>
      <div className="Navbar_Date_and_Profile">
          <Tooltip title="Notifications">
            <div className='Navbar_Notifications'>
              <IoIcons.IoMdNotificationsOutline size={'30px'} />
            </div>
          </Tooltip>
          <Typography className='Navbar_Date' sx={{ minWidth: '100px'}}>
            <IoIcons.IoMdCalendar size={'30px'} style={{marginRight: '10px'}}/>
            <span className="Date_time">
              <span>{DateTime().date}</span>
              <span className='dot'>&#183;</span>
              <span>{DateTime().time}</span>
            </span>
          </Typography>
          <Typography className='Navbar_Date_and_Profile_Role' sx={{ minWidth: '75px'}}>Dean</Typography>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 45, height: 45 }}>M</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="Navbar_Menu"
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                minWidth: '250px',
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: '#FFFFFF',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <div className="Menu_Profile">
              <div className="Profile_Avatar">
                <span><Avatar className='Avatar'/></span>
              </div>
              <div className="Profile_Name_Role">
                <span className='Profile_Name'>John Jazpher Carpio</span>
                <span className='Profile_Role'>Dean</span>
              </div>
            </div>
            <Divider />
            <MenuItem onClick={() => redirect("AccSettings")} className='Menu_Item'>
              <ListItemIcon>
                <RiIcons.RiSettingsLine size={'20px'} className='Menu_Icons'/>
              </ListItemIcon>
              Account Settings
            </MenuItem>
            <MenuItem onClick={() => redirect("SysSettings")} className='Menu_Item'>
              <ListItemIcon>
                <LuIcons.LuSettings2 size={'20px'} className='Menu_Icons'/>
              </ListItemIcon>
              System Settings
            </MenuItem>
            <MenuItem onClick={() => logout()} className='Menu_Item'>
              <ListItemIcon>
                <IoIcons.IoIosLogOut size={'20px'} className='Menu_Icons'/>
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
      </div>
    </section>
  )
}

export default Navbar