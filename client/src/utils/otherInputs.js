
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
                options: "Clerks"
            },
            {
                label: 'Office/Dept',
                value: `Office_Dept`,
                haveOptions: true,
                required: true,
                options: "Office_Dept"
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
                options: "Status"
            },
            {
                label: 'Forward To',
                value: `Forward_To`,
                haveOptions: true,
                options: "Users"
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
                options: "Clerks"
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
                options: "Document Type"
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
                options: "Status"
            },
            {
                label: 'Forward To',
                value: `Forward_To`,
                haveOptions: true,
                options: "Users"
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
                options: "Clerks"
            },
            {
                label: 'Office/Dept',
                value: `Office_Dept`,
                haveOptions: true,
                required: true,
                options: "Office_Dept"
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
                options: "Document Type"
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
                options: "Status"
            },
            {
                label: 'Forward To',
                value: `Forward_To`,
                haveOptions: true,
                options: "Users"
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
                options: "Clerks"
            },
            {
                label: 'Office/Dept',
                value: `Office_Dept`,
                haveOptions: true,
                required: true,
                options: "Office_Dept"
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
                options: "Document Type"
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
                options: "Status"
            },
            {
                label: 'Forward To',
                value: `Forward_To`,
                haveOptions: true,
                options: "Users"
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
                options: "Clerks"
            },
            {
                label: 'Office/Dept',
                value: `Office_Dept`,
                haveOptions: true,
                required: true,
                options: "Office_Dept"
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
                options: "IPCR/OPCR"
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
                options: "Status"
            },
            {
                label: 'Forward To',
                value: `Forward_To`,
                haveOptions: true,
                options: "Users"
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
                options: "Clerks"
            },
            {
                label: 'Office/Dept',
                value: `Office_Dept`,
                haveOptions: true,
                required: true,
                options: "Office_Dept"
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
                options: "Status"
            },
            {
                label: 'Forward To',
                value: `Forward_To`,
                haveOptions: true,
                options: "Users"
            },
        ]
    }
]

export default inputs