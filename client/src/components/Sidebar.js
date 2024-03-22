import React, { useContext, useEffect, useRef, useState } from 'react'

import '../styles/sidebar.css'

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as LuIcons from 'react-icons/lu'
import * as HiIcons from 'react-icons/hi'
import * as GoIcons from 'react-icons/go'
import * as MdIcons from 'react-icons/md'
import * as CiIcons from 'react-icons/ci'

import cictLogo from '../assets/images/cict-logo.png'

import { 
    Collapse,
    Divider 
} from '@mui/material'

import { 
    Link, 
    useLocation 
} from 'react-router-dom'
import { SidebarContext } from '../context'
import { GetWindowWidth, getTableData } from '../utils'
import { NotificationContext } from '../context/context'

function Sidebar() {
    const location = useLocation()
    const windowWidth = GetWindowWidth()
    const {toggleSidebar, setToggleSidebar} = useContext(SidebarContext)
    const [toggleRequests, setToggleRequests] = useState(false)
    const [toggleMonitoring, setToggleMonitoring] = useState(false)
    const [documents, setDocuments] = useState([])
    const [pendingNotification, setPendingNotification] = useState(false)
    const [approvedNotification, setApprovedNotification] = useState(false)
    const [rejectedNotification, setRejectedNotification] = useState(false)

    //Notifications
    const {
        notifications,
        setNotifications,
        user
    } = useContext(NotificationContext)

    const userDetails = user

    const getAllDocuemnts = async() => {
        const docsRes = await getTableData({ documentType: 'All' })
        
        if(docsRes?.status === 200){
            setDocuments(docsRes.data?.documents)
            getNotificationType()
        }
    }
    useEffect(() => {
        getAllDocuemnts()
    }, [notifications])

    const getNotificationType = () => {
        setApprovedNotification(false)
        setRejectedNotification(false)
        setPendingNotification(false)

        notifications.filter(notification => notification.isRead === 0).forEach(notification => {
            const status = documents.find(document => document.document_id === notification.document_id)?.status
            if(status !== 'Approved' && status !== 'Rejected'){
                setPendingNotification(true)
            }
            if(status === 'Approved'){
                setApprovedNotification(true)
            }
            if(status === 'Rejected'){
                setRejectedNotification(true)
            }
        });
    }



    const sidebarRef = useRef(null);

    

    useEffect(() => {
        if(windowWidth > 1280){
            setToggleSidebar(true)
        }
        else{
            setToggleSidebar(false)
        }
    }, [windowWidth])
    

    useEffect(() => {
        function handleClickOutside(event) {
            if(windowWidth <= 1280){
                if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                    setToggleSidebar(false)
                }
            }
        }
        

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggleSidebar]);

