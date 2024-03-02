import { useEffect } from "react";
import { useNavigate } from "react-router"
import { validateUser } from "../context";


const PrivateRoute = ({children}) => {
    const navigate = useNavigate()
    useEffect(() => {
        async function validate(){
            const isLoggedIn = window.localStorage.getItem('isLoggedIn')
            const token = window.localStorage.getItem('user')
            if(isLoggedIn){
                const res = await validateUser({token})
                if(res?.status === 200){
                    return children
                }
            }
            else {
                navigate('/Login')
                document.cookie = 'token=; Max-Age=0; secure'
            }
        }
        
        validate()
    }, []);

    return children
}

export default PrivateRoute