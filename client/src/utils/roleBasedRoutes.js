import { useContext, useEffect } from "react";
import { useNavigate } from "react-router"
import { NotificationContext } from "../context/context";


const RoleBasedRoute = ({children}) => {
    const navigate = useNavigate()

    const {
        user,
    } = useContext(NotificationContext)

    useEffect(() => {
        if(user){
            if(user.role === 'Faculty'){
                navigate('/Dashboard')
            }
        }
        
    }, [user]);

    return children
}

export default RoleBasedRoute