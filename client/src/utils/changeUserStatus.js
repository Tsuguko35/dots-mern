import { Axios } from "../config"

export default async function changeUserStatus(payload) {
    const { user_id, status } = payload

    try {
        const res = await Axios.post('/user/changeUserStatus', { user_id: user_id, status: status })

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