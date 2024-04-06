import { Axios } from "../config";
import { v4 as uuid } from "uuid";
import { cloudname, template_Files_Preset } from "../constants";

export default async function uploadTemplates(payload) {
  const { files, file_Details } = payload;
  // Date
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const date_Created = `${year}-${month}-${day}`;

  // Add template_id
  const updatedFileArray = file_Details.map((file) => {
    const uniqueID = uuid();
    return {
      ...file,
      template_id: uniqueID,
      date_Created: date_Created,
    };
  });

  const formData = new FormData();

  // Append each file
  files.forEach((file) => {
    formData.append(`files`, file);
  });

  // Append file_Details as a JSON string
  formData.append("template_Details", JSON.stringify(updatedFileArray));

  try {
    const res = await Axios.post(
      `/template/uploadTemplates?date_Created=${date_Created}`,
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
