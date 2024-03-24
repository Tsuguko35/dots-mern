import { Axios } from "../config";

export default async function deleteUser(payload) {
  const { user_id } = payload;

  try {
    const res = await Axios.post("/admin/deleteUser", { user_id: user_id });

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
