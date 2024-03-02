import React, { useState } from 'react'

import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Paper, 
    useMediaQuery, 
    useTheme
} from '@mui/material';
import toast from 'react-hot-toast';

import '../../styles/request_dialog.css'

import * as IoIcons from 'react-icons/io'
import * as SlIcons from 'react-icons/sl'

import { ReactComponent as PDF } from '../../assets/svg/icons/PDF_icon.svg'
import { LoadingInfinite } from '../../assets/svg';
import Signature from '../../assets/images/Sinature.png'
import View_Files from './View_Files';

function Request_Dialog({ action, openRequest, closeRequest }) {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openOptions, setOpenOptions] = useState('')
    const [documentState, setDocumentState] = useState({
        Date_Received: '',
        Time_Received: '',
        Incoming_Outgoing: '',
        Document_Name: '',
        Received_By: '',
        Office_Dept: '',
        Contact_Person: '',
        Document_Type: '',
        Description: '',
        Comment_Note: '',
        Status: '',
        Forward_To: '',
    })

    const handleSubmit = () => {
        toast.success('Added document successfully.', {position: 'bottom-center'})
        closeRequest({...closeRequest, show: false})
    }

    const handleCancel = () => {
        closeRequest({...closeRequest, show: false})
    }

    const showOptions = (input) => {
        setTimeout(() => {
            setOpenOptions(input)
        }, 101)
    }

    const closeOptions = () => {
        setTimeout(() => {
            setOpenOptions('')
        }, 100)
    }
    return (
        <section id='Request_Dialog' className='Request_Dialog'>
            <Dialog
                className='Dialog_Container'
                fullWidth
                maxWidth={'xs'}
                open={openRequest}
                onClose={() => handleCancel()}
            >
                <Paper sx={{backgroundColor: '#F4F4F4'}}>
                <DialogTitle>
                    <div className="Dialog_Top">
                        <span className='Dialog_Title'>{action} Document</span>
                        <div className="Dialog_Close" onClick={() => handleCancel()}>
                            <IoIcons.IoMdClose size={"30px"}/>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <form action="">
                        <div className="Inputs">
                            {/* Other Inputs */}
                            <div className="Input_Group">
                                <span className='Input_Label'>Comment/Note</span>
                                <input 
                                    className='Input' 
                                    type="text" 
                                    placeholder='Comment/Note' 
                                    value={documentState.Document_Name} 
                                    onChange={(e) => setDocumentState({...documentState, Document_Name: e.target.value})} 
                                />
                            </div>

                            {/* Other Inputs */}
                            <div className="Input_Group">
                                <span className='Input_Label'>Forward To <span className='required'>*</span></span>
                                <input 
                                    className='Input' 
                                    type="text" 
                                    placeholder='Forward To' 
                                    onFocus={() => showOptions("Forward To")} 
                                    onBlur={() => closeOptions()}
                                />
                                <div className={openOptions === "Forward To" ? "Options show" : "Options"}>
                                    <div className="Option">
                                        <p>Incomingssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                                    </div>
                                    <div className="Option">
                                        <p>Incomingssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                                    </div>
                                    <div className="Option">
                                        <p>Incomingssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                                    </div>
                                    <div className="Option">
                                        <p>Incomingssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                                    </div>
                                    <div className="Option">
                                        <p>Incomingssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                                    </div>
                                    <div className="Option">
                                        <p>Incomingssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                                    </div>
                                </div>
                            </div>

                            <div className="divider_group">
                                <span className="divider"></span>
                                <span>or</span>
                                <span className="divider"></span>
                            </div>

                            <div className="Checkboxes">
                                <div className="Label">
                                    <span>Forward To <span className='required'>*</span></span>
                                </div>
                                <div className="checkbox-wrapper-46">
                                    <input className="inp-cbx" id="cbx-46" type="checkbox" />
                                    <label className="cbx" htmlFor="cbx-46">
                                        <span>
                                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                        <span className='label'>All Users</span>
                                    </label>    
                                </div>
                                <div className="checkbox-wrapper-46">
                                    <input className="inp-cbx" id="cbx-47" type="checkbox" />
                                    <label className="cbx" htmlFor="cbx-47">
                                        <span>
                                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                        <span className='label'>All Faculty</span>
                                    </label>    
                                </div>
                                <div className="checkbox-wrapper-46">
                                    <input className="inp-cbx" id="cbx-48" type="checkbox" />
                                    <label className="cbx" htmlFor="cbx-48">
                                        <span>
                                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                        <span className='label'>All Clerks</span>
                                    </label>    
                                </div>
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <div className="Dialog_Actions">
                        <button className='Dialog_Cancel' autoFocus onClick={() => handleCancel()}>
                            Cancel
                        </button>
                        <button className='Dialog_Submit' onClick={() => handleSubmit()} autoFocus>
                            Submit
                        </button>
                    </div>
                </DialogActions>
                </Paper>
            </Dialog>
        </section>
    )
}

export default Request_Dialog