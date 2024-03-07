import { Axios } from "../config"
import { v4 as uuid } from "uuid"


export default async function deleteFiles(payload) {
    const { file_Details, document_id } = payload;

    // Add document_id to each object in fileArray
    const updatedFileArray = file_Details.map(file => {
        return {
            ...file,
            document_id: document_id
        };
    });

    try {
        const res = await Axios.post(`/document/deleteFiles`, {
            document_id: document_id,
            file_Details: JSON.stringify(updatedFileArray)
        });

        if (res) {
            return res;
        }
    } catch (error) {
        console.error(`Unhandled action type: ${error}`);

        return {
            status: error.response.status,
            errorMessage: error.response.data.errorMessage,
        };
    }
}