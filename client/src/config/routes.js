import { 
    ArchiveFolders,
    ArchiveTable,
    Dashboard, 
    Login, 
    Monitoring, 
    Requests,
    Templates
} from "../pages"


const routes = [
    {
        path: '/',
        component: <Login />
    },
    {
        path: '/Dashboard',
        component: <Dashboard />
    },
    {
        path: '/Requests/:requestType',
        component: <Requests />
    },
    {
        path: '/Monitoring/:monitoringType',
        component: <Monitoring />
    },
    {
        path: '/Archive/Folders',
        component: <ArchiveFolders />
    },
    {
        path: '/Archive/Tables',
        component: <ArchiveTable />
    },
    {
        path: '/Templates',
        component: <Templates />
    },
    {
        path: '/*',
        component: <Dashboard />
    }
]

export default routes