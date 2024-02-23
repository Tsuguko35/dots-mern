import React from 'react'

import '../styles/setting_printing.css'

// Icons
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as LuIcons from 'react-icons/lu'
import * as HiIcons from 'react-icons/hi'
import * as GoIcons from 'react-icons/go'
import * as MdIcons from 'react-icons/md'
import * as CiIcons from 'react-icons/ci'
import * as SlIcons from 'react-icons/sl'

function Setting_Printing() {
    return (
        <section id='Setting_Printing' className='Setting_Printing'>
            <div className="wrapper">
                <div className="Printing_Top">
                    <button className="Printing_Save">
                        Save
                    </button>
                </div>
                <div className="Printing_Header_Footer">
                    <div className="Upload_Holder">
                        <div className="Upload_Label">
                            <p>Print Header</p>
                        </div>
                        <div className="Upload">
                            <div className="Upload_Input">
                                <div className="Icon">
                                    <SlIcons.SlCloudUpload size={"30px"}/>
                                </div>
                                <p>Click to upload</p>
                                <input type="file" accept='image/jpeg, image/png'/>
                            </div>
                            <div className="Upload_Image">
                                <img src={`https://i.pinimg.com/564x/ba/52/bc/ba52bc2a53b48881279601c3dbe3ef37.jpg`} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="Upload_Holder">
                        <div className="Upload_Label">
                            <p>Print Footer</p>
                        </div>
                        <div className="Upload">
                            <div className="Upload_Input">
                                <div className="Icon">
                                    <SlIcons.SlCloudUpload size={"30px"}/>
                                </div>
                                <p>Click to upload</p>
                                <input type="file" accept='image/jpeg, image/png'/>
                            </div>
                            <div className="Upload_Image">
                                <img src={`https://i.pinimg.com/564x/ba/52/bc/ba52bc2a53b48881279601c3dbe3ef37.jpg`} alt="" />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default Setting_Printing