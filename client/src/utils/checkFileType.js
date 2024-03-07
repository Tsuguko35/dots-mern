export default function checkFileType(files) {
    const allowedTypes = [
        'image/png', 
        'image/jpeg', 
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'application/vnd.ms-excel', 
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    const isTypeCorrect = files.every(file => allowedTypes.includes(file.type));
    return isTypeCorrect;
}