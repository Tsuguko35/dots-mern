import { Axios } from "../config"

export default async function otpRequest(payload) {
    const { action, receiver } = payload

    try {
        const res = await Axios.post('/user/requestOtp', { action, receiver })

        if (res) {
            return res
        }
    } catch (error) {
        console.error(`Unhandled action type: ${error}`)

        return {
            status: error.response.status,
            errorMessage: error.response.data.errorMessage
        }
    }
}