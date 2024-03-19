import { useContext, useEffect } from "react";
import { useNavigate } from "react-router"
import { validateUser } from "../context";
import { NotificationContext } from "../context/context";


const PrivateRoute = ({children}) => {
    const navigate = useNavigate()

    const {
        setUser
    } = useContext(NotificationContext)

    useEffect(() => {
        async function validate(){
            const isLoggedIn = window.localStorage.getItem('isLoggedIn')
            const token = window.localStorage.getItem('dotsUser')
            if(isLoggedIn){
                const res = await validateUser({token})
                if(res?.status === 200){
                    setUser(res?.data)
                    return children
                }
            }
            else {
                navigate('/Login')
                document.cookie = 'token=; Max-Age=0; secure'
            }
        }
        
        validate()
    }, [children, navigate, setUser]);

    return children
}

export default PrivateRoute