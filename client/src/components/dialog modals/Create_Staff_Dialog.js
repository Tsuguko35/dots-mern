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

function Create_Staff_Dialog({ openCreateStaff, closeCreateStaff }) {
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
        closeCreateStaff(false)
    }

    const handleCancel = () => {
        closeCreateStaff(false)
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
        <section id='Create_Staff_Dialog' className='Create_Staff_Dialog'>
            <Dialog
                className='Dialog_Container'
                fullWidth
                maxWidth={'xs'}
                open={openCreateStaff}
                onClose={() => handleCancel()}
            >
                <Paper sx={{backgroundColor: '#F4F4F4'}}>
                <DialogTitle>
                    <div className="Dialog_Top">
                        <span className='Dialog_Title'>Create Staff Account</span>
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
                                <span className='Input_Label'>BulSU Email<span className='required'>*</span></span>
                                <input 
                                    className='Input' 
                                    type="text" 
                                    placeholder='BulSU Email' 
                                    value={documentState.Document_Name} 
                                    onChange={(e) => setDocumentState({...documentState, Document_Name: e.target.value})} 
                                />
                            </div>

                            {/* Other Inputs */}
                            <div className="Input_Group">
                                <span className='Input_Label'>Temporary Password<span className='required'>*</span></span>
                                <input 
                                    className='Input' 
                                    type="text" 
                                    placeholder='Temporary Password' 
                                    onFocus={() => showOptions("Forward To")} 
                                    onBlur={() => closeOptions()}
                                />
                            </div>

                            {/* Other Inputs */}
                            <div className="Input_Group">
                                <span className='Input_Label'>Confirm Temporary Password<span className='required'>*</span></span>
                                <input 
                                    className='Input' 
                                    type="text" 
                                    placeholder='Confirm Temporary Password' 
                                    onFocus={() => showOptions("Forward To")} 
                                    onBlur={() => closeOptions()}
                                />
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

export default Create_Staff_Dialog