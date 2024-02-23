import React, { useState } from 'react'

import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    useMediaQuery, 
    useTheme
} from '@mui/material';
import toast from 'react-hot-toast';

import '../styles/memo_add_dialog.css'

import * as IoIcons from 'react-icons/io'
import * as SlIcons from 'react-icons/sl'

import { ReactComponent as PDF } from '../assets/svg/icons/PDF_icon.svg'

function Memo_Add_Dialog({ openAddDocs,  setOpenAddDocs }) {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openOptions, setOpenOptions] = useState('')
    const [documentState, setDocumentState] = useState({
        Document_Name: '',
        Office_Dept: ''
    })


    const handleSubmit = () => {
        toast.success('Added document successfully.', {position: 'bottom-center'})
        setOpenAddDocs(false)
    }

    const handleCancel = () => {
        setOpenAddDocs(false)
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
        <section id='Memo_Add_Dialog' className='Memo_Add_Dialog'>
            <Dialog
                className='Dialog_Container'
                fullScreen={fullScreen}
                fullWidth
                maxWidth={'md'}
                open={openAddDocs}
                onClose={() => handleCancel()}
            >
                <DialogTitle>
                    <div className="Dialog_Top">
                        <span className='Dialog_Title'>Add Document</span>
                        <div className="Dialog_Close" onClick={() => handleCancel()}>
                            <IoIcons.IoMdClose size={"30px"}/>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="Dialog_Body">
                        <div className="wrapper">
                            {/* Left Side */}
                            <div className="Left_Side">

                                {/* DateTime Input */}
                                <div className="Date_Time">
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Date Received</span>
                                        <input className='Input' type="date" />
                                    </div>
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Time Received</span>
                                        <input className='Input' type="time" />
                                    </div>
                                </div>

                                {/* Other Inputs */}
                                <div className="Input_Group">
                                    <span className='Input_Label'>Incoming/Outgoing</span>
                                    <input 
                                        className='Input' 
                                        type="text" 
                                        placeholder='Incoming/Outgoing' 
                                        onFocus={() => showOptions("Incoming/Outgoing")} 
                                        onBlur={() => closeOptions()}
                                    />
                                    <div className={openOptions === "Incoming/Outgoing" ? "Options show" : "Options"}>
                                        <p className='Option'>Incoming</p>
                                        <p className='Option'>Outgoing</p>
                                    </div>
                                </div>

                                {/* Other Inputs */}
                                <div className="Input_Group">
                                    <span className='Input_Label'>Document Name</span>
                                    <input 
                                        className='Input' 
                                        type="text" 
                                        placeholder='Document Name' 
                                        value={documentState.Document_Name} 
                                        onChange={(e) => setDocumentState({...documentState, Document_Name: e.target.value})} 
                                    />
                                </div>

                                {/* Other Inputs */}
                                <div className="Input_Group">
                                    <span className='Input_Label'>Received By</span>
                                    <input 
                                        className='Input' 
                                        type="text" 
                                        placeholder='Received By' 
                                        onFocus={() => showOptions("Received By")} 
                                        onBlur={() => closeOptions()}
                                    />
                                    <div className={openOptions === "Received By" ? "Options show" : "Options"}>
                                        <p className='Option'>Test</p>
                                        <p className='Option'>Test2</p>
                                        <p className='Option'>Test3</p>
                                    </div>
                                </div>

                                {/* Other Inputs */}
                                <div className="Input_Group">
                                    <span className='Input_Label'>Contact Person</span>
                                    <input 
                                        className='Input' 
                                        type="text" 
                                        placeholder='Contact Person' 
                                        onFocus={() => showOptions("Contact Person")} 
                                        onBlur={() => closeOptions()}
                                    />
                                    <div className={openOptions === "Contact Person" ? "Options show" : "Options"}>
                                        <p className='Option'>Test</p>
                                        <p className='Option'>Test2</p>
                                        <p className='Option'>Test3</p>
                                    </div>
                                </div>

                                {/* Other Inputs */}
                                <div className="Input_Group">
                                    <span className='Input_Label'>Short Description</span>
                                    <input 
                                        className='Input' 
                                        type="text" 
                                        placeholder='Short Description' 
                                        value={documentState.Document_Name} 
                                        onChange={(e) => setDocumentState({...documentState, Document_Name: e.target.value})} 
                                    />
                                </div>

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
                                    <span className='Input_Label'>Status</span>
                                    <input 
                                        className='Input' 
                                        type="text" 
                                        placeholder='Status' 
                                        onFocus={() => showOptions("Status")} 
                                        onBlur={() => closeOptions()}
                                    />
                                    <div className={openOptions === "Status" ? "Options show" : "Options"}>
                                        <p className='Option'>Test</p>
                                        <p className='Option'>Test2</p>
                                        <p className='Option'>Test3</p>
                                    </div>
                                </div>

                                {/* Other Inputs */}
                                <div className="Input_Group">
                                    <span className='Input_Label'>Forward To</span>
                                    <input 
                                        className='Input' 
                                        type="text" 
                                        placeholder='Forward To' 
                                        onFocus={() => showOptions("Forward To")} 
                                        onBlur={() => closeOptions()}
                                    />
                                    <div className={openOptions === "Forward To" ? "Options show" : "Options"}>
                                        <p className='Option'>Test</p>
                                        <p className='Option'>Test2</p>
                                        <p className='Option'>Test3</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="Right_Side">
                                <div className="Label">
                                    <span>Add Document File/s</span>
                                </div>
                                <div className="FileUpload">
                                    <div className="Icon">
                                        <SlIcons.SlCloudUpload size={"30px"}/>
                                    </div>
                                    <p className='Main'>Click to upload</p>
                                    <p className='Sub'>.png, .jpeg, .jpg, .doc, .docx, .pdf, .xls, .xlsx</p>
                                    <input type="file" accept='image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'/>
                                </div>
                                <div className="Files">
                                    <div className="File">
                                        <div className="Icon">
                                            <PDF />
                                        </div>
                                        <div className="Name_Size">
                                            <p className="Name">Filename.pdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                            <p className="Size">25 MB</p>
                                        </div>
                                        <div className="Remove">
                                            <div className="Close_Icon">
                                                <IoIcons.IoMdClose size={"30px"}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="File">
                                        <div className="Icon">
                                            <PDF />
                                        </div>
                                        <div className="Name_Size">
                                            <p className="Name">Filename.pdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                            <p className="Size">25 MB</p>
                                        </div>
                                        <div className="Remove">
                                            <div className="Close_Icon">
                                                <IoIcons.IoMdClose size={"30px"}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
            </Dialog>
        </section>
        
    )
}

export default Memo_Add_Dialog