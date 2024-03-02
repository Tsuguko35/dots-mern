
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
import ReactToPdf from "react-to-pdf";
import { Document, Page, pdfjs } from 'react-pdf'
import "react-pdf/dist/esm/Page/AnnotationLayer.css";


import { LoadingInfinite } from '../../assets/svg';
import { GetWindowWidth, ViewDocuments, ViewPdf } from '../../utils';

import { ReactComponent as PDF } from '../../assets/svg/icons/PDF_icon.svg'
import { ReactComponent as DOCX } from '../../assets/svg/icons/DOCX_icon.svg'
import { ReactComponent as XLSX } from '../../assets/svg/icons/XLSX_icon.svg'

import pdfFile from '../../assets/images/pdf.pdf'

import * as MdIcons from 'react-icons/md'

function View_Files({isFileLoading, setIsFileLoading, pdfToView, setPdfToView}) {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [imageCols, setImageCols] = useState(4)
    const windowWidth = GetWindowWidth()
    

    const itemData = [
        {
          img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
          title: 'Bed',
        },
        {
          img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
          title: 'Books',
        },
        {
          img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
          title: 'Sink',
        },
        {
          img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
          title: 'Kitchen',
        },
        {
          img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
          title: 'Blinds',
        },
        {
          img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
          title: 'Chairs',
        },
        {
          img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
          title: 'Laptop',
        },
        {
          img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
          title: 'Doors',
        },
        {
          img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
          title: 'Coffee',
        },
        {
          img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
          title: 'Storage',
        },
        {
          img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
          title: 'Candle',
        },
        {
          img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
          title: 'Coffee table',
        },
    ];

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

    return (
        <section id='View_Files' className='View_Files'>
            {/* View PDF */}
            {pdfToView && (
                <ViewPdf pdfFile={pdfToView} closePDf={setPdfToView}/>
            )}
            <div className="wrapper">
                <TabContext value={value}>
                    <TabList variant='scrollable' scrollButtons allowScrollButtonsMobile onChange={handleChange}>
                        <Tab label="Image/s" value='1'/>
                        <Tab label="PDF" value='2'/>
                        <Tab label="Docx" value='3'/>
                        <Tab label="Xlsx" value='4'/>
                    </TabList>
                    {!isFileLoading ? (
                        <React.Fragment>
                            <TabPanel className='Tab_Panel' value='1'>
                                <ImageList cols={imageCols} gap={8}>
                                    {itemData.map((item, index) => (
                                        <ImageListItem className='Image_Item_Holder' key={item.img} onClick={() => openLightbox(index)}>
                                            <img
                                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                                alt={item.title}
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
                                        <div className="File">
                                            <div className="Icon">
                                                <PDF />
                                            </div>
                                            <div className="Name">
                                                <p>Pdf Fileaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                            </div>
                                            <div className="Actions">
                                                {windowWidth >= 768 && (
                                                    <div className="View" onClick={() => setPdfToView(pdfFile)}>
                                                        <MdIcons.MdRemoveRedEye size={'20px'}/>
                                                    </div>
                                                )}
                                                <div className="Download">
                                                    <MdIcons.MdOutlineFileDownload size={'20px'}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className='Tab_Panel' value='3'>
                                <div className="Files_Container">
                                    <div className="FileList">
                                        <div className="File">
                                            <div className="Icon">
                                                <DOCX />
                                            </div>
                                            <div className="Name">
                                                <p>Docx</p>
                                            </div>
                                            <div className="Actions">
                                                <div className="Download">
                                                    <MdIcons.MdOutlineFileDownload size={'20px'}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className='Tab_Panel' value='4'>
                                <div className="Files_Container">
                                    <div className="FileList">
                                        <div className="File">
                                            <div className="Icon">
                                                <XLSX />
                                            </div>
                                            <div className="Name">
                                                <p>Xlsx</p>
                                            </div>
                                            <div className="Actions">
                                                <div className="Download">
                                                    <MdIcons.MdOutlineFileDownload size={'20px'}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                            {lightboxOpen && (
                                <Lightbox
                                    mainSrc={itemData[photoIndex].img}
                                    nextSrc={itemData[(photoIndex + 1) % itemData.length].img}
                                    prevSrc={itemData[(photoIndex + itemData.length - 1) % itemData.length].img}
                                    onCloseRequest={closeLightbox}
                                    onMovePrevRequest={() =>
                                        setPhotoIndex((photoIndex + itemData.length - 1) % itemData.length)
                                    }
                                    onMoveNextRequest={() =>
                                        setPhotoIndex((photoIndex + 1) % itemData.length)
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