import React, { useEffect, useState } from 'react'
import { ArchiveTable, PageHeader } from '../../components'
import '../../styles/archive_table.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getArchiveDocuments } from '../../utils'
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
    
        // Now, set the filtered documents to your state.
        setArchivedDocuments(filteredDocs);
      }
      else{
        setArchivedDocuments(archivedDocumentsToFilter);
      }
      
    }, [filters, archivedDocumentsToFilter])

    useEffect(() => {
        document.title = `${archiveType} Documents Archive`
        getArchives()
    }, [])
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
            <ArchiveTable documents={archivedDocuments} setFilter={setFilters} filters={filters}/>
          </div>
        </div>
    </section>
  )
}

export default Archive_Table