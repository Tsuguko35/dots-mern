import React, { useContext, useEffect, useRef, useState } from 'react'

import '../../styles/monitoring_table.css'

// Icons
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import * as HiIcons from 'react-icons/hi'
import * as GoIcons from 'react-icons/go'
import * as GrIcons from 'react-icons/gr'
import * as MdIcons from 'react-icons/md'
import { Collapse, Menu, Tooltip } from '@mui/material'
import { LoadingInfinite } from '../../assets/svg'
import { GetWindowWidth, addDocument, checkFileType, formatDate, formatTime, getDropdownsData, getFiles, uploadFiles, editDocument, deleteFiles, archiveDocument, downloadReport } from '../../utils'

//Dialogs
import Comm_Add_Dialog from '../dialog modals/Comm_Add_Dialog'
import Memo_Add_Dialog from '../dialog modals/Memo_Add_Dialog'
import Other_Add_Dialog from '../dialog modals/Other_Add_Dialog'
import Comm_Edit_Dialog from '../dialog modals/Comm_Edit_Dialog'
import Memo_Edit_Dialog from '../dialog modals/Memo_Edit_Dailog'
import Other_Edit_Dialog from '../dialog modals/Other_Edit_Dialog'
import View_Document_Dialog from '../dialog modals/View_Document_Dialog'


import Signature from '../../assets/images/Sinature.png'
import noResult from '../../assets/images/noResult.png'
import toast from 'react-hot-toast'
import { DocumentContext } from '../../context'
import Swal from 'sweetalert2'
import Create_Tracker_Dialog from '../dialog modals/Create_Tracker_Dialog'
import { domain, signatureFiles } from '../../constants'
import { NotificationContext } from '../../context/context'

//Printing
import ReactToPrint from 'react-to-print'
import { ReportPrint } from '../ReportPrint'


