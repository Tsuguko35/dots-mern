import { Axios } from "../config"

export default async function downloadReport(payload) {
    try {
        const res = await Axios.get(`/document/downloadReportPDF`, {
            responseType: 'blob',
        });

        if (res.status === 200) {
            const blob = new Blob([res.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank'); // Open the PDF in a new browser tab
        }
    } catch (error) {
        console.error('Error downloading PDF:', error);
    }
}
