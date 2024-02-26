
const inputs = [
    {
        category: 'Custom',
        inputs:[
            {
                label: 'Document Name',
                value: `Document_Name`,
                required: true,
                haveOptions: false
            },
            {
                label: 'Received By',
                value: `Received_By`,
                haveOptions: true,
                required: true,
                options: [
                    "Jazpher Carpio",
                    "Edward Santos",
                    "Jairo Garcia"
                ]
            },
            {
                label: 'Office/Dept',
                value: `Office_Dept`,
                haveOptions: true,
                required: true,
                options: [
                    "CICT",
                    "CIT",
                    "Office of the President"
                ]
            },
            {
                label: 'Contact Person',
                value: `Contact_Person`,
                haveOptions: false,
            },
            {
                label: 'Document Type',
                value: `Document_Type`,
                required: true,
                haveOptions: false,
            },
            {
                label: 'Short Description',
                required: true,
                value: `Description`,
                haveOptions: false,
            },
            {
                label: 'Comment/Note',
                value: `Comment_Note`,
                haveOptions: false,
            },
            {
                label: 'Status',
                value: `Status`,
                required: true,
                haveOptions: true,
                options: [
                    "Approved",
                    "Pending",
                    "Rejected"
                ]
            },
            {
                label: 'Forward To',
                value: `Forward_To`,
                haveOptions: true,
                options: [
                    "Jazpher Carpio",
                    "Edward Santos",
                    "Jairo Garcia"
                ]
            },
        ]
    },
    {
        category: 'Student Document',
        inputs:[
            {
                label: 'Document Name',
                value: `Document_Name`,
                required: true,
                haveOptions: false
            },
            {
                label: 'Received By',
                value: `Received_By`,
                haveOptions: true,
                required: true,
                options: [
                    "Jazpher Carpio",
                    "Edward Santos",
                    "Jairo Garcia"
                ]
            },
            {
                label: 'Student Name',
                value: `Contact_Person`,
                required: true,
                haveOptions: false,
            },
            {
                label: 'Document Type',
                value: `Document_Type`,
                haveOptions: true,
                required: true,
                options: [
                    "Completion Form",
                    "Correction of Grades",
                ]
            },
            {
                label: 'Short Description',
                required: true,
                value: `Description`,
                haveOptions: false,
            },
            {
                label: 'Comment/Note',
                value: `Comment_Note`,
                haveOptions: false,
            },
            {
                label: 'Status',
                value: `Status`,
                required: true,
                haveOptions: true,
                options: [
                    "Approved",
                    "Pending",
                    "Rejected"
                ]
            },
            {
                label: 'Forward To',
                value: `Forward_To`,
                haveOptions: true,
                options: [
                    "Jazpher Carpio",
                    "Edward Santos",
                    "Jairo Garcia"
                ]
            },
        ]
    },
    {
        category: 'Faculty Document',
        inputs:[
            {
                label: 'Document Name',
                value: `Document_Name`,
                required: true,
                haveOptions: false
            },
            {
                label: 'Received By',
                value: `Received_By`,
                haveOptions: true,
                required: true,
                options: [
                    "Jazpher Carpio",
                    "Edward Santos",
                    "Jairo Garcia"
                ]
            },
            {
                label: 'Office/Dept',
                value: `Office_Dept`,
                haveOptions: true,
                required: true,
                options: [
                    "CICT",
                    "CIT",
                    "Office of the President"
                ]
            },
            {
                label: 'Faculty Name',
                value: `Contact_Person`,
                required: true,
                haveOptions: false,
            },
            {
                label: 'Document Type',
                value: `Document_Type`,
                haveOptions: true,
                required: true,
                options: [
                    "DTR",
                    "Estimates of Honoraria",
                    "Faculty Teaching Load",
                    "Faculty Workload",
                    "Application for Leave",
                    "Training Request Form"
                ]
            },
            {
                label: 'Short Description',
                required: true,
                value: `Description`,
                haveOptions: false,
            },
            {
                label: 'Comment/Note',
                value: `Comment_Note`,
                haveOptions: false,
            },
            {
                label: 'Status',
                value: `Status`,
                required: true,
                haveOptions: true,
                options: [
                    "Approved",
                    "Pending",
                    "Rejected"
                ]
            },
            {
                label: 'Forward To',
                value: `Forward_To`,
                haveOptions: true,
                options: [
                    "Jazpher Carpio",
                    "Edward Santos",
                    "Jairo Garcia"
                ]
            },
        ]
    },
    {
        category: 'New Hire Document',
        inputs:[
            {
                label: 'Document Name',
                value: `Document_Name`,
                required: true,
                haveOptions: false
            },
            {
                label: 'Received By',
                value: `Received_By`,
                haveOptions: true,
                required: true,
                options: [
                    "Jazpher Carpio",
                    "Edward Santos",
                    "Jairo Garcia"
                ]
            },
            {
                label: 'Office/Dept',
                value: `Office_Dept`,
                haveOptions: true,
                required: true,
                options: [
                    "CICT",
                    "CIT",
                    "Office of the President"
                ]
            },
            {
                label: 'Applicant Name',
                value: `Contact_Person`,
                required: true,
                haveOptions: false,
            },
            {
                label: 'Document Type',
                value: `Document_Type`,
                haveOptions: true,
                required: true,
                options: [
                    "DTR",
                    "Estimates of Honoraria",
                    "Faculty Teaching Load",
                    "Faculty Workload",
                    "Application for Leave",
                    "Training Request Form"
                ]
            },
            {
                label: 'Short Description',
                required: true,
                value: `Description`,
                haveOptions: false,
            },
            {
                label: 'Comment/Note',
                value: `Comment_Note`,
                haveOptions: false,
            },
            {
                label: 'Status',
                value: `Status`,
                required: true,
                haveOptions: true,
                options: [
                    "Approved",
                    "Pending",
                    "Rejected"
                ]
            },
            {
                label: 'Forward To',
                value: `Forward_To`,
                haveOptions: true,
                options: [
                    "Jazpher Carpio",
                    "Edward Santos",
                    "Jairo Garcia"
                ]
            },
        ]
    },
    {
        category: 'IPCR/OPCR',
        inputs:[
            {
                label: 'Document Name',
                value: `Document_Name`,
                required: true,
                haveOptions: false
            },
            {
                label: 'Received By',
                value: `Received_By`,
                haveOptions: true,
                required: true,
                options: [
                    "Jazpher Carpio",
                    "Edward Santos",
                    "Jairo Garcia"
                ]
            },
            {
                label: 'Office/Dept',
                value: `Office_Dept`,
                haveOptions: true,
                required: true,
                options: [
                    "CICT",
                    "CIT",
                    "Office of the President"
                ]
            },
            {
                label: 'Ratee Name',
                value: `Contact_Person`,
                required: true,
                haveOptions: false,
            },
            {
                label: 'Document Type',
                value: `Document_Type`,
                haveOptions: true,
                required: true,
                options: [
                    "IPCR",
                    "OPCR",
                ]
            },
            {
                label: 'Short Description',
                required: true,
                value: `Description`,
                haveOptions: false,
            },
            {
                label: 'Comment/Note',
                value: `Comment_Note`,
                haveOptions: false,
            },
            {
                label: 'Status',
                value: `Status`,
                required: true,
                haveOptions: true,
                options: [
                    "Approved",
                    "Pending",
                    "Rejected"
                ]
            },
            {
                label: 'Forward To',
                value: `Forward_To`,
                haveOptions: true,
                options: [
                    "Jazpher Carpio",
                    "Edward Santos",
                    "Jairo Garcia"
                ]
            },
        ]
    },
    {
        category: 'Travel Order',
        inputs:[
            {
                label: 'Document Name',
                value: `Document_Name`,
                required: true,
                haveOptions: false
            },
            {
                label: 'Received By',
                value: `Received_By`,
                haveOptions: true,
                required: true,
                options: [
                    "Jazpher Carpio",
                    "Edward Santos",
                    "Jairo Garcia"
                ]
            },
            {
                label: 'Office/Dept',
                value: `Office_Dept`,
                haveOptions: true,
                required: true,
                options: [
                    "CICT",
                    "CIT",
                    "Office of the President"
                ]
            },
            {
                label: 'Contact Person',
                value: `Contact_Person`,
                required: true,
                haveOptions: false,
            },
            {
                label: 'Short Description',
                required: true,
                value: `Description`,
                haveOptions: false,
            },
            {
                label: 'Comment/Note',
                value: `Comment_Note`,
                haveOptions: false,
            },
            {
                label: 'Status',
                value: `Status`,
                required: true,
                haveOptions: true,
                options: [
                    "Approved",
                    "Pending",
                    "Rejected"
                ]
            },
            {
                label: 'Forward To',
                value: `Forward_To`,
                haveOptions: true,
                options: [
                    "Jazpher Carpio",
                    "Edward Santos",
                    "Jairo Garcia"
                ]
            },
        ]
    }
]

export default inputs