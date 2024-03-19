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
import { IoIosArrowUp } from 'react-icons/io';


function App() {
  const location = useLocation()
  const windowWidth = GetWindowWidth()
  const pagehasSidebar = hasSidebar(location, routes)
  const pagehasNavbar = hasNavbar(location, routes)
  const [toggleSidebar, setToggleSidebar] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [user, setUser] = useState({})

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
      const handleScroll = () => {
          const scrollTop = window.pageYOffset;
          setShowScroll(scrollTop > 500);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Define your custom theme
  const theme = createTheme({
    palette: {
    primary: {
        main: '#FF8911', // Change this to the color you desiref
    },
    },
  });
  
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

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
            {(toggleSidebar && windowWidth <= 1280 && pagehasSidebar) && (<span className="Sidebar_Overlay"></span>)}
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
                <div className={`Scroll_Top ${showScroll && 'visible'} ${pagehasSidebar || pagehasNavbar && 'hide'}`}>
                  <span onClick={scrollToTop}><IoIosArrowUp /></span>
                </div>
              </div>
            </div>
          </div>
        </SidebarContext.Provider>
      </NotificationContext.Provider>
    </ThemeProvider>
  );
}

export default App;
