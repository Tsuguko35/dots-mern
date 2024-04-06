import { Axios } from "../config";
import { cloudname, user_Files_Preset } from "../constants";

export default async function addProfilePic(payload) {
  const { file, user_id } = payload;
  const formData = new FormData();

  // Append each file
  formData.append(`file`, file);

  // Append user_id
  formData.append("user_id", user_id);

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
