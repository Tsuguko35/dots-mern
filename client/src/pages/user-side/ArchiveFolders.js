import React, { useEffect, useState } from 'react'
import '../../styles/archive_folders.css'
import { PageHeader } from '../../components'

// Icons
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as LuIcons from 'react-icons/lu'
import * as HiIcons from 'react-icons/hi'
import * as GoIcons from 'react-icons/go'
import * as MdIcons from 'react-icons/md'
import * as CiIcons from 'react-icons/ci'
import { Collapse } from '@mui/material'
import { Link } from 'react-router-dom'

function ArchiveFolders() {
    const [collapseYear, setCollpaseYear] = useState('')

    const toggleCollapse = (year) => {
      if(collapseYear === year){
        setCollpaseYear('')
      }
      else{
        setCollpaseYear(year)
      }
    }
    useEffect(() => {
        document.title = `Archive`
    }, [])
  return (
    <section id='Archive_Folders' className='Archive_Folders'>
        <div className="wrapper">
          <PageHeader page={"Archive"}/>
          <div className="Folders_Container">
            <div className={collapseYear === 2024 ? "Folder_Year_Grid active" : "Folder_Year_Grid"}>
              <div className="Folder_Year" onClick={() => toggleCollapse(2024)}>
                <h3>Year <span style={{color: "#FF8911"}}>&#183;</span> 2024</h3>
              </div>
              <Collapse in={collapseYear === 2024} timeout={'auto'} unmountOnExit>
                <div className="Folder_Grid">
                  <Link to={`/Archive/Tables`} className="Folder">
                    <div className="Folder_Icon">
                      <IoIcons.IoMdFolder size={'35px'}/>
                    </div>
                    <div className="Folder_Label">
                      <p>Student Documents</p>
                    </div>
                  </Link>
                  <Link to={`/Archive/Tables`} className="Folder">
                    <div className="Folder_Icon">
                      <IoIcons.IoMdFolder size={'35px'}/>
                    </div>
                    <div className="Folder_Label">
                      <p>Student Documents</p>
                    </div>
                  </Link>
                  <Link to={`/Archive/Tables`} className="Folder">
                    <div className="Folder_Icon">
                      <IoIcons.IoMdFolder size={'35px'}/>
                    </div>
                    <div className="Folder_Label">
                      <p>Student Documentssssssssssssssss</p>
                    </div>
                  </Link>

                  <Link to={`/Archive/Tables`} className="Folder">
                    <div className="Folder_Icon">
                      <IoIcons.IoMdFolder size={'35px'}/>
                    </div>
                    <div className="Folder_Label">
                      <p>Student Documents</p>
                    </div>
                  </Link>
                  <Link to={`/Archive/Tables`} className="Folder">
                    <div className="Folder_Icon">
                      <IoIcons.IoMdFolder size={'35px'}/>
                    </div>
                    <div className="Folder_Label">
                      <p>Student Documents</p>
                    </div>
                  </Link>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
    </section>
  )
}

export default ArchiveFolders