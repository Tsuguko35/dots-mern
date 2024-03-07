import { Axios } from "../config"

export default async function updateDropdownsData(payload) {
    const { dropdowns } = payload
    const dropDownData = JSON.stringify(dropdowns)

    try {
        const res = await Axios.post('/settings/updateDropdowns', {dropdownData: dropDownData})

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