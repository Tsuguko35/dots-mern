import React, { useState } from 'react'
import pdfFile from '../assets/images/pdf.pdf'
import docxFile from '../assets/images/Docs.docx'
import xlsxFile from '../assets/images/excel.xlsx'

import DocViewer, 
{
    PDFRenderer,
    MSDocRenderer,
}from '@cyntler/react-doc-viewer'


function ViewDocuments() {
    const docs = [
        {
            uri: pdfFile, fileType: PDFRenderer
        },
        {
            uri: docxFile, fileType: MSDocRenderer
        },
        {
            uri: xlsxFile, fileType: 'xlsx'
        },
    ]

    const [activeDocument, setActiveDocument] = useState(docs[0]);

    const handleDocumentChange = (document) => {
        setActiveDocument(document);
    };
    return (
        <section id='View_Documents' className='View_Documents'>
            <div className="Document_Container">
                <DocViewer 
                    documents={docs}
                    activeDocument={activeDocument} 
                    onDocumentChange={handleDocumentChange}
                />
            </div>
        </section>
    )
}

export default ViewDocuments