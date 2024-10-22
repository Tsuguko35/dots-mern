import { Axios } from "../config"

export default async function archiveDocument(payload) {
    const { document_id, archived_By } = payload

    try {
        const res = await Axios.post('/document/archiveDocument', { document_id: document_id, archived_By: archived_By})

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