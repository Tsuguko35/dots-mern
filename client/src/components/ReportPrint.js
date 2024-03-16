import React, { useEffect, useRef, useState } from 'react'
import '../styles/reportprint.css'
import headerIMG from '../assets/images/0.png'

export const ReportPrint = React.forwardRef((props, componentRef) => {
    const tableRef = useRef(null);

    useEffect(() => {
        const table = tableRef.current;
        if (!table) return;
    
        // Remove all existing row breaks
        const breakRows = table.querySelectorAll('.break-row');
        breakRows.forEach(breakRow => breakRow.remove());
    
        const maxHeight = 320;
        let currentHeight = 0;
        const tbodyRows = table.querySelectorAll('tbody tr');
    
        tbodyRows.forEach((row, index) => {
            let rowHeight = 0;
            const tds = row.querySelectorAll('td');
            tds.forEach(td => {
                const tdHeight = td.clientHeight; // Use clientHeight for the height calculation
                rowHeight = Math.max(rowHeight, tdHeight);
            });
    
            if (currentHeight + rowHeight > maxHeight) {
                const breakRow = document.createElement('tr');
                breakRow.classList.add('break-row');
    
                if (row.parentNode === table) {
                    table.insertBefore(breakRow, row);
                } else {
                    const parent = row.parentNode;
                    parent.insertBefore(breakRow, row);
                }
                currentHeight = 0; // Reset currentHeight for the next page
            }
    
            // Increment the currentHeight with the rowHeight
            currentHeight += rowHeight;
        });
    }, [props.documents, componentRef, props.document_Type]);


    return(
        <div ref={componentRef} id='Print_Container'> 
            <div className="wrapper">
                <div className="Header" id='header'>
                    <img src={headerIMG} alt="header" />
                    <p>College of Information and Communications Technology</p>
                </div>
                <div className="Footer" id='footer'>
                    <p className="Main">Email Address: officeofthedean.cict@bulsu.edu.ph | Trunkline: 9197800 Loc 1101 then 1102 Office of the Dean</p>
                    <p className="Sub">Bulacan State University Main Campus, Capitol Compound, McArthur Highway, Guinhawa, City of Malolos Bulacan</p>
                </div>
                
                
                    <div className='Table_Container' ref={tableRef}>
                        <table>
                            <thead>
                                <tr className='spacer'>
                                    <th colSpan={6}>
                                        <div className="Table_Title">
                                            <p>{`${props.document_Type} Documents`}</p>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Document Name</th>
                                    <th>Date Received</th>
                                    <th>Document Type</th>
                                    <th>Office/Department</th>
                                    <th>Received By</th>
                                    <th className="Status">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.documents && props.documents.map((document) => (
                                    <tr key={document.document_id}>
                                        <td>{document.document_Name}</td>
                                        <td>{document.date_Received}</td>
                                        <td>{document.document_Type}</td>
                                        <td>{document.office_Dept}</td>
                                        <td>{document.received_By}</td>
                                        <td className="Status">{document.status}</td>
                                    </tr>
                                ))}
                                {props.documents && props.documents.map((document) => (
                                    <tr key={document.document_id}>
                                        <td>{document.document_Name}</td>
                                        <td>{document.date_Received}</td>
                                        <td>{document.document_Type}</td>
                                        <td>{document.office_Dept}</td>
                                        <td>{document.received_By}</td>
                                        <td className="Status">{document.status}</td>
                                    </tr>
                                ))}
                                {props.documents && props.documents.map((document) => (
                                    <tr key={document.document_id}>
                                        <td>{document.document_Name}</td>
                                        <td>{document.date_Received}</td>
                                        <td>{document.document_Type}</td>
                                        <td>{document.office_Dept}</td>
                                        <td>{document.received_By}</td>
                                        <td className="Status">{document.status}</td>
                                    </tr>
                                ))}
                                {props.documents && props.documents.map((document) => (
                                    <tr key={document.document_id}>
                                        <td>{document.document_Name}</td>
                                        <td>{document.date_Received}</td>
                                        <td>{document.document_Type}</td>
                                        <td>{document.office_Dept}</td>
                                        <td>{document.received_By}</td>
                                        <td className="Status">{document.status}</td>
                                    </tr>
                                ))}
                                {props.documents && props.documents.map((document) => (
                                    <tr key={document.document_id}>
                                        <td>{document.document_Name}</td>
                                        <td>{document.date_Received}</td>
                                        <td>{document.document_Type}</td>
                                        <td>{document.office_Dept}</td>
                                        <td>{document.received_By}</td>
                                        <td className="Status">{document.status}</td>
                                    </tr>
                                ))}
                                {props.documents && props.documents.map((document) => (
                                    <tr key={document.document_id}>
                                        <td>{document.document_Name}</td>
                                        <td>{document.date_Received}</td>
                                        <td>{document.document_Type}</td>
                                        <td>{document.office_Dept}</td>
                                        <td>{document.received_By}</td>
                                        <td className="Status">{document.status}</td>
                                    </tr>
                                ))}
                                {props.documents && props.documents.map((document) => (
                                    <tr key={document.document_id}>
                                        <td>{document.document_Name}</td>
                                        <td>{document.date_Received}</td>
                                        <td>{document.document_Type}</td>
                                        <td>{document.office_Dept}</td>
                                        <td>{document.received_By}</td>
                                        <td className="Status">{document.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                
            </div>
        </div>
    )
})