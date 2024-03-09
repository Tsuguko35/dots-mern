import { Axios } from "../config"

export default async function getArchiveDocuments() {
    try {
        const res = await Axios.post('/document/getArchives')

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