import { Axios } from "../config";
import { v4 as uuid } from "uuid";
import { cloudname, document_Files_Preset } from "../constants";

const uniqueID = uuid();

export default async function uploadFiles(payload) {
  const { files, file_Details, document_id } = payload;

  const formData = new FormData();
  // Add document_id to each object in fileArray
  const updatedFileArray = file_Details.map((file) => {
    return {
      ...file,
      document_id: document_id,
    };
  });

  // Append each file
  files.forEach((file) => {
    formData.append(`files`, file);
  });

  // Append document_id
  formData.append("document_id", document_id);

  // Append file_Details as a JSON string
  formData.append("file_Details", JSON.stringify(updatedFileArray));

  try {
    const res = await Axios.post(
      `/document/uploadFiles?document_id=${document_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

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