return (
    <section id='Sidebar' className={toggleSidebar ? 'Sidebar' : 'Sidebar_Close'}>
        <div className='wrapper'>
            <div className="content" ref={sidebarRef}>
                {(windowWidth <= 1280) && (
                    <div className="Nav_Header" >
                        <RiIcons.RiCloseLine size={'30px'} onClick={(e) => setToggleSidebar(false)}/>
                    </div>
                )}
                <div className="Nav_Header_Title">
                    <span className="Nav_Header_Dep_Detail"></span>
                    <img src={cictLogo} alt="" />
                    <div className="Nav_Header_Dep_Name">
                        <span>CICT</span>
                    </div>
                </div>
                
                <div className='Nav_List'>
                    <Link to={`/Dashboard`} className={location.pathname.includes('/Dashboard') ? 'Nav_List_Item active' : 'Nav_List_Item'} onClick={(e) => !toggleSidebar ? setToggleSidebar(false) : undefined}>
                        <div className="Nav_Icon_Label">
                            <span className='Nav_Item_Icon'><LuIcons.LuLayoutDashboard size={'30px'}/></span>
                            <span className='Nav_Item_Label'>Dashboard</span>
                        </div>
                    </Link>
                    <Link className={location.pathname.includes('/Requests') ? 'Nav_List_Item active' : 'Nav_List_Item'} onClick={(e) => setToggleRequests(!toggleRequests)}>
                        <div className="Nav_Icon_Label">
                            <span className='Nav_Item_Icon'><HiIcons.HiOutlineDocumentText size={'30px'}/></span>
                            <span className='Nav_Item_Label'>Request</span>
                        </div>
                        {notifications && notifications.filter(notif => notif.isRead !== 1).length > 0 && <span className='Nav_Item_Notification'></span>}
                        <span className={toggleRequests ? 'Nav_Item_Collapse_Icon active' : 'Nav_Item_Collapse_Icon'}><RiIcons.RiArrowDropDownLine size={'35px'}/></span>
                    </Link>
                        <Collapse className='Nav_List_Collapse' in={toggleRequests} timeout="auto" unmountOnExit>
                            <Link to={`/Requests/Pending`} className={location.pathname.includes('/Pending') ? 'Nav_List_Collapse_Item active' : 'Nav_List_Collapse_Item'}>
                                <div className="Nav_Icon_Label">
                                    <span className='Nav_Item_onCollapse_Icon'><MdIcons.MdOutlinePendingActions size={'20px'}/></span>
                                    <span className='Nav_Item_Label'>Pending Documents</span>
                                </div>
                                {pendingNotification && <span className='Nav_Item_Notification'></span>}
                            </Link>
                            <Link to={`/Requests/Approved`} className={location.pathname.includes('/Approved') ? 'Nav_List_Collapse_Item active' : 'Nav_List_Collapse_Item'}>
                                <div className="Nav_Icon_Label">
                                    <span className='Nav_Item_onCollapse_Icon'><HiIcons.HiOutlineClipboardCheck size={'20px'}/></span>
                                    <span className='Nav_Item_Label'>Approved Documents</span>
                                </div>
                                {approvedNotification && <span className='Nav_Item_Notification'></span>}
                            </Link>
                            <Link to={`/Requests/Rejected`} className={location.pathname.includes('/Rejected') ? 'Nav_List_Collapse_Item active' : 'Nav_List_Collapse_Item'}>
                                <div className="Nav_Icon_Label">
                                    <span className='Nav_Item_onCollapse_Icon'><LuIcons.LuClipboardX size={'20px'}/></span>
                                    <span className='Nav_Item_Label'>Rejected Documents</span>
                                </div>
                                {rejectedNotification && <span className='Nav_Item_Notification'></span>}
                            </Link>
                            <Link to={`/Requests/History`} className={location.pathname.includes('/History') ? 'Nav_List_Collapse_Item active' : 'Nav_List_Collapse_Item'}>
                                <div className="Nav_Icon_Label">
                                    <span className='Nav_Item_onCollapse_Icon'><LuIcons.LuHistory size={'20px'}/></span>
                                    <span className='Nav_Item_Label'>Request History</span>
                                </div>
                            </Link>
                        </Collapse>
                    
                    {/* Dont Show Montiroing if Faculty */}
                    {user.role !== 'Faculty' && (
                        <>
                            <Link className={location.pathname.includes('/Monitoring') ? 'Nav_List_Item active' : 'Nav_List_Item'} onClick={(e) => setToggleMonitoring(!toggleMonitoring)}>
                                <div className="Nav_Icon_Label">
                                    <span className='Nav_Item_Icon'><GoIcons.GoRows size={'30px'}/></span>
                                    <span className='Nav_Item_Label'>Monitoring</span>
                                </div>
                                <span className={toggleMonitoring ? 'Nav_Item_Collapse_Icon active' : 'Nav_Item_Collapse_Icon'}><RiIcons.RiArrowDropDownLine size={'35px'}/></span>
                            </Link>
                                <Collapse className='Nav_List_Collapse' in={toggleMonitoring} timeout="auto" unmountOnExit>
                                    <Link to={`/Monitoring/Communication`} className={location.pathname.includes('/Communication') ? 'Nav_List_Collapse_Item active' : 'Nav_List_Collapse_Item'}>
                                        <span className='Nav_Item_onCollapse_Icon'><HiIcons.HiOutlineNewspaper size={'20px'}/></span>
                                        <span className='Nav_Item_Label'>Communications</span>
                                    </Link>
                                    <Link to={`/Monitoring/Memorandum`} className={location.pathname.includes('/Memorandum') ? 'Nav_List_Collapse_Item active' : 'Nav_List_Collapse_Item'}>
                                        <span className='Nav_Item_onCollapse_Icon'><CiIcons.CiMemoPad size={'20px'}/></span>
                                        <span className='Nav_Item_Label'>Memorandums</span>
                                    </Link>
                                    <Link to={`/Monitoring/Other`} className={location.pathname.includes('/Other') ? 'Nav_List_Collapse_Item active' : 'Nav_List_Collapse_Item'}>
                                        <span className='Nav_Item_onCollapse_Icon'><HiIcons.HiOutlineClipboardList size={'20px'}/></span>
                                        <span className='Nav_Item_Label'>Other Documents</span>
                                    </Link>
                                </Collapse>
                        </>
                    )}

                    
                    <Link to={`/Archive/Folders`} className={location.pathname.includes('/Archive') ? 'Nav_List_Item active' : 'Nav_List_Item'} onClick={(e) => !toggleSidebar ? setToggleSidebar(false) : undefined}>
                        <div className="Nav_Icon_Label">
                            <span className='Nav_Item_Icon'><GoIcons.GoArchive size={'30px'}/></span>
                            <span className='Nav_Item_Label'>Archives</span>
                        </div>
                    </Link>
                    <Link to={`/Templates`} className={location.pathname.includes('/Templates') ? 'Nav_List_Item active' : 'Nav_List_Item'} onClick={(e) => !toggleSidebar ? setToggleSidebar(false) : undefined}>
                        <div className="Nav_Icon_Label">
                            <span className='Nav_Item_Icon'><GoIcons.GoProjectTemplate size={'30px'}/></span>
                            <span className='Nav_Item_Label'>Templates</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Sidebar