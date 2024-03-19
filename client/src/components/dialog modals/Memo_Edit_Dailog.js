import React, { useContext, useState } from 'react'

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

import '../../styles/add_edit_dialog.css'

import * as IoIcons from 'react-icons/io'
import * as SlIcons from 'react-icons/sl'
import * as FaIcons from 'react-icons/fa'

import { ReactComponent as PDF } from '../../assets/svg/icons/PDF_icon.svg'
import { ReactComponent as DOCX } from '../../assets/svg/icons/DOCX_icon.svg'
import { ReactComponent as XLSX } from '../../assets/svg/icons/XLSX_icon.svg'
import { DocumentContext } from '../../context';
import { formatFileSize } from '../../utils';

function Memo_Edit_Dialog({ openEditDocs,  setOpenEditDocs }) {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openOptions, setOpenOptions] = useState('')
    const {
        error, 
        setError, 
        documentState, 
        setDocumentState, 
        documentFiles, 
        setDocumentFiles, 
        fileDetails, setFileDetails, 
        handleSubmit, 
        handleFileSelect,
        handleFileRemove,
        users,
        initialDocumentState,
        handleCancel,
        dropdowns,
        handleSubmitEdit,
        userProfile
    } = useContext(DocumentContext)

    const showOptions = (input) => {
        setTimeout(() => {
            setOpenOptions(input)
        }, 160)
    }

    const closeOptions = () => {
        setTimeout(() => {
            setOpenOptions('')
        }, 150)
    }
    return (
        <section id='Memo_Add_Dialog' className='Memo_Add_Dialog'>
            <Dialog
                className='Dialog_Container'
                fullScreen={fullScreen}
                fullWidth
                maxWidth={'md'}
                open={openEditDocs}
                onClose={() => handleCancel("Edit")}
            >
                <Paper sx={{backgroundColor: '#F4F4F4'}}>
                <DialogTitle>
                    <div className="Dialog_Top">
                        <span className='Dialog_Title'>Edit {documentState.Document_Name}</span>
                        <div className="Dialog_Close" onClick={() => handleCancel("Edit")}>
                            <IoIcons.IoMdClose size={"30px"}/>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <form id='edit_Form' onSubmit={handleSubmitEdit}>
                        <div className="Dialog_Body">
                            <div className="wrapper">
                                {/* Left Side */}
                                <div className="Left_Side">

                                    {/* DateTime Input */}
                                    <div className="Date_Time">
                                            <div className="Input_Group">
                                                <span className='Input_Label'>Date Received <span className='required'>*</span></span>
                                                <input required className='Input' type="date" value={documentState.Date_Received || ''} onChange={(e) => setDocumentState({...documentState, Date_Received: e.target.value})}/>
                                            </div>
                                            <div className="Input_Group">
                                                <span className='Input_Label'>Time Received <span className='required'>*</span></span>
                                                <input required className='Input' type="time" value={documentState.Time_Received || ''} onChange={(e) => setDocumentState({...documentState, Time_Received: e.target.value})}/>
                                            </div>
                                        </div>

                                    {/* Other Inputs */}
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Incoming/Outgoing <span className='required'>*</span></span>
                                        <input 
                                            className='Input' 
                                            type="text"
                                            readOnly
                                            required
                                            placeholder='Incoming/Outgoing'
                                            value={documentState.Incoming_Outgoing || ''}
                                            onFocus={() => showOptions("Incoming/Outgoing")} 
                                            onBlur={() => closeOptions()}
                                        />
                                        <div className={openOptions === "Incoming/Outgoing" ? "Options show" : "Options"}>
                                            <div className="Option" onClick={() => setDocumentState({...documentState, Incoming_Outgoing: 'Incoming'})}>
                                                <p>Incoming</p>
                                            </div>
                                            <div className="Option" onClick={() => setDocumentState({...documentState, Incoming_Outgoing: 'Outgoing'})}>
                                                <p>Outgoing</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Other Inputs */}
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Document Name <span className='required'>*</span></span>
                                        <input 
                                            className='Input' 
                                            type="text" 
                                            placeholder='Document Name'
                                            required
                                            maxLength={100}
                                            value={documentState.Document_Name || ''} 
                                            onChange={(e) => setDocumentState({...documentState, Document_Name: e.target.value})} 
                                        />
                                    </div>

                                    {/* Other Inputs */}
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Office/Dept <span className='required'>*</span></span>
                                        <input 
                                            className='Input' 
                                            type="text" 
                                            placeholder='Document Type'
                                            required
                                            maxLength={100}
                                            value={documentState.Office_Dept || ''} 
                                            onChange={(e) => setDocumentState({...documentState, Office_Dept: e.target.value})}
                                            onFocus={() => showOptions("Office/Dept")} 
                                            onBlur={() => closeOptions()}
                                        />
                                        <div className={openOptions === "Office/Dept" ? "Options show" : "Options"}>
                                            {dropdowns && dropdowns.filter(dropdown => dropdown.option_For === 'Office/Dept').map((dropdown) => (
                                                dropdown.dropdown_option.split(', ').map((option) => (
                                                    <div key={option} className="Option" onClick={() => setDocumentState({...documentState, Office_Dept: option})}>
                                                        <p>{option}</p>
                                                    </div>
                                                ))
                                                
                                            ))}
                                        </div>
                                    </div>

                                    {/* Other Inputs */}
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Received By <span className='required'>*</span></span>
                                        <input 
                                            className='Input' 
                                            type="text" 
                                            placeholder='Received By'
                                            required
                                            maxLength={155}
                                            onFocus={() => showOptions("Received By")} 
                                            onBlur={() => closeOptions()}
                                            value={documentState.Received_By || ''} 
                                            onChange={(e) => setDocumentState({...documentState, Received_By: e.target.value})} 
                                        />
                                        <div className={openOptions === "Received By" ? "Options show" : "Options"}>
                                            {users && users.filter(user => user.role !== 'Faculty' && user.full_Name.toLowerCase().includes(documentState.Received_By.toLowerCase())).length !== 0 ? (
                                                <React.Fragment>
                                                    {users.filter(user => user.role !== "Faculty" && user.full_Name.toLowerCase().includes(documentState.Received_By.toLowerCase())).map((user) => (
                                                        <div className="Option" key={user.user_id} onClick={() => setDocumentState({...documentState, Received_By: user.full_Name})}>
                                                            <p>{`(${user.role}) ${user.full_Name}`}</p>
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            )
                                            :
                                            (
                                                <div className="Option">
                                                    <p>No User Found</p>
                                                </div>
                                            )
                                            }
                                        </div>
                                    </div>

                                    {/* Other Inputs */}
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Contact Person</span>
                                        <input 
                                            className='Input' 
                                            type="text" 
                                            placeholder='Contact Person' 
                                            maxLength={100}
                                            onFocus={() => showOptions("Contact Person")} 
                                            onBlur={() => closeOptions()}
                                            value={documentState.Contact_Person || ''}
                                            onChange={(e) => setDocumentState({...documentState, Contact_Person: e.target.value})} 
                                        />
                                    </div>

                                    {/* Other Inputs */}
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Short Description <span className='required'>*</span></span>
                                        <input 
                                            className='Input' 
                                            type="text" 
                                            placeholder='Short Description'
                                            required
                                            maxLength={1000}
                                            value={documentState.Description || ''} 
                                            onChange={(e) => setDocumentState({...documentState, Description: e.target.value})} 
                                        />
                                    </div>

                                    {/* Other Inputs */}
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Comment/Note</span>
                                        <input 
                                            className='Input' 
                                            type="text" 
                                            placeholder='Comment/Note'
                                            maxLength={1000} 
                                            value={documentState.Comment_Note || ''} 
                                            onChange={(e) => setDocumentState({...documentState, Comment_Note: e.target.value})} 
                                        />
                                    </div>

                                    {/* Other Inputs */}
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Status <span className='required'>*</span></span>
                                        <input 
                                            className='Input' 
                                            type="text" 
                                            placeholder='Status'
                                            required
                                            maxLength={45}
                                            onFocus={() => showOptions("Status")} 
                                            onBlur={() => closeOptions()}
                                            value={documentState.Status || ''} 
                                            onChange={(e) => setDocumentState({...documentState, Status: e.target.value})} 
                                        />
                                        <div className={openOptions === "Status" ? "Options show" : "Options"}>
                                            <div className="Option" onClick={(e) => setDocumentState({...documentState, Status: 'Approved'})}>
                                                <p>Approved</p>
                                            </div>
                                            <div className="Option" onClick={(e) => setDocumentState({...documentState, Status: 'Pending'})}>
                                                <p>Pending</p>
                                            </div>
                                            <div className="Option" onClick={(e) => setDocumentState({...documentState, Status: 'Rejected'})}>
                                                <p>Rejected</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Other Inputs */}
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Forward To</span>
                                        <input 
                                            className='Input' 
                                            type="text" 
                                            placeholder='Forward To'
                                            readOnly
                                            value={users.find(user => user.user_id === documentState.Forward_To)?.full_Name || ''}
                                            onFocus={() => showOptions("Forward To")} 
                                            onBlur={() => closeOptions()}
                                        />
                                        <div className={openOptions === "Forward To" ? "Options show" : "Options"}>
                                            {users.filter(user => user.user_id !== userProfile.user_id).length !== 0 ? (
                                                <React.Fragment>
                                                    {users.filter(user => user.user_id !== userProfile.user_id).map((user) => (
                                                        <div className="Option" key={user.user_id} onClick={() => setDocumentState({...documentState, Forward_To: user.user_id})}>
                                                            <p>{`(${user.role}) ${user.full_Name}`}</p>
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            )
                                            :
                                            (
                                                <div className="Option">
                                                    <p>No User Found</p>
                                                </div>
                                            )
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side */}
                                <div className="Right_Side">
                                        <span className='divider mobile'></span>
                                        <div className="Label">
                                            <span>Add Document File/s <span className='required'>*</span></span>
                                        </div>
                                        <div className="FileUpload">
                                            <div className="Icon">
                                                <SlIcons.SlCloudUpload size={"30px"}/>
                                            </div>
                                            <p className='Main'>Click to upload</p>
                                            <p className='Sub'>.png, .jpeg, .jpg, .doc, .docx, .pdf, .xls, .xlsx</p>
                                            <input required={fileDetails.length === 0} type="file" onChange={(e) => handleFileSelect(e.target.files)} multiple capture="environment" accept='image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'/>
                                        </div>
                                        {error.isError && (
                                            <div className="errorMessage">
                                                <p>{error.errorMessage}</p>
                                            </div>
                                        )}
                                        <div className="Files">
                                            {fileDetails && fileDetails.map((file, index) => (
                                                <div className="File" key={file.file_id}>
                                                    <div className="Icon">
                                                        {file.file_Name.endsWith('.png') || file.file_Name.endsWith('.jpg') || file.file_Name.endsWith('.jpeg') ? (
                                                            <FaIcons.FaFileImage size={'25px'}/>
                                                        )
                                                        : file.file_Name.endsWith('.pdf') ? (
                                                            <PDF />
                                                        )
                                                        : file.file_Name.endsWith('.doc') || file.file_Name.endsWith('.docx') ? (
                                                            <DOCX />
                                                        )   
                                                        : file.file_Name.endsWith('.xls') || file.file_Name.endsWith('.xlsx') && (
                                                            <XLSX />
                                                        )
                                                        }
                                                    </div>
                                                    <div className="Name_Size">
                                                        <p className="Name">{file.file_Name}</p>
                                                        <p className="Size">{formatFileSize(file.file_Size)}</p>
                                                    </div>
                                                    {fileDetails.length !== 1 && (
                                                        <div className="Remove">
                                                            <div className="Close_Icon" onClick={() => handleFileRemove(index)}>
                                                                <IoIcons.IoMdClose size={"30px"}/>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <div className="Dialog_Actions">
                        <button className='Dialog_Cancel' autoFocus onClick={() => handleCancel("Edit")}>
                            Cancel
                        </button>
                        <button type='submit' form='edit_Form' className='Dialog_Submit'>
                            Submit
                        </button>
                    </div>
                </DialogActions>
                </Paper>
            </Dialog>
        </section>
        
    )
}

export default Memo_Edit_Dialog