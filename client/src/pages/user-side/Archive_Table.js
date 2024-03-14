import React, { useEffect, useState } from 'react'
import { ArchiveTable, PageHeader } from '../../components'
import '../../styles/archive_table.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getArchiveDocuments, getTrackers } from '../../utils'
import toast from 'react-hot-toast'


function Archive_Table() {
    const navigate = useNavigate()
    const { year, archiveType } = useParams()
    const [filters, setFilters] = useState({
      searchFilter: '',
      docuNameFilter: '',
      docuTypeFilter: '',
      docuReceivedBy: '',
      officeDeptFilter: '',
      dateReceivedFilter: '',
      statusFilter: '',
    })
    //GetArchives Stuff
    const [isLoading, setIsLoading] = useState(false)

    const [trackers, setTrackers] = useState([])
    const [archivedDocumentsToFilter, setArchivedDocumentsToFilter] = useState([])
    const [archivedDocuments, setArchivedDocuments] = useState([])

    //Get Archive Data
    const getArchives = async() => {
      setIsLoading(true)
      const res = await getArchiveDocuments()
      
      if(res?.status === 200){
        setIsLoading(false)
        setArchivedDocumentsToFilter(res.data?.archives)
      }
      else(
        toast.error('An error occured while fetching data.')
      )

    }

    const getTrackerData = async() => {
      const trackerRes = await getTrackers()
      if(trackerRes?.status === 200) {
        if(trackerRes.data?.hasData === true){
          const sortedTrackers = trackerRes.data.trackers.sort((a, b) => {
            // Convert date strings to Date objects for comparison
            const dateA = new Date(a.date_Created);
            const dateB = new Date(b.date_Created);
            
            // Compare dates
            return dateA - dateB; // Descending order
          });
    
          setTrackers(sortedTrackers);
        }
      }
      else{
        toast.error(trackerRes?.errorMessage)
      }
    }


    useEffect(() => {
      if(archivedDocumentsToFilter){
        const filteredDocs = archivedDocumentsToFilter.filter(document =>
          document.document_Type === archiveType
        ).filter(document => 
          document.date_Received.includes(year)
        ).filter(document => 
          document.document_Name.toLowerCase().includes(filters.searchFilter.toLowerCase()) ||
          document.description.toLowerCase().includes(filters.searchFilter.toLowerCase())
        ).filter(document => 
          document.document_Name.toLowerCase().includes(filters.docuNameFilter.toLowerCase())
        ).filter(document => 
          document.document_Type.toLowerCase().includes(filters.docuTypeFilter.toLowerCase())
        )
        .filter(document => 
          document.received_By.toLowerCase().includes(filters.docuReceivedBy.toLowerCase())
        )
        .filter(document => 
          document.office_Dept.toLowerCase().includes(filters.officeDeptFilter.toLowerCase())
        )
        .filter(document => 
          (document.date_Received.toLowerCase().includes(filters.dateReceivedFilter.toLowerCase()))
        )
        .filter(document => 
          document.status.toLowerCase().includes(filters.statusFilter.toLowerCase())
        )
    
        const sortedFilteredDocs = filteredDocs.sort((a, b) => {
          if (a.date_Received !== b.date_Received) {
              return new Date(b.date_Received + 'T' + b.time_Received) - new Date(a.date_Received + 'T' + a.time_Received);
          } else {
              return new Date(b.time_Received) - new Date(a.time_Received);
          }
        })
    
        setArchivedDocuments(sortedFilteredDocs);
      }
      else{
        setArchivedDocuments(archivedDocumentsToFilter);
      }
      
    }, [filters, archivedDocumentsToFilter])

    useEffect(() => {
        document.title = `${archiveType} Documents Archive`
        getArchives()
        getTrackerData()
    }, [])

    const refreshTrackers = () => {
      getTrackerData()
    }
  
  return (
    <section id='Archive_Table' className='Archive_Table'>
        <div className="wrapper">
          <PageHeader page={'Archive'}/>
          <div className="GoBack">
            <span onClick={() => navigate('/Archive/Folders')}>Folders</span>
            <p>{`>>`}</p>
            <p>{archiveType}</p>
          </div>
          <div className="Archive_Table_Container">
            <ArchiveTable documents={archivedDocuments} setFilter={setFilters} filters={filters} trackers={trackers} refreshTracker={refreshTrackers}/>
          </div>
        </div>
    </section>
  )
}

export default Archive_Table