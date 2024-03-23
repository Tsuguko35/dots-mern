import { Axios } from "../config"
import getAllUsers from "./getAllUsers"

export default async function forwardDocument(payload) {
    const { 
        document_Name,
        document_id,
        status,
        forward_To,
        forward_To_Name,
        action,
        forwarded_By,
        forwarded_By_Name,
        comment
    } = payload

    const user_ids = []

    if(forward_To.includes('All')) {
        const res = await getAllUsers();
        if(res?.status === 200) {
            const users = res.data?.users;
            users.forEach((user) => {
                if(user.user_id !== forwarded_By) {
                    user_ids.push(user.user_id);
                }
            });
        }
    } else if (forward_To.includes('Faculty') || forward_To.includes('Clerk')) {
        const res = await getAllUsers();
        if(res?.status === 200) {
            const users = res.data?.users;
            users.forEach((user) => {
                if(forward_To.includes(user.role) && user.user_id !== forwarded_By) {
                    user_ids.push(user.user_id);
                }
            });
        }
    } else {
        user_ids.push(forward_To);
    }

    console.log(user_ids);

    try {
        const res = await Axios.post('/document/forwardDocument', { 
            document_Name: document_Name,
            document_id: document_id,
            comment: comment,
            status: status, 
            forward_To: forward_To,
            forward_To_Name,
            forwarded_By: forwarded_By,
            forwarded_By_Name,
            user_ids: user_ids,
            action: action,
            forwarded_Datetime: new Date(),
            accepted_Rejected_Date: new Date(),
            accepted_Rejected_By: forwarded_By
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