import React, { useEffect } from 'react'
import '../../styles/monitoring.css'
import { MonitoringTable, PageHeader } from '../../components'
import { useParams } from 'react-router-dom'

function Monitoring() {
    const { monitoringType } = useParams()
    useEffect(() => {
        document.title = `Monitoring`
    }, [])
  return (
    <section id='Monitoring' className='Monitoring'>
        <div className="wrapper">
          <PageHeader page={'Monitoring'}/>
          <div className="Monitoring_Table_Container">
            <MonitoringTable documentType={`${monitoringType}`}/>
          </div>
        </div>
    </section>
  )
}

export default Monitoring