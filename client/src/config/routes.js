import { 
    Dashboard, 
    Login 
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
        path: '/*',
        component: <Dashboard />
    }
]

export default routes