import React, { useContext, useEffect, useState } from 'react'

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
import { DocumentContext } from '../../context';
import { formatTimeAmPm, getDocumentData, getFiles } from '../../utils';

function View_Document_Dialog({ openViewDoc,  setOpenViewDoc, document_id }) {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [pdfToView, setPdfToView] = useState(null)
    const [detailsLoading, setDetailsLoading] = useState(false)
    const [stepperLoading, setStepperLoading] = useState(false)
    const [filesLoading, setFilesLoading] = useState(false)
    const [ documents, setDocuments ] = useState({})
    const [fileDetails, setFileDetails] = useState([])

    //Get table data
    const getTableDocuments = async() => {
        if(!document_id) return
        setDetailsLoading(true)
        const res = await getDocumentData({ document_id: document_id })
        
        if(res?.status === 200){
            setDetailsLoading(false)
            const documentData = res.data?.document
            setDocuments(documentData[0])
        }
        else(
            toast.error('An error occured while fetching data.')
        )
    }

    const handleCancel = () => {
        setOpenViewDoc(false)
    }

    const getFilesData = async() => {
        const res = await getFiles({ document_id: document_id })
        if(res?.status === 200){
            setFileDetails(res.data?.files)
        }
    }

    useEffect(() => {
        getTableDocuments()
        getFilesData()
    }, [document_id])

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
                        <span className='View_Dialog_Title'>{ documents.document_Name }</span>
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
                                                <span className="Label">Date Received</span>
                                                <p className="Detail">{ `${new Date(documents.date_Received).toLocaleDateString('en-us', {year: 'numeric', month: 'long', day: 'numeric'})} - ${formatTimeAmPm(documents.time_Received)}` }</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Document Name</span>
                                                <p className="Detail">{ documents.document_Name }</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Document Type</span>
                                                <p className="Detail">{ documents.document_Type || "N/A" }</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Document Category</span>
                                                <p className="Detail">{ documents.document_Category || "N/A" }</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Received By</span>
                                                <p className="Detail">{ documents.received_By }</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Office/Department</span>
                                                <p className="Detail">{ documents.office_Dept || "N/A" }</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Contact Person</span>
                                                <p className="Detail">{ documents.contact_Person || "N/A" }</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Description</span>
                                                <p className="Detail">{ documents.description }</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Status</span>
                                                <p className={`Detail Status ${documents.status}`}>{ documents.status }</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Forwared To</span>
                                                <p className="Detail">{ documents.forward_To || "N/A" }</p>
                                            </div>
                                            <div className="Detail_Group">
                                                <span className="Label">Comment/Note</span>
                                                <p className="Detail">{ documents.comment || "N/A" }</p>
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
                                {documents.tracker && (
                                    <div className="Document_Tracker_Container">
                                        <span className="Label">Document Tracker</span>
                                        {!stepperLoading ? (
                                            <div className="Tracker_Details">
                                                <div className="rightbox">
                                                    <div className="rb-container">
                                                        <ul className="rb">
                                                            { documents.tracker && documents.tracker.map((tracker) => (
                                                                <li className="rb-item" ng-repeat="itembx">
                                                                    <div className="timestamp">
                                                                        {tracker.signed_Time}
                                                                    </div>
                                                                    <div className="item-title">
                                                                        <span className='Office signature'>{tracker.tracker_Location}</span>
                                                                        <img src={Signature} alt="" className="Signature" />
                                                                    </div>
                                                                </li>
                                                            )) }
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
                                )}
                            </div>
                            <div className="Right_Side">
                                <View_Files isFileLoading={filesLoading} setIsFileLoading={setFilesLoading} pdfToView={pdfToView} setPdfToView={setPdfToView} files={fileDetails || []}/>
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