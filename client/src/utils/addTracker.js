import { Axios } from "../config";
import { v4 as uuid } from "uuid";

export default async function addTracker(payload) {
    try {
        const uniqueID = uuid();
        const { signature, tracker_Details, document_id, created_By } = payload;
        const formData = new FormData();
        
        const signatureDataURL = signature.getTrimmedCanvas().toDataURL('image/png');
        const res = await fetch(signatureDataURL);
        if (!res.ok) {
            throw new Error(`Failed to fetch signature data: ${res.status} ${res.statusText}`);
        }
        
        const blob = await res.blob();
        const signatureFile = new File([blob], `signature.png`, { type: 'image/png' });

        // Append file
        formData.append(`file`, signatureFile);

        // Append tracker_id
        formData.append('tracker_id', uniqueID);

        // Append document_id
        formData.append('document_id', document_id);

        // Append tracker_Details as a JSON string
        formData.append('tracker_Label', tracker_Details.label);

        // Append created_By
        formData.append('created_By', created_By);

        const response = await Axios.post(`/document/addTracker?tracker_id=${uniqueID}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response;
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        return {
            status: error.response ? error.response.status : null,
            errorMessage: error.response ? error.response.data.errorMessage : 'Unknown error occurred',
        };
    }
}
