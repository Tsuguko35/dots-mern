import { Axios } from "../config";
import { v4 as uuid } from "uuid";

export default async function addDocument(payload) {
  const { documentState } = payload;
  const uniqueID = uuid();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const data = {
    document_id: uniqueID,
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
    urgent: documentState.Urgent,
    status: documentState.Status,
    created_By: documentState.Created_By,
    date_Added: `${year}-${month}-${day}`,
  };

  try {
    const res = await Axios.post("/document/addDocument", data);

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
