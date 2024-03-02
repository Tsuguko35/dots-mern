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

import '../../styles/view_document_dialog.css'

import * as IoIcons from 'react-icons/io'
import * as SlIcons from 'react-icons/sl'

import { ReactComponent as PDF } from '../../assets/svg/icons/PDF_icon.svg'
import { LoadingInfinite } from '../../assets/svg';
import Signature from '../../assets/images/Sinature.png'
import View_Files from './View_Files';

function View_Document_Dialog({ openViewDoc,  setOpenViewDoc }) {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [pdfToView, setPdfToView] = useState(null)
    const [detailsLoading, setDetailsLoading] = useState(false)
    const [stepperLoading, setStepperLoading] = useState(false)
    const [filesLoading, setFilesLoading] = useState(false)
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
        setOpenViewDoc(false)
    }

    const handleCancel = () => {
        setOpenViewDoc(false)
    }
    return (
        <section id='View_Document_Dialog' className='View_Document_Dialog'>
            <Dialog
                className='View_Dialog_Container'
                fullScreen={fullScreen}
                fullWidth
                maxWidth={'xl'}
                open={openViewDoc}
                onClose={() => handleCancel()}
                disableEscapeKeyDown={pdfToView}
            >
                <Paper sx={{backgroundColor: '#F4F4F4'}}>
                <DialogTitle>
                    <div className="View_Dialog_Top">
                        <span className='View_Dialog_Title'>Document name</span>
                        <div className="View_Dialog_Close" onClick={() => handleCancel()}>
                            <IoIcons.IoMdClose size={"30px"}/>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="View_Dialog_Body">
                        <div className="wrapper">
                            <div className="Left_Side">
                                <div className="Document_Details_Container">
                                    <span className="Label">Document Details</span>
                                    {!detailsLoading ? (
                                        <div className="Document_Details">
                                            <div className="Detail_Group">
                                                <span className="Label">Document Name</span>
                                                <p className="Detail">Test Docu Name</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Received By</span>
                                                <p className="Detail">Jazpher Carpio</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Contact Person</span>
                                                <p className="Detail">Jazpher Carpio</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Date Received</span>
                                                <p className="Detail">Today</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Description</span>
                                                <p className="Detail">Short Desc</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Status</span>
                                                <p className="Detail Status">Approved</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Forwared To</span>
                                                <p className="Detail">Jazpher Carpio</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Comment/Note</span>
                                                <p className="Detail">Comment Note</p>
                                            </div>
                                        </div>
                                    )
                                    :(
                                        <div className="Loader">
                                            <LoadingInfinite width='75px' height='75px'/>
                                        </div>
                                    )
                                    }
                                </div>
                                <div className="Document_Tracker_Container">
                                    <span className="Label">Document Tracker</span>
                                    {!stepperLoading ? (
                                        <div className="Tracker_Details">
                                            <div className="rightbox">
                                                <div className="rb-container">
                                                    <ul className="rb">
                                                        <li className="rb-item" ng-repeat="itembx">
                                                            <div className="timestamp">
                                                                3rd May 2020 &#183; 7:00 PM
                                                            </div>
                                                            <div className="item-title">
                                                                <span className='Office signature'>CICT</span>
                                                                <img src={Signature} alt="" className="Signature" />
                                                            </div>
                                                        </li>
                                                        <li className="rb-item" ng-repeat="itembx">
                                                            <div className="timestamp">
                                                                3rd May 2020 &#183; 7:00 PM
                                                            </div>
                                                            <div className="item-title">
                                                                <span className='Office'>CICT</span>
                                                                <span className='Signature_Add'>Add Signature</span>
                                                            </div>
                                                        </li>
                                                    </ul>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :(
                                        <div className="Loader">
                                            <LoadingInfinite width='75px' height='75px'/>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                            <div className="Right_Side">
                                <View_Files isFileLoading={filesLoading} setIsFileLoading={setFilesLoading} pdfToView={pdfToView} setPdfToView={setPdfToView}/>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                </Paper>
            </Dialog>
        </section>
        
    )
}

export default View_Document_Dialog