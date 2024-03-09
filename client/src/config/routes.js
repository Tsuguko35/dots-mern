import { 
    Account_Settings,
    ArchiveFolders,
    Archive_Table,
    Dashboard, 
    Forgot_Password, 
    Login, 
    Monitoring, 
    PageNotFound, 
    Registration, 
    Requests,
    StaffOnboarding,
    System_Settings,
    Templates
} from "../pages"
import { PrivateRoute } from "../utils"


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
        component: <PrivateRoute><Dashboard /></PrivateRoute>
    },
    {
        path: '/Requests/:requestType',
        component: <PrivateRoute><Requests /></PrivateRoute>
    },
    {
        path: '/Monitoring/:monitoringType',
        component: <PrivateRoute><Monitoring /></PrivateRoute>
    },
    {
        path: '/Archive/Folders',
        component: <PrivateRoute><ArchiveFolders /></PrivateRoute>
    },
    {
        path: '/Archive/Tables/:year/:archiveType',
        component: <PrivateRoute><Archive_Table /></PrivateRoute>
    },
    {
        path: '/Templates',
        component: <PrivateRoute><Templates /></PrivateRoute>
    },
    {
        path: '/System-Settings',
        component: <PrivateRoute><System_Settings /></PrivateRoute>
    },
    {
        path: '/Account-Settings',
        component: <PrivateRoute><Account_Settings /></PrivateRoute>
    },
    {
        path: '/Reset-Password',
        component: <Forgot_Password />
    },
    {
        path: '/Finish-Setup',
        component: <PrivateRoute><StaffOnboarding /></PrivateRoute>
    },
    {
        path: '/*',
        component: <PageNotFound />
    }
]

export default routes