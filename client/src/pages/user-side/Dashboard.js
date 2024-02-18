import React, { useEffect } from 'react'
import '../../styles/dashboard.css'
import { logOutUser } from '../../context'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { PageHeader } from '../../components'

function Dashboard() {
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Dashboard'
  }, [])
  return (
    <section id='Dashboard' className='Dashboard'>
      <div className="wrapper">
        <PageHeader page={"Dashboard"}/>
        <div className="Dashboard_Grids">
          <div className="Dashboard_Grid_Container Top">
            <div className="Dashboard_Grid_Card Welcome">
              <p>Card</p>
            </div>
            <div className="Dashboard_Grid_Card Archive">
              <p>Card</p>
            </div>
            <div className="Dashboard_Grid_Card DocToday">
              <p>Card</p>
            </div>
            <div className="Dashboard_Grid_Card DocMonth">
              <p>Card</p>
            </div>
            <div className="Dashboard_Grid_Card DocYear">
              <p>Card</p>
            </div>
          </div>
          <div className="Dashboard_Grid_Container Middle">
            <div className="Dashboard_Grid_Card Graph1">
              <p>Card</p>
            </div>
            <div className="Dashboard_Grid_Card Graph2">
              <p>Card</p>
            </div>
            <div className="Dashboard_Grid_Card Graph3">
              <p>Card</p>
            </div>
            <div className="Dashboard_Grid_Card Graph4">
              <p>Card</p>
            </div>
          </div>
        </div>
        <div className="Dashboard_Table_Container">
          <div className="Dashboard_Table">
            <span>Table</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard