import React, { useContext, useEffect, useState } from 'react'
import { PageHeader, RequestTable } from '../../components'
import '../../styles/requests.css'
import { useParams } from 'react-router-dom'
import { getAllUsers, getTableData } from '../../utils'
import toast from 'react-hot-toast'
import { NotificationContext } from '../../context/context'

function Requests() {
    const [documentsToFilter, setDocumentsToFilter] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [ documents, setDocuments ] = useState([])
    const [users, setUsers] = useState([])
    const userDetails = JSON.parse(window.localStorage.getItem('profile')) || {}
    const { requestType } = useParams()
    const [filters, setFilters] = useState({
      searchFilter: '',
      docuNameFilter: '',
      docuTypeFilter: '',
      docuReceivedBy: '',
      officeDeptFilter: '',
      dateReceivedFilter: '',
      statusFilter: '',
    })
    //Notifications
    const {
      notifications,
      setNotifications
    } = useContext(NotificationContext)

    //Get table data
    const getTableDocuments = async() => {
      setIsLoading(true)
      const res = await getTableData({ documentType: requestType })
      
      if(res?.status === 200){
        setIsLoading(false)
        setDocumentsToFilter(res.data?.documents)
      }
      else(
        toast.error('An error occured while fetching data.')
      )

    }

    const getUserOptions = async() => {
      const res = await getAllUsers()
      if(res?.status === 200){
        setUsers(res.data?.users)
      }
      else(
        toast.error('An error occured while fetching data.')
      )
    }
    
    useEffect(() => {
      if(documentsToFilter){
        const filteredDocs = documentsToFilter.filter(document => 
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
        .filter(document => 
          document.forward_To === userDetails.user_id || (document.forward_To.includes(userDetails.role) && !document.forward_To.includes(userDetails.user_id)) || (document.forward_To.includes('All') && !document.forward_To.includes(userDetails.user_id))
        )

        const sortedFilteredDocs = filteredDocs.sort((a, b) => {
          if (a.date_Received !== b.date_Received) {
              return new Date(b.date_Received + 'T' + b.time_Received) - new Date(a.date_Received + 'T' + a.time_Received);
          } else {
              return new Date(b.time_Received) - new Date(a.time_Received);
          }
        })
    
        setDocuments(sortedFilteredDocs);
      }
      else{
        setDocuments(documentsToFilter);
      }
      
    }, [filters, documentsToFilter])

    useEffect(() => {
        document.title = `Requests`
        getTableDocuments()
        getUserOptions()
    }, [requestType, notifications])

  return (
    <section id='Requests' className='Requests'>
        <div className="wrapper">
          <PageHeader page={'Requests'}/>
          <div className="Requests_Table_Container">
            <RequestTable documentType={requestType} documents={documents} setFilter={setFilters} filters={filters} getTableDcuments={getTableDocuments}/>
          </div>
        </div>
    </section>
  )
}

export default Requests