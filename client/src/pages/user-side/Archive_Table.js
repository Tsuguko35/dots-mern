import React, { useEffect } from 'react'
import { ArchiveTable, PageHeader } from '../../components'
import '../../styles/archive_table.css'
import { useNavigate } from 'react-router-dom'


function Archive_Table() {
    const navigate = useNavigate()
    useEffect(() => {
        document.title = `Archve Table`
    }, [])
  return (
    <section id='Archive_Table' className='Archive_Table'>
        <div className="wrapper">
          <PageHeader page={'Archive'}/>
          <div className="GoBack">
            <span onClick={() => navigate('/Archive/Folders')}>Folders</span>
            <p>{`>>`}</p>
            <p>{`Student Documents`}</p>
          </div>
          <div className="Archive_Table_Container">
            <ArchiveTable />
          </div>
        </div>
    </section>
  )
}

export default Archive_Table