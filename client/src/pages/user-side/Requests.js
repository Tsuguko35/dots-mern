import React, { useEffect, useState } from 'react'
import { PageHeader, RequestTable } from '../../components'
import '../../styles/requests.css'

function Requests() {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        document.title = `Requests`
    }, [])
  return (
    <section id='Requests' className='Requests'>
        <div className="wrapper">
          <PageHeader page={'Requests'}/>
          <div className="Requests_Table_Container">
            <RequestTable />
          </div>
        </div>
    </section>
  )
}

export default Requests