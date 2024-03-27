import { Axios } from "../config";

export default async function deleteTemplate(payload) {
  const { template_id, date_Added, file_Name, public_id } = payload;

  try {
    const res = await Axios.post("/template/deleteTemplate", {
      template_id: template_id,
      date_Added: date_Added,
      file_Name: file_Name,
      public_id: public_id,
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
