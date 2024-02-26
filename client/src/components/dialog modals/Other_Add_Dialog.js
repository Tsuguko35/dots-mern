import React, { useEffect, useState } from 'react'

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

import { ReactComponent as PDF } from '../../assets/svg/icons/PDF_icon.svg'

import { inputs } from '../../utils';

function Other_Add_Dialog({ openAddDocs,  setOpenAddDocs }) {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [filteredInputs, setFilteredInputs] = useState([])
    const [openOptions, setOpenOptions] = useState('')
    const [documentState, setDocumentState] = useState({
        Category: '',
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

    useEffect(() => {
        const hasInputs = inputs.filter(input => input.category.toLowerCase() === documentState.Category.toLowerCase())
        if(hasInputs.length > 0){
            setFilteredInputs(inputs.filter(input => input.category.toLowerCase() === documentState.Category.toLowerCase()))
            setDocumentState({
                ...documentState,
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
        }
        else{
            setFilteredInputs(inputs.filter(input => input.category === 'Custom'))
        }
    }, [documentState.Category])
    return (
        <section id='Other_Add_Dialog' className='Other_Add_Dialog'>
            <Dialog
                className='Dialog_Container'
                fullScreen={fullScreen}
                fullWidth
                maxWidth={'md'}
                open={openAddDocs}
                onClose={() => handleCancel()}
            >
                <Paper sx={{backgroundColor: '#F4F4F4'}}>
                <DialogTitle>
                    <div className="Dialog_Top">
                        <span className='Dialog_Title'>Add Document</span>
                        <div className="Dialog_Close" onClick={() => handleCancel()}>
                            <IoIcons.IoMdClose size={"30px"}/>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <form action="">
                    <div className="Dialog_Body">
                        <div className="wrapper">
                            {/* Left Side */}
                            <div className="Left_Side">
                                {/* Other Inputs */}
                                <div className="Input_Group">
                                    <span className='Input_Label'>Category <span className='required'>*</span></span>
                                    <input 
                                        className='Input' 
                                        type="text" 
                                        placeholder='Category'
                                        value={documentState.Category}
                                        onChange={(e) => setDocumentState({...documentState, Category: e.target.value})}
                                        onFocus={() => showOptions("Category")} 
                                        onBlur={() => closeOptions()}
                                    />
                                    <div className={openOptions === "Category" ? "Options show" : "Options"}>
                                        {inputs.filter(input => input.category.toLowerCase().includes(documentState.Category.toLowerCase()) &&  input.category !== 'Custom').map((input) => (
                                            <div className="Option">
                                                <p key={input.category} onClick={() => setDocumentState({...documentState, Category: input.category})}>{input.category}</p>
                                            </div>
                                            
                                        ))}
                                    </div>
                                </div>

                                {/* DateTime Input */}
                                <div className="Date_Time">
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Date Received <span className='required'>*</span></span>
                                        <input className='Input' type="date" />
                                    </div>
                                    <div className="Input_Group">
                                        <span className='Input_Label'>Time Received <span className='required'>*</span></span>
                                        <input className='Input' type="time" />
                                    </div>
                                </div>

                                {/* Other Inputs */}
                                <div className="Input_Group">
                                    <span className='Input_Label'>Incoming/Outgoing <span className='required'>*</span></span>
                                    <input 
                                        className='Input' 
                                        type="text" 
                                        placeholder='Incoming/Outgoing' 
                                        onFocus={() => showOptions("Incoming/Outgoing")} 
                                        onBlur={() => closeOptions()}
                                    />
                                    <div className={openOptions === "Incoming/Outgoing" ? "Options show" : "Options"}>
                                        <div className="Option">
                                            <p>Incomingssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mapped Inputs */}
                                {filteredInputs.map((inputList) => {
                                    return(
                                        <React.Fragment key={inputList.category}>
                                            {}
                                            {inputList.inputs.map((input) => (
                                                <div className="Input_Group" key={input.label}>
                                                    <span className='Input_Label'>{input.label} {input.required && (<span className='required'>*</span>)}</span>
                                                    <input 
                                                        className='Input' 
                                                        type="text"
                                                        placeholder={input.label}
                                                        value={documentState[input.value]}
                                                        required={input.required}
                                                        onChange={(e) => setDocumentState({...documentState, [input.value]: e.target.value})}
                                                        onFocus={() => showOptions(input.haveOptions && input.label)} 
                                                        onBlur={() => closeOptions()}
                                                    />
                                                    {input.haveOptions && (
                                                        <div className={openOptions === input.label ? "Options show" : "Options"}>
                                                            {input.options.map((option) => (
                                                                <div className="Option">
                                                                    <p key={option} className='Option' onClick={() => setDocumentState({...documentState, [input.value]: option})}>{option}</p>
                                                                </div>
                                                            ))}
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
                                <div className="Urgent_Container">
                                    <span className='Label'>Is the document urgent?(Yes if urgent)</span>
                                    <div className="checkbox-wrapper-8">
                                        <input className="tgl tgl-skewed" id="cb3-8" type="checkbox"/>
                                        <label className="tgl-btn" data-tg-off="No" data-tg-on="Yes" for="cb3-8"></label>
                                    </div>
                                </div>
                                <span className='divider'></span>
                                <div className="Label">
                                    <span>Add Document File/s <span className='required'>*</span></span>
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

export default Other_Add_Dialog