import { Axios } from "../config"

// Login
export async function logInUser(payload){
    const {email, password} = payload

    try{
        const res = await Axios.post(`/user/signIn`, {email, password})
        
        if(res){
            return res
        }
    }
    catch(error){
        console.error(`Unhandled action type: ${error}`)
        return {
            status: error.response.status,
            errorMessage: error.response.data.errorMessage
        }
    }
}

//Validate
export async function validateUser(payload){
    const {token} = payload

    try{
        const res = await Axios.post(`/user/validateUser`, {token})
        
        if(res){
            return res
        }
    }
    catch(error){
        console.error(`Unhandled action type: ${error}`)
        return {
            status: error.response.status,
            errorMessage: error.response.data.errorMessage
        }
    }
}

export async function logOutUser(){
    try{
        const res = await Axios.post(`/user/logOutUser`)
        
        if(res){
            if(res?.status === 200){
                document.cookie = 'token=; Max-Age=0; secure'
                window.localStorage.removeItem('user')
                window.localStorage.removeItem('profile')
                window.localStorage.removeItem('isLoggedIn')
            }
            return res
        }
    }
    catch(error){
        console.error(`Unhandled action type: ${error}`)
        return {
            status: error.response.status,
            errorMessage: error.response.data.errorMessage
        }
    }
}