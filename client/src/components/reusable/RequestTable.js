import React, {useState} from 'react'
import '../../styles/requests_table.css'

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as LuIcons from 'react-icons/lu'
import * as HiIcons from 'react-icons/hi'
import * as GoIcons from 'react-icons/go'
import * as GrIcons from 'react-icons/gr'
import * as MdIcons from 'react-icons/md'
import * as CiIcons from 'react-icons/ci'
import { Collapse, InputAdornment, TextField, Tooltip } from '@mui/material'
import { LoadingInfinite } from '../../assets/svg'

function RequestTable({documentType}) {
  const [rotation, setRotation] = useState(0);
  const [openRow, setOpenRow] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

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
  return (
    <section id='Requests_Table' className='Requests_Table'>
      <div className="wrapper">
        <div className="Table_Top">
          <div className="Table_Top_Right">
            <TextField
              className = "table-input"
              size="small"
              variant="outlined"
              InputProps={{
                placeholder: "Document Name, Description",
                startAdornment: (
                  <InputAdornment position="start">
                    <IoIcons.IoIosSearch size={'20px'}/>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="Table_Container">
            <div className="Table">
              <div className="Table_Header_Container">
                <div className="Tabler_Header">
                  <span className='Table_Header_Label'>Document Name</span>
                  <span className='Table_Header_Filter'><HiIcons.HiFilter size={'25px'}/></span>
                </div>
                <div className="Tabler_Header">
                  <span className='Table_Header_Label'>Received By</span>
                  <span className='Table_Header_Filter'><HiIcons.HiFilter size={'25px'}/></span>
                </div>
                <div className="Tabler_Header">
                  <span className='Table_Header_Label'>Office/Dept</span>
                  <span className='Table_Header_Filter'><HiIcons.HiFilter size={'25px'}/></span>
                </div>
                <div className="Tabler_Header">
                  <span className='Table_Header_Label'>Date Received</span>
                  <span className='Table_Header_Filter'><HiIcons.HiFilter size={'25px'}/></span>
                </div>
                <div className="Tabler_Header">
                  <span className='Table_Header_Label'>Status</span>
                  <span className='Table_Header_Filter'><HiIcons.HiFilter size={'25px'}/></span>
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
                        <div onClick={() => openToggleRow(1)}>
                          <p>Jazpher Carpio</p>
                        </div>
                        <div onClick={() => openToggleRow(1)}>
                          <p>CICT</p>
                        </div>
                        <div onClick={() => openToggleRow(1)}>
                          <p>Today</p>
                        </div>
                        <div className='Status Ongoing' onClick={() => openToggleRow(1)}>
                          <p>Ongoing</p>
                        </div>
                        <div className='Actions'>
                          <Tooltip title="View Document">
                            <button className="View"><GrIcons.GrView size={'20px'}/></button>
                          </Tooltip>
                          <Tooltip title="Forward Document">
                            <button className="Edit"><LuIcons.LuForward size={'20px'}/></button>
                          </Tooltip>
                        </div>
                      </div>
                      <Collapse in={openRow === 1} timeout={'auto'} unmountOnExit>
                        <div className="Table_Body_Other_Details">
                            <div className='Other_Details'>
                              <span>Description:</span>
                              <p></p>
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