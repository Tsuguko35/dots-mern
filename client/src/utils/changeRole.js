import { Axios } from "../config";

export default async function changeRole(payload) {
  const { user_id, role } = payload;

  try {
    const res = await Axios.post("/admin/changeRole", {
      user_id: user_id,
      role: role,
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
