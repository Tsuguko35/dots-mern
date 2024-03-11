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

import '../../styles/add_edit_dialog.css'

import * as IoIcons from 'react-icons/io'
import * as SlIcons from 'react-icons/sl'
import * as FaIcons from 'react-icons/fa'

import { ReactComponent as PDF } from '../../assets/svg/icons/PDF_icon.svg'
import { ReactComponent as DOCX } from '../../assets/svg/icons/DOCX_icon.svg'
import { ReactComponent as XLSX } from '../../assets/svg/icons/XLSX_icon.svg'
import { formatFileSize, getDropdownsData } from '../../utils';
import { DocumentContext } from '../../context';

import { inputs } from '../../utils';

function Other_Edit_Dialog({ openEditDocs,  setOpenEditDocs }) {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [filteredInputs, setFilteredInputs] = useState([])
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

    useEffect(() => {
        const hasInputs = inputs.filter(input => input.category.toLowerCase() === documentState.Document_Category.toLowerCase() || '')
        if(hasInputs.length > 0){
            setFilteredInputs(inputs.filter(input => input.category.toLowerCase() === documentState.Document_Category.toLowerCase() || ''))
            setDocumentState(initialDocumentState)
        }
        else{
            setFilteredInputs(inputs.filter(input => input.category === 'Custom'))
        }

        if(documentState.Document_Category === "Travel Order"){
            setDocumentState({...documentState, Document_Type: 'Travel Order'})
        }
        else{
            setDocumentState({...documentState})
        }
    }, [documentState.Document_Category])

    return (
        <section id='Other_Add_Dialog' className='Other_Add_Dialog'>
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

                                {/* Mapped Inputs */}
                                {filteredInputs.map((inputList) => {
                                    return(
                                        <React.Fragment key={inputList.category}>
                                            {}
                                            {inputList.inputs.filter(input => input.value !== 'Forward_To').map((input) => (
                                                <div className="Input_Group" key={input.label}>
                                                    <span className='Input_Label'>{input.label} {input.required && (<span className='required'>*</span>)}</span>
                                                    <input 
                                                        className='Input' 
                                                        type="text"
                                                        placeholder={input.label}
                                                        value={input.value === 'Forward_To' ? users.find(user => user.user_id === documentState[input.value])?.full_Name : documentState[input.value]}
                                                        required={input.required}
                                                        readOnly={input.value === 'Forward_To'}
                                                        onChange={(e) => setDocumentState({...documentState, [input.value]: e.target.value})}
                                                        onFocus={() => showOptions(input.haveOptions && input.label)} 
                                                        onBlur={() => closeOptions()}
                                                    />
                                                    {input.haveOptions && (
                                                        <div className={openOptions === input.label ? "Options show" : "Options"}>
                                                            {/* If OPtions Are Clerks */}
                                                            {input.options === "Clerks" ? (
                                                                <React.Fragment>
                                                                    {users.filter(user => user.role !== 'Faculty' && user.full_Name.toLowerCase().includes(documentState.Received_By.toLowerCase())).length !== 0 ? (
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
                                                                </React.Fragment>
                                                            )
                                                            // If OPtions Are Office and Departments
                                                            : input.options === "Office_Dept" ?
                                                            (
                                                                dropdowns && dropdowns.filter(dropdown => dropdown.option_For === 'Office/Dept').map((dropdown) => (
                                                                    dropdown.dropdown_option.split(', ').map((option) => (
                                                                        <div key={option} className="Option" onClick={() => setDocumentState({...documentState, Office_Dept: option})}>
                                                                            <p>{option}</p>
                                                                        </div>
                                                                    ))
                                                                    
                                                                ))
                                                            )
                                                             // If OPtions Document Types
                                                            : input.options === "Document Type" ?
                                                            (
                                                                dropdowns && dropdowns.filter(dropdown => dropdown.option_For.toLowerCase().includes(documentState.Document_Category.toLowerCase())).map((dropdown) => (
                                                                    dropdown.dropdown_option.split(', ').map((option) => (
                                                                        <div key={option} className="Option" onClick={() => setDocumentState({...documentState, Document_Type: option})}>
                                                                            <p>{option}</p>
                                                                        </div>
                                                                    ))
                                                                    
                                                                ))
                                                            )
                                                            // If OPtions Document Types
                                                            : input.options === "IPCR/OPCR" ?
                                                            (
                                                                <React.Fragment>
                                                                    <div className="Option" onClick={() => setDocumentState({...documentState, Document_Type: 'IPCR'})}>
                                                                        <p>IPCR</p>
                                                                    </div>
                                                                    <div className="Option" onClick={() => setDocumentState({...documentState, Document_Type: 'OPCR'})}>
                                                                        <p>OPCR</p>
                                                                    </div>
                                                                </React.Fragment>
                                                            )
                                                            // If OPtions Are Forward to
                                                            // : input.options === "Users" ? (
                                                            //     <React.Fragment>
                                                            //         {users.filter(user => user.user_id !== userProfile.user_id).length !== 0 ? (
                                                            //             <React.Fragment>
                                                            //                 {users.filter(user => user.user_id !== userProfile.user_id).map((user) => (
                                                            //                     <div className="Option" key={user.user_id} onClick={() => setDocumentState({...documentState, Forward_To: user.user_id})}>
                                                            //                         <p>{`(${user.role}) ${user.full_Name}`}</p>
                                                            //                     </div>
                                                            //                 ))}
                                                            //             </React.Fragment>
                                                            //         )
                                                            //         :
                                                            //         (
                                                            //             <div className="Option">
                                                            //                 <p>No User Found</p>
                                                            //             </div>
                                                            //         )
                                                            //         }
                                                            //     </React.Fragment>
                                                            // )
                                                            : input.options === "Status" && (
                                                                <React.Fragment>
                                                                    <div className="Option" onClick={() => setDocumentState({...documentState, Status: 'Approved'})}>
                                                                        <p>Approved</p>
                                                                    </div>
                                                                    <div className="Option" onClick={() => setDocumentState({...documentState, Status: 'Pending'})}>
                                                                        <p>Pending</p>
                                                                    </div>
                                                                    <div className="Option" onClick={() => setDocumentState({...documentState, Status: 'Rejected'})}>
                                                                        <p>Rejected</p>
                                                                    </div>
                                                                </React.Fragment>
                                                            )
                                                            }
                                                            
                                                        </div>
                                                    )}
                                                    
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    )
                                    
                                })}
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

export default Other_Edit_Dialog