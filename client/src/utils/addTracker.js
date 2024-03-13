import { Axios } from "../config"
import { v4 as uuid } from "uuid"

const uniqueID = uuid()

export default async function addTracker(payload) {
    const { signature, tracker_Details, document_id } = payload

    const formData = new FormData()

    // Append file
    formData.append(`file`, signature);

    // Append document_id
    formData.append('document_id', document_id);

    // Append tracker_Details as a JSON string
    formData.append('traker_Label', tracker_Details.tracker_label);


    try {
        const res = await Axios.post(`/document/uploadFiles?document_id=${document_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

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