import { Axios } from "../config"

export default async function deleteNotification(payload) {
    const { 
        notification_id, 
        forward_To 
    } = payload

    try {
        const res = await Axios.post('/document/deleteNotifications', { notification_id: notification_id, forward_To: forward_To })

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