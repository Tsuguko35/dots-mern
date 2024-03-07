import { Axios } from "../config"

export default async function getDropdownsData() {
    try {
        const res = await Axios.post('/settings/getDropdowns')

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