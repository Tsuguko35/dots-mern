import { Axios } from "../config"

export default async function otpVerify(payload) {
    const { otpCode } = payload

    try {
        const res = await Axios.post('/user/verifyOtp', { otpCodeInput: otpCode })

        if (res) {
            return res
        }
    } catch (error) {
        console.error(`Unhandled action type: ${error}`)

        return {
            status: error.response.status,
            errorMessage: error.response.data.errorMessage,
        }
    }
}