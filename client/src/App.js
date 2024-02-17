import { Routes, Route, useLocation} from 'react-router-dom'
import { routes } from './config';

import { Navbar, Sidebar } from './components';

import './styles/style.css'
import { hasSidebar } from './utils';
import { SidebarContext } from './context';
import { useState } from 'react';

function App() {
  const location = useLocation()
  const pagehasSidebar = hasSidebar(location, routes)
  const [toggleSidebar, setToggleSidebar] = useState(true)
  return (
    <SidebarContext.Provider value={{toggleSidebar, setToggleSidebar}}>
      <div id='Main_View' className='Main_View'>
        {pagehasSidebar && (
          <div className="Sidebar">
            <Sidebar />
          </div>
        )}
        
        <div className='Main_Content'>
          <Navbar />
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.component} />
            ))}
          </Routes>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

export default App;
