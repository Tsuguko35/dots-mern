import React, { useState } from 'react'

import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Paper, 
} from '@mui/material';
import toast from 'react-hot-toast';

import '../../styles/request_dialog.css'

import * as IoIcons from 'react-icons/io'
import * as SlIcons from 'react-icons/sl'
import { ReactComponent as PDF } from '../../assets/svg/icons/PDF_icon.svg'
import { ReactComponent as DOCX } from '../../assets/svg/icons/DOCX_icon.svg'
import { ReactComponent as XLSX } from '../../assets/svg/icons/XLSX_icon.svg'

import { LoadingGear } from '../../assets/svg';
import { checkFileType, formatFileSize, uploadTemplates } from '../../utils';
import Swal from 'sweetalert2';

function Add_Template_Dialog({ openAddTemplate, closeAddTemplate, getTemplates }) {
    const [error, setError] = useState({
        isError: false, 
        errorMessage: ''
    })
    const [templates, setTemplates] = useState([])
    const [templateDetails, setTemplateDetails] = useState([])

    const [submit, setSubmit] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setSubmit(true)
        toast.loading('Please wait...')
        setError({
            isError: false, 
            errorMessage: ''
        })

        const res = await uploadTemplates({ files: templates, file_Details: templateDetails })
        if(res?.status === 200){
            toast.dismiss()
            toast.success('Templates Added')
            setTemplates([])
            setTemplateDetails([])
            setSubmit(false)
            closeAddTemplate(false)
        }
        else{
            toast.dismiss()
            toast.error(res?.errorMessage)
        }

        getTemplates()
        setSubmit(false)
    }

    const handleCancel = () => {
        if(templates.length > 0){
            Swal.fire({
                icon: 'warning',
                iconColor: '#FF8911',
                text: 'Warning! Closing will delete the data you inputted. Continue?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Yes, close',
                cancelButtonText: 'No, cancel',
                confirmButtonColor: '#FF8911',
                cancelButtonColor: '#3A3535'
            }).then((result) => {
            if (result.isConfirmed) {
                setError({
                    isError: false, 
                    errorMessage: ''
                })
                setTemplates([])
                setTemplateDetails([])
                setSubmit(false)
                closeAddTemplate(false)
            } else {
                Swal.close();
            }
            });
        }
        else{
            setError({
                isError: false, 
                errorMessage: ''
            })
            setTemplates([])
            setTemplateDetails([])
            setSubmit(false)
            closeAddTemplate(false)
        }
        
    }

    const handleUploadTemplate = (selectedTemplates) => {
        setError({ isError: false, errorMessage: '' })
        const fileArr = Array.from(selectedTemplates)

        if(checkFileType(fileArr)){

            // Check for duplicates
            const duplicateFiles = fileArr.filter(file =>
                templates.some(fileItem => fileItem.name === file.name)
            );
    
            if (duplicateFiles.length > 0) {
                setError({ isError: true, errorMessage: 'Cannot upload the same file.' });
            } else {
    
                // Add the new ones
                const newDocumentFiles = [...templates, ...fileArr];
                const newFileDetails = [...templateDetails, ...fileArr.map(file => ({ file_Name: file.name, file_Size: file.size }))];
    
                setTemplates(newDocumentFiles);
                setTemplateDetails(newFileDetails);
            }
        }
        else{
            setError({ isError: true, errorMessage: 'An invalid file type is uploaded.' })
        }
    }

    const handleFileRemove = (fileIndex) => {
        // Check if the file exists in templates
        if (fileIndex >= 0 && fileIndex < templates.length) {
            const newTemplateFiles = [...templates];
            newTemplateFiles.splice(fileIndex, 1);
            setTemplates(newTemplateFiles);
        }
    
        // Check if the file exists in templateDetials
        if (fileIndex >= 0 && fileIndex < templateDetails.length) {
            const newTemplateDetails = [...templateDetails];
            const deletedTemplate = newTemplateDetails.splice(fileIndex, 1);
    
            setTemplateDetails(newTemplateDetails);
        }
    }

    return (
        <section id='Add_Template_Dialog' className='Add_Template_Dialog'>
            <Dialog
                className='Dialog_Container'
                fullWidth
                maxWidth={'xs'}
                open={openAddTemplate}
                onClose={() => handleCancel()}
            >
                <Paper sx={{backgroundColor: '#F4F4F4'}}>
                <DialogTitle>
                    <div className="Dialog_Top">
                        <span className='Dialog_Title'>Add Template</span>
                        <div className="Dialog_Close" onClick={() => handleCancel()}>
                            <IoIcons.IoMdClose size={"30px"}/>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <form id='addTemplate_Form' onSubmit={handleSubmit}>

                        {/* Upload */}
                        <div className="Template_Upload">
                            <div className="Icon">
                                <SlIcons.SlCloudUpload size={"40px"}/>
                            </div>
                            <p className='Main'>Click to upload</p>
                            <p className='Sub'>.doc, .docx, .pdf, .xls, .xlsx</p>
                            <input type="file" disabled={submit} onChange={(e) => handleUploadTemplate(e.target.files)} required multiple accept='application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'/>
                        </div>

                        {/* Template Files */}
                        <div className="Template_Files">
                            {templates.map((file, index) => (
                                <div className="File" key={`${file.lastModified} ${file.name}`}>
                                    <div className="Icon">
                                        {file.type === 'application/pdf' ? (
                                            <PDF />
                                        )
                                        : file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
                                            <DOCX />
                                        )   
                                        : file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && (
                                            <XLSX />
                                        )
                                        }
                                    </div>
                                    <div className="File_Label">
                                        <p className="Name">{file.name}</p>
                                        <p className="Size">{formatFileSize(file.size)}</p>
                                    </div>
                                    <div className="Remove">
                                        <IoIcons.IoMdClose size={"30px"} onClick={() => handleFileRemove(index)}/>
                                    </div>
                                </div>
                            ))}
                            
                            
                        </div>
                        {error.isError && (
                            <div className="errorMessage">
                                <p>{error.errorMessage}</p>
                            </div>
                        )}
                    </form>
                    
                </DialogContent>
                <DialogActions>
                    <div className="Dialog_Actions">
                        <button className='Dialog_Cancel' autoFocus onClick={() => handleCancel()}>
                            Cancel
                        </button>
                        <button type='submit' form='addTemplate_Form' className='Dialog_Submit'>
                            {submit ? <LoadingGear width='40px' height='40px'/> : 'Add'}
                        </button>
                    </div>
                </DialogActions>
                </Paper>
            </Dialog>
        </section>
    )
}

export default Add_Template_Dialog