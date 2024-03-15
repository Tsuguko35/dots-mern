import htmlToPdf from 'html-pdf';
import fs from 'fs';

// Read the image file and convert it into a data URI
const headerImg = `data:image/png;base64,${fs.readFileSync('./document_Files/0.png', { encoding: 'base64' })}`;

export async function buildPDF(documents, dataCallback, endCallback) {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Documents</title>
            <style>
                body {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    font-family: Calibri, sans-serif !important;
                }

                @media print{
                    .Table_Container {
                        width: 100%;
                        height: 800px;
                        margin-top: 230px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
    
                    .Table_Container > table{
                        border-collapse: collapse;
                    }
    
                    .Table_Container > table th, .Table_Container > table td {
                        border: 1px solid #A5A6A6;
                        padding: 3px;
                        text-align: left;
                        width: 5%;
                    }
    
                    .Table_Container > table .Status{
                        width: 5%;
                    }
                    
    
                    .Table_Container > table > thead{
                        width: 100%;
                        font-size: 14px;
                    }
    
                    .Table_Container > table > tbody{
                        width: 100%;
                        font-size: 12px;
                    }
    
                    .Table_Container > table > tr{
                        width: 100%;
                    }
    
                    .Table_Container > table th{
                        text-align: start;
                        background-color: #e7e7e7;
                    }
    
                    .Table_Container > table tr td{
                        text-align: start;
                        height: 30px;
                        letter-spacing: 0px;
                    }
    
                    .Table_Container > table > tbody > tr:nth-child(10n) {
                        page-break-after: always;
                    }
    
                    .Header {
                        width: 100%;
                        top: 0;
                        position: relative;
                    }
    
                    .page-header{
                        width: 100%;
                        top: 0;
                        position: fixed;
                    }
    
                    .Header > img {
                        width: 100%;
                        position: absolute;
                        top: -20px; /* Adjust this value as needed */
                        z-index: 0;
                    }
    
                    .Header > p {
                        position: relative;
                        z-index: 1;
                        color: #C00000;
                        font-weight: bold;
                        font-size: 1.4rem;
                        width: 280px;
                        word-wrap: break-word;
                        letter-spacing: 0.5px;
                        display: flex;
                        left: 192px;
                        top: 55px;
                    }
    
                    .Footer {
                        position: fixed;
                        bottom: -30px;
                        width: 100%;
                        text-align: center;
                        display: flex;
                        flex-direction: column
                    }
    
                    .Footer > p{
                        margin: 0;
                    }
    
                    .Footer > .main {
                        font-weight: bold;
                        font-size: 12px;
                    }
    
                    .Footer > .sub {
                        font-size: 10px;
                    }
    
                    @page {
                        header: page-header;
                    }
    
                    @page {
                        @bottom-center {
                            content: element(footer);
                        }
                    }
                }
            </style>
        </head>
        <body>
            <div class="Table_Container">
                <table class="Table">
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Date Received</th>
                            <th>Document Type</th>
                            <th>Office/Department</th>
                            <th>Received By</th>
                            <th class="Status">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Document</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>
                        <tr>
                            <td>Document 1asdasdadasasdasd</td>
                            <td>2024-03-15</td>
                            <td>Report</td>
                            <td>IT Department</td>
                            <td>John Doe</td>
                            <td class="Status">Received</td>
                        </tr>

                        <!-- Add more rows as needed -->
                    </tbody>
                </table>
            </div>
            
            <!-- Define header and footer for every page -->
            <div class="page-header" id="page-header">
                <div class="Header">
                    <img src="${headerImg}" alt="">
                    <p>College of Information and Communications Technology</p>
                </div>
            </div>

            <div class="page-footer" id="page-footer">
                <div class="Footer">
                    <p class="main">Email Address: officeofthedean.cict@bulsu.edu.ph | Trunkline: 9197800 Loc 1101 then 1102 Office of the Dean</p>
                    <p class="sub">Bulacan State University Main Campus, Capitol Compound, McArthur Highway, Guinhawa, City of Malolos Bulacan</p>
                </div>
            </div>
            
        </body>
        </html>
    `;

    const options = {
        format: 'A4',
        orientation: 'portrait',
        border: {
            top: '0.1cm',
            right: '0.1cm',
            bottom: '0.1cm',
            left: '0.1cm'
        },
    };

    // Generate PDF from HTML content
    htmlToPdf.create(htmlContent, options).toStream((err, stream) => {
        if (err) {
            console.error('Error generating PDF:', err);
            return;
        }

        stream.on('data', dataCallback);
        stream.on('end', endCallback);
    });
}
