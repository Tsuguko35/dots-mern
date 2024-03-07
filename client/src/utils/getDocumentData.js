import { Axios } from "../config"

export default async function getDocumentData(payload) {
    const { document_id } = payload

    try {
        const res = await Axios.post('/document/getDocument', { document_id: document_id })

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