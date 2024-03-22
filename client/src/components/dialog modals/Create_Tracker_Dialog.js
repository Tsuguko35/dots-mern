import React, { useState } from 'react'

import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Paper, 
    useMediaQuery, 
    useTheme
} from '@mui/material';
import toast from 'react-hot-toast';

import '../../styles/request_dialog.css'

import * as IoIcons from 'react-icons/io'
import SignatureCanvas from 'react-signature-canvas'
import { LoadingGear } from '../../assets/svg';
import { addTracker } from '../../utils';

function Create_Tracker_Dialog({ openCreateTracker, closeCreateTracker, document_id, userDetails, refreshTracker }) {
    const [error, setError] = useState({
        isError: false, 
        errorMessage: ''
    })
    const [trackerDetails, setTrackerDetails] = useState({
        label: '',
        document_id: document_id || ''
    })
    const [signature, setSignature] = useState(null)

    const [submit, setSubmit] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setSubmit(true)
        toast.loading('Please')
        setError({
            isError: false, 
            errorMessage: ''
        })

        if(signature.isEmpty()){
            toast.dismiss()
            setError({ isError: true, errorMessage: 'All fields must be filled up.'})
        }
        else{
            const res = await addTracker({signature: signature, tracker_Details: trackerDetails, document_id: document_id, created_By: userDetails.full_Name})
            toast.dismiss()
            if(res?.status === 200){
                refreshTracker()
                closeCreateTracker(false)
                setTrackerDetails({
                    label: '',
                    document_id: ''
                })
                toast.success('Added tracker successfully.')
            }
            else if(res?.status === 400){
                toast.error('Adding tracker failed.')
            }
        }
        setSubmit(false)
    }

    const handleCancel = () => {
        setTrackerDetails({
            label: '',
            document_id: ''
        })
        setError({
            isError: false, 
            errorMessage: ''
        })

        setSubmit(false)
        closeCreateTracker(false)
    }

    const handleClear = () => {
        signature.clear()
    }


    return (
        <section id='Create_Staff_Dialog' className='Create_Staff_Dialog'>
            <Dialog
                className='Dialog_Container'
                fullWidth
                maxWidth={'xs'}
                open={openCreateTracker}
                onClose={() => handleCancel()}
            >
                <Paper sx={{backgroundColor: '#F4F4F4'}}>
                <DialogTitle>
                    <div className="Dialog_Top">
                        <span className='Dialog_Title'>Add Tracker</span>
                        <div className="Dialog_Close" onClick={() => handleCancel()}>
                            <IoIcons.IoMdClose size={"30px"}/>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <form id='CreateTracker_Form' onSubmit={handleSubmit}>
                        <div className="Inputs">

                            {/* Signature Box */}
                            <div className="Signature_Container">
                                <span className='Signature_Label'>Tracker Signature<span className='required'>*</span></span>
                                <div className={!error.isError ? "Signature_Box" : "Signature_Box error"}>
                                    {!submit && (
                                        <SignatureCanvas ref={data => setSignature(data)} canvasProps={{className: 'Signature_Canvas'}}/>
                                    )}
                                </div>
                                <span className='Signature_Clear' onClick={() => handleClear()}>Clear Signature</span>
                            </div>

                            {/* Other Inputs */}
                            <div className="Input_Group">
                                <span className='Input_Label'>Tracker Label<span className='required'>*</span></span>
                                <input 
                                    className={!error.isError ? "Input" : "Input error"}
                                    type="text" 
                                    placeholder='Tracker Label' 
                                    value={trackerDetails.label || ''} 
                                    onChange={(e) => setTrackerDetails({...trackerDetails, label: e.target.value})} 
                                    required
                                    maxLength={100}
                                    disabled={submit}
                                />
                            </div>
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
                        <button type='submit' form='CreateTracker_Form' className='Dialog_Submit'>
                            {submit ? <LoadingGear width='40px' height='40px'/> : 'Add'}
                        </button>
                    </div>
                </DialogActions>
                </Paper>
            </Dialog>
        </section>
    )
}

export default Create_Tracker_Dialog