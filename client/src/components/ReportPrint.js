import React from 'react'
import '../styles/reportprint.css'
import headerIMG from '../assets/images/0.png'

export const ReportPrint = React.forwardRef((props, componentRef) => {
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
                
                {props.documents && props.documents.map((document) => (
                    <div className="Table_Container" key={document.document_id}>
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
                                    <th class="Status">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                    <tr>
                                        <td>{document.document_Name}</td>
                                        <td>{document.date_Received}</td>
                                        <td>{document.document_Type}</td>
                                        <td>{document.office_Dept}</td>
                                        <td>{document.received_By}</td>
                                        <td class="Status">{document.status}</td>
                                    </tr>
                                
                            </tbody>
                        </table>
                        
                    </div>
                ))}
            </div>
        </div>
    )
})