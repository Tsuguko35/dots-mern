
import { 
    TabContext, 
    TabList, 
    TabPanel
} from '@mui/lab'
import { ImageList, ImageListItem, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'

import '../../styles/view_files.css'

//Image
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

//PDF
import "react-pdf/dist/esm/Page/AnnotationLayer.css";


import { LoadingInfinite } from '../../assets/svg';
import { GetWindowWidth, ViewPdf } from '../../utils';

import { ReactComponent as PDF } from '../../assets/svg/icons/PDF_icon.svg'
import { ReactComponent as DOCX } from '../../assets/svg/icons/DOCX_icon.svg'
import { ReactComponent as XLSX } from '../../assets/svg/icons/XLSX_icon.svg'

import * as MdIcons from 'react-icons/md'
import { documentFiles, domain } from '../../constants';
import toast from 'react-hot-toast';

import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';

function View_Files({isFileLoading, setIsFileLoading, pdfToView, setPdfToView, files, documentName}) {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [imageCols, setImageCols] = useState(4)
    const windowWidth = GetWindowWidth()

    const imageFiles = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file.file_Name));
    const pdfFiles = files.filter(file => /\.(pdf)$/i.test(file.file_Name))
    const docFiles = files.filter(file => /\.(doc|docx)$/i.test(file.file_Name))
    const excelFiles = files.filter(file => /\.(xls|xlsx)$/i.test(file.file_Name))

    useEffect(() => {
        if(files.some(file => /\.(png|jpg|jpeg)$/i.test(file.file_Name))){
            setValue('1')
        }
        else if (files.some(file => /\.(pdf)$/i.test(file.file_Name))){
            setValue('2')
        }
        else if (files.some(file => /\.(doc|docx)$/i.test(file.file_Name))){
            setValue('3')
        }
        else if (files.some(file => /\.(xls|xlsx)$/i.test(file.file_Name))){
            setValue('4')
        }
    }, [files])

    const openLightbox = (index) => {
        setPhotoIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    useEffect(() => {
        if(windowWidth <= 540){
            setImageCols(1)
        }
        else if(windowWidth <= 912){
            setImageCols(2)
        }
        else if(windowWidth <= 1024){
            setImageCols(3)
        }
    }, [windowWidth])

    const handleDownload = async(props) => {
        const url = `${domain}${documentFiles}/${props.document_id}-${props.file_Name}`;

        try {
            // Fetch the file as a Blob
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();

            // Create an object URL for the Blob
            const objectUrl = URL.createObjectURL(blob);

            // Create a link element and set its href to the object URL
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = props.file_Name; // Suggest a filename for the downloaded file

            // Append the link to the body and click it to trigger the download
            document.body.appendChild(link);
            link.click();

            // Remove the link from the body
            document.body.removeChild(link);

            // Revoke the object URL after triggering the download
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    const handleDownloadImages = async() => {
        toast.loading('Please wait...')
        if(imageFiles.length === 1){
            const {document_id, file_Name} = imageFiles[0]
            const url = `${domain}${documentFiles}/${document_id}-${file_Name}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
    
                const link = document.createElement('a');
                link.href = objectUrl;
                link.download = file_Name;

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(objectUrl);
                toast.dismiss()
                toast.success('Download started')
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
                toast.dismiss()
                toast.success('Download failed')
            }
        }
        else if(imageFiles.length > 1){
            const zip = new JSZip()

            for(const file of imageFiles){
                const {document_id, file_Name} = file
                const url = `${domain}${documentFiles}/${document_id}-${file_Name}`;

                try{
                    // Fetch image content
                    const response = await JSZipUtils.getBinaryContent(url)

                    zip.file(file_Name, response, {binary: true})
                }
                catch (error) {
                    console.error(`Failed to fetch ${url}:`, error);
                }
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' });

            const zipUrl = URL.createObjectURL(zipBlob);

            const link = document.createElement('a');
            link.href = zipUrl;
            link.download = `${documentName} Images.zip`;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(zipUrl);
            toast.dismiss()
            toast.success('Download started')
        }
    }

    return (
        <section id='View_Files' className='View_Files'>
            {/* View PDF */}
            {pdfToView && (
                <ViewPdf pdfFile={pdfToView} closePDf={setPdfToView}/>
            )}
            <div className="wrapper">
                <TabContext value={value}>
                    <TabList variant='scrollable' scrollButtons allowScrollButtonsMobile onChange={handleChange}>
                        {files.some(file => /\.(png|jpg|jpeg)$/i.test(file.file_Name)) && <Tab label="Image/s" value='1'/>}
                        {files.some(file => /\.(pdf)$/i.test(file.file_Name)) && <Tab label="PDF" value='2'/>}
                        {files.some(file => /\.(doc|docx)$/i.test(file.file_Name)) && <Tab label="Docx" value='3'/>}
                        {files.some(file => /\.(xls|xlsx)$/i.test(file.file_Name)) && <Tab label="Xlsx" value='4'/>}
                    </TabList>
                    {!isFileLoading ? (
                        <React.Fragment>
                            <TabPanel className='Tab_Panel' value='1'>
                                <div className="Image_Download">
                                    <button onClick={() => handleDownloadImages()}><MdIcons.MdOutlineFileDownload size={'20px'}/>Download Image/s</button>
                                </div>
                                <ImageList cols={imageCols} gap={8}>
                                    {imageFiles.map((img, index) => (
                                        <ImageListItem className='Image_Item_Holder' key={img.file_id} onClick={() => openLightbox(index)}>
                                            <img
                                                srcSet={`${domain}${documentFiles}/${img.document_id || img.archive_id}-${img.file_Name}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                src={`${domain}${documentFiles}/${img.document_id || img.archive_id}-${img.file_Name}?w=248&fit=crop&auto=format`}
                                                alt={img.file_Name}
                                                className='Image_Item'
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </TabPanel>
                            <TabPanel className='Tab_Panel' value='2'>
                                <div className="Files_Container">
                                    <div className="FileList">
                                        {pdfFiles.map((pdf) => (
                                            <div className="File" key={pdf.file_id}>
                                                <div className="Icon">
                                                    <PDF />
                                                </div>
                                                <div className="Name">
                                                    <p>{ pdf.file_Name }</p>
                                                </div>
                                                <div className="Actions">
                                                    {windowWidth >= 768 && (
                                                        <div className="View" onClick={() => setPdfToView(`${domain}${documentFiles}/${pdf.document_id || pdf.archive_id}-${encodeURIComponent(pdf.file_Name)}`)}>
                                                            <MdIcons.MdRemoveRedEye size={'20px'}/>
                                                        </div>
                                                    )}
                                                    <div className="Download" onClick={() => handleDownload({ document_id: pdf.document_id || pdf.archive_id, file_Name: pdf.file_Name})}>
                                                        <MdIcons.MdOutlineFileDownload size={'20px'}/>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className='Tab_Panel' value='3'>
                                <div className="Files_Container">
                                    <div className="FileList">
                                        {docFiles.map((doc) => (
                                            <div className="File" key={doc.file_id}>
                                                <div className="Icon">
                                                    <DOCX />
                                                </div>
                                                <div className="Name">
                                                    <p>{ doc.file_Name }</p>
                                                </div>
                                                <div className="Actions">
                                                    <div className="Download" onClick={() => handleDownload({ document_id: doc.document_id || doc.archive_id, file_Name: doc.file_Name})}>
                                                        <MdIcons.MdOutlineFileDownload size={'20px'}/>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className='Tab_Panel' value='4'>
                                <div className="Files_Container">
                                    <div className="FileList">
                                        {excelFiles.map((xlsx) => (
                                            <div className="File" key={xlsx.file_id}>
                                                <div className="Icon">
                                                    <XLSX />
                                                </div>
                                                <div className="Name">
                                                    <p>{xlsx.file_Name}</p>
                                                </div>
                                                <div className="Actions">
                                                    <div className="Download" onClick={() => handleDownload({ document_id: xlsx.document_id || xlsx.archive_id, file_Name: xlsx.file_Name})}>
                                                        <MdIcons.MdOutlineFileDownload size={'20px'}/>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabPanel>

                            {lightboxOpen && (
                                <Lightbox
                                    mainSrc={`${domain}${documentFiles}/${imageFiles[photoIndex].document_id || imageFiles[photoIndex].archive_id}-${imageFiles[photoIndex].file_Name}`}
                                    nextSrc={`${domain}${documentFiles}/${imageFiles[(photoIndex + 1) % imageFiles.length].document_id || imageFiles[(photoIndex + 1) % imageFiles.length].archive_id}-${imageFiles[(photoIndex + 1) % imageFiles.length].file_Name}`}
                                    prevSrc={`${domain}${documentFiles}/${imageFiles[(photoIndex + imageFiles.length - 1) % imageFiles.length].document_id || imageFiles[(photoIndex + imageFiles.length - 1) % imageFiles.length].archive_id}-${imageFiles[(photoIndex + imageFiles.length - 1) % imageFiles.length].file_Name}`}
                                    onCloseRequest={closeLightbox}
                                    onMovePrevRequest={() =>
                                        setPhotoIndex((photoIndex + imageFiles.length - 1) % imageFiles.length)
                                    }
                                    onMoveNextRequest={() =>
                                        setPhotoIndex((photoIndex + 1) % imageFiles.length)
                                    }
                                    // Set a higher z-index for the lightbox
                                    reactModalStyle={{ overlay: { zIndex: 2000 } }}
                                />
                            )}
                        </React.Fragment>
                    )
                    :(
                        <div className="Loader">
                            <LoadingInfinite width='75px' height='75px'/>
                        </div>
                    )
                    }
                    

                </TabContext>
            </div>
        </section>
    )
}

export default View_Files