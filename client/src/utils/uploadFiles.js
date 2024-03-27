import { Axios } from "../config";
import { v4 as uuid } from "uuid";
import { cloudname, document_Files_Preset } from "../constants";

const uniqueID = uuid();

export default async function uploadFiles(payload) {
  const { files, file_Details, document_id } = payload;

  const formData = new FormData();

  const responses = await Promise.all(
    files.map(async (file) => {
      const fileData = new FormData();
      fileData.append("file", file);
      fileData.append("upload_preset", document_Files_Preset);

      try {
        const res = await Axios.post(
          `https://api.cloudinary.com/v1_1/${cloudname}/upload`,
          fileData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: false,
          }
        );

        return res;
      } catch (error) {
        console.error(`Unhandled action type: ${error}`);

        return { type: "error", message: error.message };
      }
    })
  );

  const combinedResponses = responses.flat();
  // Add document_id to each object in fileArray
  const updatedFileArray = file_Details.map((file) => {
    const publicID = combinedResponses.find((res) =>
      file.file_Name.includes(res.data?.original_filename)
    );
    return {
      ...file,
      public_id: publicID.data.public_id,
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
