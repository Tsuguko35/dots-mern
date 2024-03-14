import { Routes, Route, useLocation} from 'react-router-dom'
import { routes } from './config';

import { Navbar, Sidebar } from './components';

import './styles/style.css'

import { 
  GetWindowWidth,
  getAllNotifications,
  hasNavbar, 
  hasSidebar 
} from './utils';

import { SidebarContext } from './context';
import { useEffect, useState } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { NotificationContext } from './context/context';


function App() {
  const location = useLocation()
  const windowWidth = GetWindowWidth()
  const pagehasSidebar = hasSidebar(location, routes)
  const pagehasNavbar = hasNavbar(location, routes)
  const [toggleSidebar, setToggleSidebar] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [user, setUser] = useState({})


  // Define your custom theme
  const theme = createTheme({
    palette: {
    primary: {
        main: '#FF8911', // Change this to the color you desiref
    },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <NotificationContext.Provider value={{notifications, setNotifications, user, setUser}}>
        <SidebarContext.Provider value={{toggleSidebar, setToggleSidebar}}>
          <div id='Main_View' className='Main_View'>
            {pagehasSidebar && (
              <div className="Sidebar">
                <Sidebar />
              </div>
            )}
            {(toggleSidebar && windowWidth <= 1024 && pagehasSidebar) && (<span className="Sidebar_Overlay"></span>)}
            <div className='Main_Content'>
              <div className="Navbar">
                {pagehasNavbar && (<Navbar />)}
              </div>
              <div className={pagehasSidebar ? 'Content Sidebar' : 'Content'}>
                <Routes>
                  {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                  ))}
                </Routes>
              </div>
            </div>
          </div>
        </SidebarContext.Provider>
      </NotificationContext.Provider>
    </ThemeProvider>
  );
}

export default App;
