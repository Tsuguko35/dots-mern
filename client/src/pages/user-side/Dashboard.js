import React, { useEffect } from 'react'
import '../../styles/dashboard.css'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { PageHeader } from '../../components'
import welcomeIMG from '../../assets/images/welcomeIMG.png'

// Icons
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as LuIcons from 'react-icons/lu'
import * as HiIcons from 'react-icons/hi'
import * as GoIcons from 'react-icons/go'
import * as MdIcons from 'react-icons/md'
import * as CiIcons from 'react-icons/ci'

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
              <img src={welcomeIMG} alt="" />
              <div className="Weclome_Msg">
                <p className='Welcome'>Welcome, <span>SA</span></p>
                <span className='Name'>John Jazpher Carpio</span>
              </div>
            </div>
            <div className="Dashboard_Grid_Card Archive">
              <div className="Card_Icon">
                <HiIcons.HiArchive />
              </div>
              <div className="Card_Label">
                <span>Archived Docs</span>
                <p>25</p>
              </div>
            </div>
            <div className="Dashboard_Grid_Card DocToday">
              <div className="Card_Icon">
                <MdIcons.MdToday />
              </div>
              <div className="Card_Label">
                <span>Docs Today</span>
                <p>25</p>
              </div>
            </div>
            <div className="Dashboard_Grid_Card DocMonth">
              <div className="Card_Icon">
                <MdIcons.MdCalendarMonth />
              </div>
              <div className="Card_Label">
                <span>Docs This Month</span>
                <p>25</p>
              </div>
            </div>
            <div className="Dashboard_Grid_Card DocYear">
              <div className="Card_Icon">
                <MdIcons.MdCalendarToday />
              </div>
              <div className="Card_Label">
                <span>Docs This Year</span>
                <p>25</p>
              </div>
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