import { useContext, useEffect } from "react";
import { useNavigate } from "react-router"
import { NotificationContext } from "../context/context";


const SettingsRoute = ({children}) => {
    const navigate = useNavigate()

    const {
        user,
        setUser
    } = useContext(NotificationContext)

    useEffect(() => {
        if(user){
            if(user.role !== 'Dean'){
                navigate('/Dashboard')
            }
        }
        
    }, [user]);

    return children
}

export default SettingsRoute