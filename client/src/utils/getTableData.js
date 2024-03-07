import { Axios } from "../config"

export default async function getTableData(payload) {
    const { documentType } = payload

    try {
        const res = await Axios.post('/document/getDocuments', { documentType: documentType })

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