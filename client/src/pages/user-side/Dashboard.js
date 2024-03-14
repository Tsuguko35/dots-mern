import React, { useContext, useEffect, useState } from 'react'
import '../../styles/dashboard.css'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { ArchiveTable, Dash_BarChart, Dash_DoughnutChart, Dash_PendingBar, PageHeader } from '../../components'
import welcomeIMG from '../../assets/images/welcomeIMG.png'

// Icons
import * as HiIcons from 'react-icons/hi'
import * as MdIcons from 'react-icons/md'
import { getArchiveDocuments, getTableData } from '../../utils'
import { NotificationContext } from '../../context/context'

function Dashboard() {
  const navigate = useNavigate()
  const {
    user
  } = useContext(NotificationContext)
  const userDetails = user
  const [documents, setDocuments] = useState([])
  const [documentsToFilter, setDocumentsToFilter] = useState([])
  const [filters, setFilters] = useState({
    searchFilter: '',
    docuNameFilter: '',
    docuTypeFilter: '',
    docuReceivedBy: '',
    officeDeptFilter: '',
    dateReceivedFilter: '',
    statusFilter: '',
  })

  const [documentCounts, setDocumentCounts] = useState({
    archive: 0,
    today: 0,
    month: 0,
    year: 0
  })

  const getDocumentCounts = async() => {
    const docsRes = await getTableData({ documentType: 'All' })
    const archiveRes = await getArchiveDocuments()

    let counts = {
      archive: 0,
      today: 0,
      month: 0,
      year: 0
    }

    if(docsRes?.status === 200){
      setDocumentsToFilter(docsRes.data?.documents)
      const currentDate = new Date();
      let documentsArray = []
      if(userDetails.role === 'Faculty'){
        const documents = docsRes.data?.documents
        documentsArray = documents.filter(document => 
          document.forward_To === userDetails.user_id || (document.forward_To.includes(userDetails.role) && !document.forward_To.includes(userDetails.user_id)) || (document.forward_To.includes('All') && !document.forward_To.includes(userDetails.user_id))
        )
      }
      else{
        documentsArray = docsRes.data?.documents
      }
      const todayCount = documentsArray.filter(document => isSameDay(new Date(document.date_Received), currentDate)).length;
      counts.today = todayCount
    
      const monthCount = documentsArray.filter(document => isSameMonth(new Date(document.date_Received), currentDate)).length;
      counts.month = monthCount
    
      const yearCount = documentsArray.filter(document => isSameYear(new Date(document.date_Received), currentDate)).length;
      counts.year = yearCount
    }
    else{
      toast.error(docsRes.errorMessage)
    }

    if(archiveRes?.status === 200){
      let archiveArray = []
      if(userDetails.role === 'Faculty'){
        const archives = archiveRes.data?.archives
        archiveArray = archives.filter(document => 
          document.forward_To === userDetails.user_id || (document.forward_To.includes(userDetails.role) && !document.forward_To.includes(userDetails.user_id)) || (document.forward_To.includes('All') && !document.forward_To.includes(userDetails.user_id))
        )
      }
      else{
        archiveArray = archiveRes.data?.archives
      }
      const archiveCount = archiveArray.length
      counts.archive = archiveCount
    }

    setDocumentCounts(counts)
  }

  // Helper functions to check date conditions
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }

  const isSameMonth = (date1, date2) => {
    return date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }

  const isSameYear = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear();
  }

  const getDashboardData = () => {
    getDocumentCounts()
  }

  useEffect(() => {
    document.title = 'Dashboard'
    getDashboardData()
  }, [])

  useEffect(() => {
    console.log(documentCounts);
  }, [documentCounts])

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
        document.forward_To === userDetails.user_id || (document.forward_To.includes(userDetails.role) && !document.forward_To.includes(userDetails.user_id))
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

  return (
    <section id='Dashboard' className='Dashboard'>
      <div className="wrapper">
        <PageHeader page={"Dashboard"}/>
        
        <div className="Dashboard_Grids">
          <div className="Dashboard_Grid_Container Top">
            <div className="Dashboard_Grid_Card Welcome">
              <img src={welcomeIMG} alt="" />
              <div className="Weclome_Msg">
                <p className='Welcome'>Welcome, <span>{userDetails.role}</span></p>
                <span className='Name'>{userDetails.full_Name}</span>
              </div>
            </div>
            <div className="Dashboard_Grid_Card Archive">
              <div className="Card_Icon">
                <HiIcons.HiArchive />
              </div>
              <div className="Card_Label">
                <p>{documentCounts.archive || 0}</p>
                <span className='span1'>{documentCounts.archive === 1 ? 'Document' : 'Documents'}</span>
                <span className='span2'>Archived</span>
              </div>
            </div>
            <div className="Dashboard_Grid_Card DocToday">
              <div className="Card_Icon">
                <MdIcons.MdToday />
              </div>
              <div className="Card_Label">
                <p>{documentCounts.today || 0}</p>
                <span className='span1'>{documentCounts.today === 1 ? 'Document' : 'Documents'}</span>
                <span className='span2'>Today</span>
              </div>
            </div>
            <div className="Dashboard_Grid_Card DocMonth">
              <div className="Card_Icon">
                <MdIcons.MdCalendarMonth />
              </div>
              <div className="Card_Label">
                <p>{documentCounts.month || 0}</p>
                <span className='span1'>{documentCounts.month === 1 ? 'Document' : 'Documents'}</span>
                <span className='span2'>This Month</span>
              </div>
            </div>
            <div className="Dashboard_Grid_Card DocYear">
              <div className="Card_Icon">
                <MdIcons.MdCalendarToday />
              </div>
              <div className="Card_Label">
                <p>{documentCounts.year || 0}</p>
                <span className='span1'>{documentCounts.year === 1 ? 'Document' : 'Documents'}</span>
                <span className='span2'>This Year</span>
              </div>
            </div>
          </div>
          <div className={`Dashboard_Grid_Container Middle ${userDetails.role === 'Faculty' && 'Faculty'}`}>
            <div className="Dashboard_Grid_Card Graph1">
              <div className="Chart_Wrapper">
                <Dash_PendingBar userDetails={userDetails}/>
              </div>
            </div>
            {userDetails.role !== 'Faculty' && (
              <div className="Dashboard_Grid_Card Graph2">
                <div className="Chart_Wrapper">
                  <Dash_DoughnutChart/>
                </div>
              </div>
            )}
            {userDetails.role !== 'Faculty' && (
              <div className="Dashboard_Grid_Card Graph3">
                <div className="Chart_Wrapper">
                  <Dash_BarChart/>
                </div>
              </div>
            )}
            <div className="Dashboard_Grid_Card Graph4 Calendar">
              <div className="Chart_Wrapper">
                <iframe className='Calendar' src="https://calendar.google.com/calendar/embed?src=carpio.johnjazpher.dc.3188%40gmail.com&ctz=Asia%2FManila" frameBorder="0" scrolling="no"></iframe>
              </div>
            </div>
          </div>
          {userDetails.role !== 'Faculty' && (
            <div className="Dashboard_Grid_Container Bottom">
              <div className="Dashboard_Grid_Card Box1">
                <div className="Box_Wrapper">
                  <div className="Box_Title">
                    <span>Travel Orders</span>
                    <div className="Labels">
                      <span>Name</span>
                      <span>Count</span>
                    </div>
                  </div>
                  <div className="Box_Content">
                  {
                    documentsToFilter.filter(documents => documents.document_Type === 'Travel Order').length === 0 ? (
                      <div className="Content">
                          <div className="Name">
                              <p>N/A</p>
                          </div>
                          <div className="Count">
                              <p>N/A</p>
                          </div>
                      </div>
                    ) : (
                        documentsToFilter.filter(documents => documents.document_Type === 'Travel Order').map(document => (
                            <div className="Content" key={document.document_id}>
                                <div className="Name">
                                    <p>{document.contact_Person}</p>
                                </div>
                                <div className="Count">
                                    <p>{documentsToFilter.filter(doc => doc.document_Type === 'Travel Order' && doc.contact_Person === document.contact_Person).length}</p>
                                </div>
                            </div>
                        ))
                    )
                  }
                  </div>
                </div>
              </div>
              <div className="Dashboard_Grid_Card Box2">
                <div className="Box_Wrapper">
                  <div className="Box_Title">
                    <span>Faculty Training</span>
                    <div className="Labels">
                      <span>Name</span>
                      <span>Count</span>
                    </div>
                  </div>
                  <div className="Box_Content">
                  {
                    documentsToFilter.filter(documents => documents.document_Type === 'Application for Leave').length === 0 ? (
                      <div className="Content">
                          <div className="Name">
                              <p>N/A</p>
                          </div>
                          <div className="Count">
                              <p>N/A</p>
                          </div>
                      </div>
                    ) : (
                      documentsToFilter.filter(documents => documents.document_Type === 'Application for Leave').map(document => (
                            <div className="Content" key={document.document_id}>
                                <div className="Name">
                                    <p>{document.contact_Person}</p>
                                </div>
                                <div className="Count">
                                    <p>{documentsToFilter.filter(doc => doc.document_Type === 'Application for Leave' && doc.contact_Person === document.contact_Person).length}</p>
                                </div>
                            </div>
                        ))
                    )
                  }
                  </div>
                </div>
              </div>
              <div className="Dashboard_Grid_Card Box3">
                <div className="Box_Wrapper">
                  <div className="Box_Title">
                    <span>Faculty Leave</span>
                    <div className="Labels">
                      <span>Name</span>
                      <span>Count</span>
                    </div>
                  </div>
                  <div className="Box_Content">
                  {
                    documentsToFilter.filter(documents => documents.document_Type === 'Training Request Form').length === 0 ? (
                      <div className="Content">
                          <div className="Name">
                              <p>N/A</p>
                          </div>
                          <div className="Count">
                              <p>N/A</p>
                          </div>
                      </div>
                    ) : (
                        documentsToFilter.filter(documents => documents.document_Type === 'Training Request Form').map(document => (
                            <div className="Content" key={document.document_id}>
                                <div className="Name">
                                    <p>{document.contact_Person}</p>
                                </div>
                                <div className="Count">
                                    <p>{documentsToFilter.filter(doc => doc.document_Type === 'Training Request Form' && doc.contact_Person === document.contact_Person).length}</p>
                                </div>
                            </div>
                        ))
                    )
                  }
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
        <div className="Dashboard_Table_Container">
          <div className="Dashboard_Table">
            <ArchiveTable  setFilter={setFilters} filters={filters} documents={documents}/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard