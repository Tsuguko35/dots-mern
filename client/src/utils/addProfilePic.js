import { Axios } from "../config";
import { cloudname, user_Files_Preset } from "../constants";

export default async function addProfilePic(payload) {
  const { file, user_id } = payload;
  const formData = new FormData();
  let publicID = null;
  try {
    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("upload_preset", user_Files_Preset);
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

    publicID = res?.data.public_id;
  } catch (error) {
    console.error(`Unhandled action type: ${error}`);
  }

  // Append each file
  formData.append(`file`, file);

  // Append user_id
  formData.append("user_id", user_id);

  // Append public_id
  formData.append("public_id", publicID);

  try {
    const res = await Axios.post(
      `/user/uploadProfilePic?user_id=${user_id}`,
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
