import React, { useEffect } from 'react'
import '../../styles/dashboard.css'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { ArchiveTable, Dash_BarChart, Dash_DoughnutChart, Dash_PendingBar, PageHeader } from '../../components'
import welcomeIMG from '../../assets/images/welcomeIMG.png'

// Icons
import * as HiIcons from 'react-icons/hi'
import * as MdIcons from 'react-icons/md'

function Dashboard() {
  const navigate = useNavigate()
  const userDetails = JSON.parse(window.localStorage.getItem('profile'))

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
                <p className='Welcome'>Welcome, <span>{userDetails.role}</span></p>
                <span className='Name'>{userDetails.full_Name}</span>
              </div>
            </div>
            <div className="Dashboard_Grid_Card Archive">
              <div className="Card_Icon">
                <HiIcons.HiArchive />
              </div>
              <div className="Card_Label">
                <p>25</p>
                <span className='span1'>Documents</span>
                <span className='span2'>Archived</span>
              </div>
            </div>
            <div className="Dashboard_Grid_Card DocToday">
              <div className="Card_Icon">
                <MdIcons.MdToday />
              </div>
              <div className="Card_Label">
                <p>25</p>
                <span className='span1'>Documents</span>
                <span className='span2'>Today</span>
              </div>
            </div>
            <div className="Dashboard_Grid_Card DocMonth">
              <div className="Card_Icon">
                <MdIcons.MdCalendarMonth />
              </div>
              <div className="Card_Label">
                <p>25</p>
                <span className='span1'>Documents</span>
                <span className='span2'>This Month</span>
              </div>
            </div>
            <div className="Dashboard_Grid_Card DocYear">
              <div className="Card_Icon">
                <MdIcons.MdCalendarToday />
              </div>
              <div className="Card_Label">
                <p>25</p>
                <span className='span1'>Documents</span>
                <span className='span2'>This Year</span>
              </div>
            </div>
          </div>
          <div className="Dashboard_Grid_Container Middle">
            <div className="Dashboard_Grid_Card Graph1">
              <div className="Chart_Wrapper">
                <Dash_PendingBar />
              </div>
            </div>
            <div className="Dashboard_Grid_Card Graph2">
              <div className="Chart_Wrapper">
                <Dash_DoughnutChart/>
              </div>
            </div>
            <div className="Dashboard_Grid_Card Graph3">
              <div className="Chart_Wrapper">
                <Dash_BarChart/>
              </div>
            </div>
            <div className="Dashboard_Grid_Card Graph4 Calendar">
              <div className="Chart_Wrapper">
                <iframe className='Calendar' src="https://calendar.google.com/calendar/embed?src=carpio.johnjazpher.dc.3188%40gmail.com&ctz=Asia%2FManila" frameBorder="0" scrolling="no"></iframe>
              </div>
            </div>
          </div>
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
                  <div className="Content">
                    <div className="Name">
                      <p>Jazpher Carpioaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                    <div className="Count">
                      <p>999+</p>
                    </div>
                  </div>
                  <div className="Content">
                    <div className="Name">
                      <p>Jazpher Carpioaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                    <div className="Count">
                      <p>999+</p>
                    </div>
                  </div>
                  <div className="Content">
                    <div className="Name">
                      <p>Jazpher Carpioaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                    <div className="Count">
                      <p>999+</p>
                    </div>
                  </div>
                  <div className="Content">
                    <div className="Name">
                      <p>Jazpher Carpioaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                    <div className="Count">
                      <p>999+</p>
                    </div>
                  </div>
                  <div className="Content">
                    <div className="Name">
                      <p>Jazpher Carpioaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                    <div className="Count">
                      <p>999+</p>
                    </div>
                  </div>
                  <div className="Content">
                    <div className="Name">
                      <p>Jazpher Carpioaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                    <div className="Count">
                      <p>999+</p>
                    </div>
                  </div>
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
                  <div className="Content">
                    <div className="Name">
                      <p>Jazpher Carpioaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                    <div className="Count">
                      <p>999+</p>
                    </div>
                  </div>
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
                  <div className="Content">
                    <div className="Name">
                      <p>Jazpher Carpioaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                    <div className="Count">
                      <p>999+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Dashboard_Table_Container">
          <div className="Dashboard_Table">
            <ArchiveTable />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard