import React, { useEffect, useState } from 'react'
import '../../styles/archive_folders.css'
import { PageHeader } from '../../components'

// Icons
import * as IoIcons from 'react-icons/io'

import { Collapse } from '@mui/material'
import { Link } from 'react-router-dom'
import { getArchiveDocuments } from '../../utils'
import toast from 'react-hot-toast'

function ArchiveFolders() {
    const [collapseYear, setCollpaseYear] = useState('')

    //GetArchives Stuff
    const [isLoading, setIsLoading] = useState(false)
    const [archivedDocuments, setArchivedDocuments] = useState([])
    const [years, setYears] = useState([])

    //Get Archive Data
    const getArchives = async() => {
      setIsLoading(true)
      const res = await getArchiveDocuments()
      
      if(res?.status === 200){
        setIsLoading(false)
        setArchivedDocuments(res.data?.archives)
      }
      else(
        toast.error('An error occured while fetching data.')
      )

    }

    const getYears = () => {
      const yearSet = new Set()
      archivedDocuments.forEach((document) => {
        const year = new Date(document.date_Received).getFullYear()
        yearSet.add(year)
      })

      // Sort in descending order
      const sortedYears = Array.from(yearSet).sort((a, b) => b - a); 

      setYears(sortedYears);
    }

    const getUniqueDocumentTypes = (year) => {
      const documentTypesSet = new Set();
      archivedDocuments.forEach((document) => {
          if (document.date_Received.includes(year)) {
              documentTypesSet.add(document.document_Type);
          }
      });
      return Array.from(documentTypesSet);
    };

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
        getArchives()
    }, [])

    useEffect(() => {
      getYears()
    }, [archivedDocuments])
  return (
    <section id='Archive_Folders' className='Archive_Folders'>
        <div className="wrapper">
          <PageHeader page={"Archive"}/>
          <div className="Folders_Container">
            {years.map((year) => (
              <div className={collapseYear === year ? "Folder_Year_Grid active" : "Folder_Year_Grid"} onClick={() => toggleCollapse(year)}>
                <div className="Folder_Year">
                  <h3>Year <span style={{color: "#FF8911"}}>&#183;</span> {year}</h3>
                </div>
                <Collapse in={collapseYear === year} timeout={'auto'} unmountOnExit>
                  <div className="Folder_Grid">
                    {getUniqueDocumentTypes(year).map((documentType) => (
                      <Link to={`/Archive/Tables/${year}/${documentType}`} className="Folder">
                        <div className="Folder_Icon">
                          <IoIcons.IoMdFolder size={'35px'}/>
                        </div>
                        <div className="Folder_Label">
                          <p>{documentType}</p>
                        </div>
                      </Link>
                    ))}
                    
                  </div>
                </Collapse>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}

export default ArchiveFolders