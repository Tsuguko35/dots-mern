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
  SidebarContext 
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

function Navbar() {
  const { setToggleSidebar } = useContext(SidebarContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <section id='Navbar' className='Navbar'>
      <div className="Sidebar_Toggle">
        <p><IoIcons.IoMdMenu size={'35px'} onClick={() => setToggleSidebar(true)}/></p>
      </div>
      <div className="Navbar_Date_and_Profile">
          <Typography className='Navbar_Date' sx={{ minWidth: '100px'}}><IoIcons.IoMdCalendar size={'20px'} style={{marginRight: '2px'}}/><DateTime /></Typography>
          <Typography className='Navbar_Date_and_Profile_Role' sx={{ minWidth: '100px'}}>Dean</Typography>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
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
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> John Jazpher Carpio
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
      </div>
    </section>
  )
}

export default Navbar