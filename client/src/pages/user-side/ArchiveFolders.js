import React, { useContext, useEffect, useState } from 'react'
import '../../styles/archive_folders.css'
import { PageHeader } from '../../components'

// Icons
import * as IoIcons from 'react-icons/io'

import { Collapse } from '@mui/material'
import { Link } from 'react-router-dom'
import { getArchiveDocuments } from '../../utils'
import toast from 'react-hot-toast'
import { NotificationContext } from '../../context/context'

import noResult from '../../assets/images/noResult.png'
import { LoadingInfinite } from '../../assets/svg'

function ArchiveFolders() {
    const [collapseYear, setCollpaseYear] = useState('')

    const {
      user
    } = useContext(NotificationContext)

    //GetArchives Stuff
    const [isLoading, setIsLoading] = useState(false)
    const [archivedDocuments, setArchivedDocuments] = useState([])
    const [years, setYears] = useState([])

    //Get Archive Data
    const getArchives = async() => {
      setIsLoading(true)
      const res = await getArchiveDocuments()
      
      if(res?.status === 200){
        if(user){
          setIsLoading(false)

          if(user.role !== 'Faculty'){
            setArchivedDocuments(res.data?.archives)
          }
          else{
            const documents = res.data?.archives
            const filteredDocuments = documents.filter(document => 
              document.forward_To === user.full_Name ||
              document.forwarded_By === user.user_id ||
              document.accepted_Rejected_By === user.user_id
            )
            
            setArchivedDocuments(filteredDocuments)
          }
        }
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
    }, [])

    useEffect(() => {
      getArchives()
    }, [user])

    useEffect(() => {
      getYears()
    }, [archivedDocuments])

  return (
    <section id='Archive_Folders' className='Archive_Folders'>
        <div className="wrapper">
          <PageHeader page={"Archive"}/>
          {!isLoading ? (
            <>
              {archivedDocuments.length > 0 ? (
                <div className="Folders_Container">
                  {years.map((year) => (
                    <div key={year} className={collapseYear === year ? "Folder_Year_Grid active" : "Folder_Year_Grid"} onClick={() => toggleCollapse(year)}>
                      <div className="Folder_Year">
                        <h3>Year <span style={{color: "#FF8911"}}>&#183;</span> {year}</h3>
                      </div>
                      <Collapse in={collapseYear === year} timeout={'auto'} unmountOnExit>
                        <div className="Folder_Grid">
                          {getUniqueDocumentTypes(year).map((documentType, index) => (
                            <Link key={index} to={`/Archive/Tables/${year}/${documentType}`} className="Folder">
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
              )
              :
              (
                <div className="Archive_Folder_Empty">
                  <div className="Empty_Image">
                    <img src={noResult} alt="no Result" />
                  </div>
                  <div className="Empty_Label">
                    <span className='Main_Label'>NO DOCUMENTS FOUND!</span>
                    <span className="Sub_Label">No archived documents found.</span>
                  </div>

                </div>
              )
              }
            </>
          )
          :
          (
            <div className="Archive_Folder_Empty">
              <div className="Loader">
                <LoadingInfinite width='100px' height='100px'/>
              </div>
            </div>
          )
          }
          
          
        </div>
    </section>
  )
}

export default ArchiveFolders