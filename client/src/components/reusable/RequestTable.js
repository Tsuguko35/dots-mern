import React, {useState} from 'react'
import '../../styles/requests_table.css'

import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import * as Io5Icons from 'react-icons/io5'
import * as HiIcons from 'react-icons/hi'
import * as MdIcons from 'react-icons/md'
import * as GrIcons from 'react-icons/gr'
import * as TiIcons from 'react-icons/ti'
import * as BsIcons from 'react-icons/bs'
import { Collapse, InputAdornment, TextField, Tooltip } from '@mui/material'
import { LoadingInfinite } from '../../assets/svg'
import { GetWindowWidth } from '../../utils'
import View_Document_Dialog from '../dialog modals/View_Document_Dialog'
import Request_Dialog from '../dialog modals/Request_Dialog'

function RequestTable({documentType}) {
  const [rotation, setRotation] = useState(0);
  const [openRow, setOpenRow] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [openViewDoc, setOpenViewDoc] = useState(false)
  const [requestDetails, setRequestDetails] = useState({
    show: false,
    action: ''
  })
  const windowWidth = GetWindowWidth()

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

  const openDoc = (props) => {
    setOpenViewDoc(true)
  }

  const showFilterIcon = (props) => {
    if(document.getElementById(props).style.display == 'block'){
      document.getElementById(props).style.display = 'none'
    }
    else{
      document.getElementById(props).style.display = 'block'
    }
  }

  const openRequest = (props) => {
    setRequestDetails({
      show: true,
      action: props.action
    })
  }

  return (
    <section id='Requests_Table' className='Requests_Table'>
      {/* Request Dialog */}
      <Request_Dialog action={requestDetails.action} openRequest={requestDetails.show} closeRequest={setRequestDetails}/>

      {/* View Document */}
      <View_Document_Dialog openViewDoc={openViewDoc} setOpenViewDoc={setOpenViewDoc}/>

      <div className="wrapper">
        <div className="Table_Top">
          <div className="Table_Top_Right">
          <div className="Input_Group">
              <div className="Custom_Search">
                  <div className="Icon">
                      <IoIcons.IoIosSearch size={'20px'}/>
                  </div>
                  <input className='Input' type="text" placeholder='Search...'/>
              </div>
            </div>
          </div>
        </div>
        <div className="Table_Container">
            <div className="Table">
              { windowWidth > 540 ? (
                <React.Fragment>
                  <div className="Table_Header_Container">
                    <div className="Tabler_Header" onMouseEnter={() => showFilterIcon('FilterDocName')} onMouseLeave={() => showFilterIcon('FilterDocName')}>
                      <span className='Table_Header_Label'>Document Name</span>
                      <span id='FilterDocName' className='Table_Header_Filter' style={{display:'none'}}><HiIcons.HiFilter size={'25px'}/></span>
                    </div>
                    <div className="Tabler_Header ReceivedBy" onMouseEnter={() => showFilterIcon('FilterReceivedBy')} onMouseLeave={() => showFilterIcon('FilterReceivedBy')}>
                      <span className='Table_Header_Label'>Received By</span>
                      <span id='FilterReceivedBy' className='Table_Header_Filter' style={{display:'none'}}><HiIcons.HiFilter size={'25px'}/></span>
                    </div>
                    <div className="Tabler_Header OfficeDept" onMouseEnter={() => showFilterIcon('FilterOfficeDept')} onMouseLeave={() => showFilterIcon('FilterOfficeDept')}>
                      <span className='Table_Header_Label'>Office/Dept</span>
                      <span id='FilterOfficeDept' className='Table_Header_Filter' style={{display:'none'}}><HiIcons.HiFilter size={'25px'}/></span>
                    </div>
                    <div className="Tabler_Header DateReceived" onMouseEnter={() => showFilterIcon('FilterDate')} onMouseLeave={() => showFilterIcon('FilterDate')}>
                      <span className='Table_Header_Label'>Date Received</span>
                      <span id='FilterDate' className='Table_Header_Filter' style={{display:'none'}}><HiIcons.HiFilter size={'25px'}/></span>
                    </div>
                    <div className="Tabler_Header" onMouseEnter={() => showFilterIcon('FilterStatus')} onMouseLeave={() => showFilterIcon('FilterStatus')}>
                      <span className='Table_Header_Label'>Status</span>
                      <span id='FilterStatus' className='Table_Header_Filter' style={{display:'none'}}><HiIcons.HiFilter size={'25px'}/></span>
                    </div>
                    <div className="Tabler_Header">
                      <span className='Table_Header_Label'>Action</span>
                    </div>
                  </div>
                  <div className="Table_Body_Container">
                    {!isLoading ? (
                      <React.Fragment>
                        <div className="Table_Body_Row">
                          <div className="Table_Body_Details">
                            <div onClick={() => openToggleRow(1)}>
                              <p>Docu Namesssssssssssssssss</p>
                            </div>
                            <div onClick={() => openToggleRow(1)} className='ReceivedBy'>
                              <p>Jazpher Carpio</p>
                            </div>
                            <div onClick={() => openToggleRow(1)} className='OfficeDept'>
                              <p>CICT</p>
                            </div>
                            <div onClick={() => openToggleRow(1)} className='DateReceived'>
                              <p>Today</p>
                            </div>
                            <div className='Status Approved' onClick={() => openToggleRow(1)}>
                              <p>Approved</p>
                            </div>
                            <div className='Actions'>
                              <Tooltip title="View Document">
                                <button className="View" onClick={() => openDoc()}><GrIcons.GrView size={'20px'}/></button>
                              </Tooltip>
                              {documentType === 'Pending' ? (
                                <React.Fragment>
                                  <Tooltip title="Forward Document">
                                    <button className="Approve" onClick={() => openRequest({ action: 'Approve' })}><BsIcons.BsCheck2All size={'20px'}/></button>
                                  </Tooltip>
                                  <Tooltip title="Forward Document">
                                    <button className="Reject" onClick={() => openRequest({ action: 'Reject' })}><MdIcons.MdOutlineClose size={'20px'}/></button>
                                  </Tooltip>
                                </React.Fragment>
                              )
                              :documentType !== 'History' && (
                                <Tooltip title="Forward Document">
                                  <button className="Edit" onClick={() => openRequest({ action: 'Forward' })}><TiIcons.TiArrowForwardOutline size={'20px'}/></button>
                                </Tooltip>
                              )
                              }
                            </div>
                          </div>
                          <Collapse in={openRow === 1} timeout={'auto'} unmountOnExit>
                            <div className="Table_Body_Other_Details">
                                <div className='Other_Details'>
                                  <span>Description:</span>
                                  <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                </div>
                                <div className='Other_Details'>
                                  <span>Comment:</span>
                                  <p></p>
                                </div>
                                <div className="Other_Details">
                                  <span>Tracker:</span>
                                  <p></p>
                                </div>
                            </div>
                          </Collapse>
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
                </React.Fragment>
              )
              :
              (
                <React.Fragment>
                  <div className="Table_Row_Container_Mobile">
                    {!isLoading ? (
                      <React.Fragment>
                        <div className="Table_Row">
                          <div className="Table_Header_Container">
                            <div className="Tabler_Header">
                              <span className='Table_Header_Label'>Document Name:</span>
                              <p>Docu Namesssssssssssssssss</p>
                            </div>
                            <div className="Tabler_Header">
                              <span className='Table_Header_Label'>Received By:</span>
                              <p>Jazpher Carpio</p>
                            </div>
                            <div className="Tabler_Header">
                              <span className='Table_Header_Label'>Office/Dept:</span>
                              <p>CICT</p>
                            </div>
                            <div className="Tabler_Header">
                              <span className='Table_Header_Label'>Date Received:</span>
                              <p>Today</p>
                            </div>
                            <div className="Tabler_Header">
                              <span className='Table_Header_Label'>Status:</span>
                              <p className='Status Approved'>Approved</p>
                            </div>
                            <div className="Tabler_Header">
                              <span className='Table_Header_Label'>Action:</span>
                              <div className='Actions'>
                                  <Tooltip title="View Document" >
                                    <button className="Action View" onClick={() => openDoc()}><GrIcons.GrView size={'20px'}/></button>
                                  </Tooltip>
                                  {documentType === 'Pending' ? (
                                    <React.Fragment>
                                      <Tooltip title="Forward Document">
                                        <button className="Action Approve" onClick={() => openRequest({ action: 'Approve' })}><BsIcons.BsCheck2All size={'20px'}/></button>
                                      </Tooltip>
                                      <Tooltip title="Forward Document">
                                        <button className="Action Reject" onClick={() => openRequest({ action: 'Reject' })}><MdIcons.MdOutlineClose size={'20px'}/></button>
                                      </Tooltip>
                                    </React.Fragment>
                                    )
                                  : documentType !== 'History' && (
                                    <Tooltip title="Forward Document">
                                      <button className="Action Edit" onClick={() => openRequest({ action: 'Forward' })}><TiIcons.TiArrowForwardOutline size={'20px'}/></button>
                                    </Tooltip>
                                  )
                                  }
                              </div>
                            </div>
                          </div>
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
                </React.Fragment>
              )
              }
              
            </div>
        </div>
        <div className="Table_Pagination">
          <button className='Pagination_Previous'>Previous</button>
          <button className='Pagination_Next'>Next</button>
        </div>
      </div>
    </section>
  )
}

export default RequestTable