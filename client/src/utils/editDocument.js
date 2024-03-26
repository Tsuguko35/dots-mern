import { Axios } from "../config";

export default async function editDocument(payload) {
  const { documentState, document_id, edited_By } = payload;

  const data = {
    document_id: document_id,
    document_Name: documentState.Document_Name,
    document_Type: documentState.Document_Type,
    document_Category: documentState.Document_Category,
    date_Received: documentState.Date_Received,
    time_Received: documentState.Time_Received,
    received_By: documentState.Received_By,
    contact_Person: documentState.Contact_Person,
    office_Dept: documentState.Office_Dept,
    incoming_Outgoing: documentState.Incoming_Outgoing,
    description: documentState.Description,
    comment: documentState.Comment_Note,
    forward_To: documentState.Forward_To,
    forwarded_By: documentState.Forwarded_By,
    urgent: documentState.Urgent || 0,
    status: documentState.Status,
    edited_By: edited_By,
  };

  try {
    const res = await Axios.post("/document/editDocument", data);

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
