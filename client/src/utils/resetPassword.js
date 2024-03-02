import { Axios } from "../config"

export default async function resetUserPassword(payload) {
    const { email, password } = payload

    try {
        const res = await Axios.post('/user/resetPassword', { email: email, password: password })

        if (res) {
            return res
        }
    } catch (error) {
        console.error(`Unhandled action type: ${error}`)

        return {
            status: error.response.status,
            errorMessage: error.response.data.errorMessage,
        }
    }
}