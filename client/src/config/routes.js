import { 
    ArchiveFolders,
    Archive_Table,
    Dashboard, 
    Login, 
    Monitoring, 
    PageNotFound, 
    Registration, 
    Requests,
    Templates
} from "../pages"


const routes = [
    {
        path: '/',
        component: <Login />
    },
    {
        path: '/Login',
        component: <Login />
    },
    {
        path: '/Registration',
        component: <Registration />
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
        component: <Archive_Table />
    },
    {
        path: '/Templates',
        component: <Templates />
    },
    {
        path: '/*',
        component: <PageNotFound />
    }
]

export default routes