function MonitoringTable({ documentType, documents, isLoading, refreshTableFunc, users, setFilter, filters, trackers, refreshTracker }) {
  const [openAddDocs, setOpenAddDocs] = useState(false)
  const [openEditDocs, setOpenEditDocs] = useState(false)
  const [openViewDoc, setOpenViewDoc] = useState(false)
  const [openCreateTracker, setOpenCreateTracker] = useState(false)
  const {
    user
  } = useContext(NotificationContext)
  const userProfile = user
  const windowWidth = GetWindowWidth()
  const [rotation, setRotation] = useState(0);
  const [openRow, setOpenRow] = useState(0)
  const [error, setError] = useState({ isError: false, errorMessage: '' })
  const [initialEditState, setInitialEditState] = useState({})
  const printComponentRef = useRef();
  const initialDocumentState = {
    Date_Received: formatDate(new Date()),
    Time_Received: formatTime(new Date()),
    Incoming_Outgoing: 'Incoming',
    Document_Name: '',
    Document_Type: documentType === "Other" ? '' : documentType,
    Document_Category: documentType === "Other" ? '' : documentType,
    Received_By: '',
    Office_Dept: 'CICT',
    Contact_Person: '',
    Description: '',
    Comment_Note: '',
    Status: 'Pending',
    Forward_To: '',
    Forwarded_By: '',
    Urgent: 0,
    Tracking: {},
    Created_By: userProfile.full_Name
  }

  const [documentState, setDocumentState] = useState(initialDocumentState)
  const [documentFiles, setDocumentFiles] = useState([])
  const [fileDetails, setFileDetails] = useState([])
  const [category, setCategory] = useState('')
  const [dropdowns, setDropdowns] = useState([])

  //Tracker Stuff
  const [trackerDocumentID, setTrackerDocumentID] = useState('')

  //Edit stuff
  const [initialEditFileDetails, setInitialEditFileDetails] = useState([])
  const [filesToDelete, setFilesToDelete] = useState([])
  const [editDocumentID, setEditDocumentID] = useState('')
  const [filterFor, setFilterFor] = useState('')

  //Filter Menu Stuf
  const [anchorEl, setAnchorEl] = useState(null);
  const openFilter = Boolean(anchorEl);

  const handleFilterOpen = (event, filterFor) => {
    setFilterFor(filterFor)
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
  };



  //Reset all states
  const resetState = () => {
    setCategory('');
    setDocumentState(initialDocumentState);
    setFileDetails([]);
    setDocumentFiles([]);
    setFilesToDelete([]);
    setEditDocumentID('')
    setOpenAddDocs(false);
    setOpenEditDocs(false);
    setOpenViewDoc(false);
  };

  const getDropdowns = async() => {
    const res = await getDropdownsData()
    if(res?.status === 200){
        setDropdowns(res.data?.dropdowns)
    }
  }

  const getFilesData = async(document_id) => {
    const res = await getFiles({ document_id: document_id })
    if(res?.status === 200){
        setFileDetails(res.data?.files)
        setInitialEditFileDetails(res.data?.files)
    }
  }
  
  useEffect(() => {
    resetState()
  }, [documentType])

  useEffect(() => {
    //Get input dropdowns
    getDropdowns()
  }, [])
  

  const refreshTable = () => {
    setRotation(rotation + 360);
  }

  const openToggleRow = (row) => {
    if(openRow === row){
      setOpenRow(0)
    }
    else{
      setOpenRow(row)
    }
  }

  const openEdit = (props) => {
    const documentData = documents.filter(document => document.document_id === props.id);
    const document = documentData[0] || {};
    const stateMapping = {
        Document_Category: 'document_Category', 
        Date_Received: 'date_Received',
        Time_Received: 'time_Received',
        Incoming_Outgoing: 'incoming_Outgoing',
        Document_Name: 'document_Name',
        Document_Type: 'document_Type',
        Received_By: 'received_By',
        Office_Dept: 'office_Dept',
        Contact_Person: 'contact_Person',
        Description: 'description',
        Comment_Note: 'comment',
        Status: 'status',
        Forward_To: 'forward_To',
        Forwarded_By: 'forwarded_By',
        Urgent: 'urgent',
        Tracking: 'tracking'
    };

    const getValue = (key) => {
      if (key === 'tracking') {
          return document[key] || {};
      } else if (key === 'urgent') {
          return document[key] || 0;
      } else {
          return document[key] || '';
      }
    };

    // Set the initial edit state
    setInitialEditState(Object.keys(stateMapping).reduce((acc, key) => {
        acc[key] = getValue(stateMapping[key]);
        return acc;
    }, {}));

    // Set the document state
    setDocumentState(Object.keys(stateMapping).reduce((acc, key) => {
        acc[key] = getValue(stateMapping[key]);
        return acc;
    }, {}));

    getFilesData(props.id)
    setEditDocumentID(props.id)
    setOpenEditDocs(true);
  }

  const openDoc = (props) => {
    setOpenViewDoc(true)
    setEditDocumentID(props)
  }


  const handleSubmit = async(e) => {
    e.preventDefault()
    const documentRes = await addDocument({ documentState: documentState})

    if(documentRes?.status === 200){
      const fileUploadRes = await uploadFiles({ files: documentFiles, file_Details: fileDetails, document_id:  documentRes.data?.document_id})

      if(fileUploadRes?.status === 200){
        toast.success('Added document successfully.', {position: 'bottom-center'})
        setOpenAddDocs(false)
        refreshTableFunc()
        resetState()
      }
      else{
        toast.error('An error occured while uploading the document files.')
      }
    }
    else{
      toast.error('An error occured while uploading the document.')
    }
    
  }

  const handleFileSelect = (selectedFiles) => {
    setError({ isError: false, errorMessage: '' })
    const fileArr = Array.from(selectedFiles)

    if(checkFileType(fileArr)){

        // Check for duplicates
        const duplicateFiles = fileArr.filter(file =>
            documentFiles.some(fileItem => fileItem.name === file.name)
        );

        if (duplicateFiles.length > 0) {
            setError({ isError: true, errorMessage: 'Cannot upload the same file.' });
        } else {

            // Add the new ones
            const newDocumentFiles = [...documentFiles, ...fileArr];
            const newFileDetails = [...fileDetails, ...fileArr.map(file => ({ file_Name: file.name, file_Size: file.size }))];

            setDocumentFiles(newDocumentFiles);
            setFileDetails(newFileDetails);
        }
    }
    else{
        setError({ isError: true, errorMessage: 'An invalid file type is uploaded.' })
    }
  }

  const handleFileRemove = (fileIndex) => {
    // Check if the file exists in documentFiles
    if (fileIndex >= 0 && fileIndex < documentFiles.length) {
        const newDocumentFiles = [...documentFiles];
        newDocumentFiles.splice(fileIndex, 1);
        setDocumentFiles(newDocumentFiles);
    }

    // Check if the file exists in fileDetails
    if (fileIndex >= 0 && fileIndex < fileDetails.length) {
        const newFileDetails = [...fileDetails];
        const deletedFile = newFileDetails.splice(fileIndex, 1);

        // Add to files to delete for edit
        const fileToDelete = deletedFile[0];
        setFilesToDelete([...filesToDelete, fileToDelete]);

        setFileDetails(newFileDetails);
    }
  }


  const hasDocumentStateBeenModified = (currentState, initialState) => {
    // Create a copy of the initial state to avoid mutating the original
    const initialStateCopy = { ...initialState };
    // Remove Date_Received and Time_Received from the copies
    delete initialStateCopy.Date_Received;
    delete initialStateCopy.Time_Received;
    delete currentState.Date_Received;
    delete currentState.Time_Received;
    // Compare the modified copies
    return JSON.stringify(initialStateCopy) !== JSON.stringify(currentState);
  }

  const handleCancel = (action) => {

    //Should the swal appear
    const shouldReset = () => {
      if (action === "Add") {
        return hasDocumentStateBeenModified(documentState, initialDocumentState) || documentFiles.length !== 0;
      } else if (action === "Edit") {
        return hasDocumentStateBeenModified(documentState, initialEditState) || documentFiles.length !== 0 || initialEditFileDetails !== fileDetails;
      }
      return false;
    };
    if (shouldReset()) {
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
          resetState();
        } else {
          Swal.close();
        }
      });
    } else {
        resetState();
    }
  };

  //Edit Document Stuff
  const handleSubmitEdit = async(e) => {
    e.preventDefault()
    const res = await editDocument({ documentState: documentState, document_id: editDocumentID, edited_By:userProfile.full_Name })
    if(res?.status === 200){
      if(filesToDelete.length !== 0){
        const delteFileRes = await deleteFiles({ file_Details: filesToDelete, document_id:  res.data?.document_id})
        if(delteFileRes?.status === 400){
          toast.error('An error occured while uploading the document files.')
          return
        }
      }
      if(documentFiles.length !== 0){
        const newFileDetails = fileDetails.filter(detail => !initialEditFileDetails.includes(detail))
        const fileUploadRes = await uploadFiles({ files: documentFiles, file_Details: newFileDetails, document_id:  res.data?.document_id})

        if(fileUploadRes?.status === 200){
          toast.success('Edited document successfully.', {position: 'bottom-center'})
          setOpenEditDocs(false)
          refreshTableFunc()
          resetState()
        }
        else{
          toast.error('An error occured while editing the document files.')
        }
      }
      else{
        setOpenEditDocs(false)
        refreshTableFunc()
        resetState()
        toast.success('Edited document successfully.', {position: 'bottom-center'})
      }
    }
    else{
      toast.error('An error occured while editing the document.')
    }
  }


  //Archive Stuff
  const handleArchiveFile = (props) => {
    if(props.status === "Approved" || props.status === "Rejected"){
      Swal.fire({
        icon: 'info',
        iconColor: '#FF8911',
        text: `Archive ${props.file_Name}?`,
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'No, cancel',
        cancelButtonColor: '#3A3535',
        confirmButtonText: 'Yes, archive',
        confirmButtonColor: '#FF8911',
        focusConfirm: false,
        allowEscapeKey: true,
        allowOutsideClick: true
      }).then(async(result) => {
        if(result.isConfirmed){
          toast.loading('Archiving. Please wait...')
          const res = await archiveDocument({ document_id: props.document_id, archived_By: userProfile.full_Name })
          if(res?.status === 200){
            toast.dismiss()
            toast.success(`${props.file_Name} has been archived`)
            refreshTableFunc()
          }
          else(
              toast.error(res?.errorMessage)
          )
          
        }
        else{
          Swal.close()
        }
      })
    }
    else{
      Swal.fire({
        icon: 'warning',
        iconColor: '#FF8911',
        text: 'Cannot archive a pending document. Wait for the document to be approved or rejected.',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Close',
        cancelButtonColor: '#3A3535',
        allowEscapeKey: true,
        allowOutsideClick: true
      })
    }
  }

  //Tracker Stuff
  const handleOpenTracker = (document_id) => {
    setTrackerDocumentID(document_id)
    setOpenCreateTracker(true)
  }

  return (
    <section id='Monitoring_Table' className='Monitoring_Table'>
      <DocumentContext.Provider value={{ 
          error, 
          setError, 
          documentState, 
          setDocumentState, 
          documentFiles, 
          setDocumentFiles, 
          fileDetails, 
          setFileDetails, 
          handleSubmit, 
          handleFileSelect,
          handleFileRemove,
          users,
          initialDocumentState,
          handleCancel,
          category,
          setCategory,
          dropdowns,
          handleSubmitEdit,
          userProfile
        }}
      >

        {/* Add Dialogs */}
        {documentType === "Communication" ? (
          <Comm_Add_Dialog openAddDocs={openAddDocs} setOpenAddDocs={setOpenAddDocs}/>
        )
        :documentType === "Memorandum" ? (
          <Memo_Add_Dialog openAddDocs={openAddDocs} setOpenAddDocs={setOpenAddDocs}/>
        )
        :documentType === "Other" &&(
          <Other_Add_Dialog openAddDocs={openAddDocs} setOpenAddDocs={setOpenAddDocs}/>
        )
        }

        {/* Edit Dialogs */}
        {documentType === "Communication" ? (
          <Comm_Edit_Dialog openEditDocs={openEditDocs} setOpenEditDocs={setOpenEditDocs}/>
        )
        :documentType === "Memorandum" ? (
          <Memo_Edit_Dialog openEditDocs={openEditDocs} setOpenEditDocs={setOpenEditDocs}/>
        )
        :documentType === "Other" &&(
          <Other_Edit_Dialog openEditDocs={openEditDocs} setOpenEditDocs={setOpenEditDocs}/>
        )
        }

        {/* View Document */}
        <View_Document_Dialog openViewDoc={openViewDoc} setOpenViewDoc={setOpenViewDoc} document_id={editDocumentID}/>

        {/* Create Tracker Dialog */}
        <Create_Tracker_Dialog openCreateTracker={openCreateTracker} closeCreateTracker={setOpenCreateTracker} document_id={trackerDocumentID} userDetails={userProfile} refreshTracker={refreshTracker}/>

        {/* Report Print */}
        <div className="PrintReport" style={{ visibility: 'hidden', position: 'fixed' }}>
          <ReportPrint ref={printComponentRef} documents={documents} document_Type={documentType}/>
        </div>
      </DocumentContext.Provider>
      
      <div className="wrapper">
        <div className="Table_Top">
          <div className="Table_Top_Left">
            <button onClick={() => setOpenAddDocs(true)}>
              <MdIcons.MdOutlineAdd size={'20px'}/> ADD NEW DOCUMENT
            </button>
            <Tooltip title="Refresh">
              <span onClick={() => {refreshTable() ; refreshTableFunc()}}>
                <IoIcons.IoMdRefresh size={'35px'} style={{transform: `rotate(${rotation}deg)`, transition: 'transform 1s'}}/>
              </span>
            </Tooltip>
          </div>
          <div className="Table_Top_Right">
            <ReactToPrint 
              trigger={() => {
                return(
                  <button>
                    <HiIcons.HiOutlinePrinter size={'20px'}/> PRINT
                  </button>
                )
              }}
              content={() => printComponentRef.current}
              documentTitle={`${documentType} Report`}
              pageStyle={`
                @page { 
                  size: A4 portrait; 
                  margin: 2mm;
                }
              `}
            />
            <div className="Input_Group">
              <div className="Custom_Search">
                  <div className="Icon">
                      <IoIcons.IoIosSearch size={'20px'}/>
                  </div>
                  <input value={filters.searchFilter} className='Input' type="text" placeholder='Search...' onChange={(e) => setFilter({...filters, searchFilter: e.target.value})}/>
              </div>
            </div>
          </div>
        </div>
        <div className="Table_Container">
            {!isLoading ? 
            (
              <React.Fragment>
      
                  <div className="Table">
                    { windowWidth > 540 ? (
                      <React.Fragment>
                        <div className="Table_Header_Container">
                          <div className="Tabler_Header">
                            <span className='Table_Header_Label'>{filters.docuNameFilter || "Document Name"}</span>
                            <span id='FilterDocName' className='Table_Header_Filter' onClick={(e) => handleFilterOpen(e, "docuNameFilter")}><HiIcons.HiFilter size={'25px'}/></span>
                          </div>
                          <div className="Tabler_Header">
                            <span className='Table_Header_Label'>{filters.docuTypeFilter || "Document Type"}</span>
                            <span id='FilterDocuType' className='Table_Header_Filter' onClick={(e) => handleFilterOpen(e, "docuTypeFilter")}><HiIcons.HiFilter size={'25px'}/></span>
                          </div>
                          <div className="Tabler_Header ReceivedBy">
                            <span className='Table_Header_Label'>{filters.docuReceivedBy || "Received By"}</span>
                            <span id='FilterReceivedBy' className='Table_Header_Filter' onClick={(e) => handleFilterOpen(e, "docuReceivedBy")}><HiIcons.HiFilter size={'25px'}/></span>
                          </div>
                          <div className="Tabler_Header OfficeDept">
                            <span className='Table_Header_Label'>{filters.officeDeptFilter || "Office/Dept"}</span>
                            <span id='FilterOfficeDept' className='Table_Header_Filter' onClick={(e) => handleFilterOpen(e, "officeDeptFilter")}><HiIcons.HiFilter size={'25px'}/></span>
                          </div>
                          <div className="Tabler_Header DateReceived">
                            <span className='Table_Header_Label'>{filters.dateReceivedFilter || "Date Received"}</span>
                            <span id='FilterDate' className='Table_Header_Filter' onClick={(e) => handleFilterOpen(e, "dateReceivedFilter")}><HiIcons.HiFilter size={'25px'}/></span>
                          </div>
                          <div className="Tabler_Header">
                            <span className='Table_Header_Label'>{filters.statusFilter || "Status"}</span>
                            <span id='FilterStatus' className='Table_Header_Filter' onClick={(e) => handleFilterOpen(e, "statusFilter")}><HiIcons.HiFilter size={'25px'}/></span>
                          </div>
                          <div className="Tabler_Header">
                            <span className='Table_Header_Label'>Action</span>
                          </div>
                          <Menu
                            anchorEl={anchorEl}
                            id="Filter_Menu"
                            open={openFilter}
                            onClose={handleFilterClose}
                            PaperProps={{
                              elevation: 0,
                              sx: {
                                minWidth: '250px',
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                  width: 32,
                                  height: 32,
                                  ml: -0.5,
                                  mr: 1,
                                },
                                '&::before': {
                                  content: '""',
                                  display: 'block',
                                  position: 'absolute',
                                  top: 0,
                                  right: 14,
                                  width: 10,
                                  height: 10,
                                  bgcolor: '#FFFFFF',
                                  transform: 'translateY(-50%) rotate(45deg)',
                                  zIndex: 0,
                                },
                              },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                          >
                            {filterFor === "dateReceivedFilter" ? (
                              <div className="Filter_Container">
                                <div className="Input_Group">
                                    <span className='Input_Label'>Date Received</span>
                                    <input required className='Input' type="date" value={filters.dateReceivedFilter || ''} onChange={(e) => setFilter({ ...filters, dateReceivedFilter: e.target.value })}/>
                                </div>
                              </div>
                            )
                            :
                            (
                              <div className="Filter_Container">
                                <div className="Input_Group">
                                  <span className='Input_Label'>Filter</span>
                                  <div className="Custom_Email">
                                      <input 
                                        className='Input' 
                                        type="text" 
                                        autoComplete='true'
                                        placeholder='Type filter...' 
                                        value={filters[filterFor] || ''}
                                        onChange={(e) => setFilter({...filters , [filterFor]: e.target.value})}/>
                                  </div>
                                </div>
                              </div>
                            )
                            }
                            
                          </Menu>
                        </div>
                        <div className="Table_Body_Container">
                        {documents && documents.length !== 0 ? (
                          <React.Fragment>
                            {documents.map((document) => (
                              <div className="Table_Body_Row" key={document.document_id}>
                                <div className="Table_Body_Details">
                                  <div onClick={() => openToggleRow(document.document_id)}>
                                    <Tooltip title={document.document_Name}>
                                      <p>{document.document_Name}</p>
                                    </Tooltip>
                                  </div>
                                  <div onClick={() => openToggleRow(document.document_id)}>
                                    <Tooltip title={document.document_Type}>
                                      <p>{document.document_Type}</p>
                                    </Tooltip>
                                  </div>
                                  <div onClick={() => openToggleRow(document.document_id)} className='ReceivedBy'>
                                    <Tooltip title={document.received_By}>
                                      <p>{document.received_By}</p>
                                    </Tooltip>
                                  </div>
                                  <div onClick={() => openToggleRow(document.document_id)} className='OfficeDept'>
                                    <Tooltip title={document.office_Dept}>
                                      <p>{document.office_Dept}</p>
                                    </Tooltip>
                                  </div>
                                  <div onClick={() => openToggleRow(document.document_id)} className='DateReceived'>
                                    <Tooltip title={document.date_Received}>
                                      <p>{document.date_Received}</p>
                                    </Tooltip>
                                  </div>
                                  <div className={`Status ${document.status === "Approved" ? "Approved" : document.status === "Pending" ? "Ongoing" : document.status === "Rejected" ? "Rejected" : ''}`} onClick={() => openToggleRow(document.document_id)}>
                                    <p>{document.status}</p>
                                  </div>
                                  <div className='Actions'>
                                    <Tooltip title="View Document">
                                      <button className="View" onClick={() => openDoc(document.document_id)}><GrIcons.GrView size={'20px'}/></button>
                                    </Tooltip>
                                    <Tooltip title="Edit Document">
                                      <button className="Edit" onClick={() => openEdit({ id: document.document_id })}><FaIcons.FaRegEdit size={'20px'}/></button>
                                    </Tooltip>
                                    <Tooltip title="Archive Document">
                                      <button className="Archive" onClick={() => handleArchiveFile({ document_id: document.document_id, file_Name: document.document_Name, status: document.status })}><GoIcons.GoArchive size={'20px'}/></button>
                                    </Tooltip>
                                  </div>
                                </div>
                                <Collapse in={openRow === document.document_id} timeout={'auto'} unmountOnExit>
                                  <div className="Table_Body_Other_Details">
                                      <div className='Other_Details'>
                                        <span>Description:</span>
                                        <p>{document.description}</p>
                                      </div>
                                      <div className='Other_Details'>
                                        <span>Comment:</span>
                                        <p>{document.comment ? document.comment : <p style={{color: '#A5A6A6'}}>N/A</p>}</p>
                                      </div>
                                      <div className="Other_Details">
                                        <span>Tracker:</span>
                                        <div className="Tracker">
                                          {trackers && trackers.filter(tracker => tracker.document_id === document.document_id).length === 0 ? (
                                            <div className="Tracker_Item">
                                              <div className="Tracker_Add">
                                                <span onClick={() => handleOpenTracker(document.document_id)}>Add new</span>
                                              </div>
                                            </div>
                                          )
                                          :
                                          (
                                            <>
                                            {trackers && trackers.filter(tracker => tracker.document_id === document.document_id).map((tracker) => (
                                              <div className="Tracker_Item" key={tracker.tracker_id}>
                                                <div className="Tracker_Details">
                                                  <div className="Signature">
                                                    <img src={`${domain}${signatureFiles}/${tracker.tracker_id}-signature.png`} alt="" />
                                                  </div>
                                                  <p className="Tracker_Date">
                                                    {new Date(tracker.date_Created).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                                                  </p>
                                                  <p className="Tracker_Label">
                                                    {tracker.traker_label}
                                                  </p>
                                                </div>
                                                <div className="Right_Arrow">
                                                  <MdIcons.MdKeyboardDoubleArrowRight size={'30px'}/>
                                                </div>
                                              </div>
                                            ))}
                                              
                                              <div className="Tracker_Item">
                                                <div className="Tracker_Add">
                                                  <span onClick={() => handleOpenTracker(document.document_id)}>Add new</span>
                                                </div>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                  </div>
                                </Collapse>
                              </div>
                            ))}
                          </React.Fragment>
                          )
                          :
                          (
                            <div className="Table_Empty">
                              <div className="Empty_Image">
                                <img src={noResult} alt="No Result" />
                              </div>
                              <div className="Empty_Labels">
                                <span className="Main_Label">NO DOCUMENTS FOUND!</span>
                                <span className="Sub_Label">Click the add new document button to add documents.</span>
                              </div>
                            </div>
                          )
                          }
                        </div>
                        
                      </React.Fragment>
                    )
                    :
                    (
                      <React.Fragment>
                        <div className="Table_Row_Container_Mobile">
                          <React.Fragment>
                            {documents.map((document) => (
                              <div className="Table_Row" key={document.document_id}>
                                <div className="Table_Header_Container">
                                  <div className="Tabler_Header">
                                    <span className='Table_Header_Label'>Document Name:</span>
                                    <p>{document.document_Name}</p>
                                  </div>
                                  <div className="Tabler_Header">
                                    <span className='Table_Header_Label'>Document Type:</span>
                                    <p>{document.document_Type}</p>
                                  </div>
                                  <div className="Tabler_Header">
                                    <span className='Table_Header_Label'>Received By:</span>
                                    <p>{document.received_By}</p>
                                  </div>
                                  <div className="Tabler_Header">
                                    <span className='Table_Header_Label'>Office/Dept:</span>
                                    <p>{document.office_Dept}</p>
                                  </div>
                                  <div className="Tabler_Header">
                                    <span className='Table_Header_Label'>Date Received:</span>
                                    <p>{document.date_Received}</p>
                                  </div>
                                  <div className="Tabler_Header">
                                    <span className='Table_Header_Label'>Status:</span>
                                    <p className={`Status ${document.status === "Approved" ? "Approved" : document.status === "Pending" ? "Ongoing" : document.status === "Rejected" ? "Rejected" : ''}`}>
                                      {document.status}
                                    </p>
                                  </div>
                                  <div className="Tabler_Header">
                                    <span className='Table_Header_Label'>Action:</span>
                                    <div className='Actions'>
                                        <Tooltip title="View Document">
                                          <button className="Action View" onClick={() => openDoc(document.document_id)}><GrIcons.GrView size={'20px'}/></button>
                                        </Tooltip>
                                        <Tooltip title="Edit Document">
                                          <button className="Action Edit" onClick={() => openEdit({ id: document.document_id })}><FaIcons.FaRegEdit size={'20px'}/></button>
                                        </Tooltip>
                                        <Tooltip title="Archive Document">
                                          <button className="Action Archive"><GoIcons.GoArchive size={'20px'}/></button>
                                        </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </React.Fragment>
                        </div>
                      </React.Fragment>
                    )
                    }
                    
                  </div>
              </React.Fragment>
            ) 
            : 
            (
              <div className="Loader">
                <LoadingInfinite width='150px' height='150px'/>
              </div>
            )} 
            
            
            
        </div>
        <div className="Table_Pagination">
          <button className='Pagination_Previous'>Previous</button>
          <button className='Pagination_Next'>Next</button>
        </div>
      </div>
    </section>
  )
}

export default MonitoringTable