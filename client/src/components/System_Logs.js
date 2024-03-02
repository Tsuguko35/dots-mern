import React from 'react'

import '../styles/system_logs.css'

import { 
    InputAdornment, 
    TextField 
} from '@mui/material'

import * as PiIcons from 'react-icons/pi'
import * as IoIcons from 'react-icons/io'

function System_Logs() {
    return (
        <section id='System_Logs' className='System_Logs'>
            <div className="wrapper">
                <div className="Top_Side">
                    <div className="Input_Group">
                        <span className='Input_Label'>Date</span>
                        <input className='Input' type="date" />
                    </div>
                    <div className="Input_Group">
                        <div className="Checkboxes">
                            <div className="Label">
                                <span>Range</span>
                            </div>
                            <div className="CheckBox">
                                <div className="checkbox-wrapper-46">
                                    <input className="inp-cbx" id="cbx-46" type="checkbox" />
                                    <label className="cbx" htmlFor="cbx-46">
                                        <span>
                                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                        <span className='label'>This Year</span>
                                    </label>    
                                </div>
                                <div className="checkbox-wrapper-46">
                                    <input className="inp-cbx" id="cbx-47" type="checkbox" />
                                    <label className="cbx" htmlFor="cbx-47">
                                        <span>
                                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                        <span className='label'>This Month</span>
                                    </label>    
                                </div>
                                <div className="checkbox-wrapper-46">
                                    <input className="inp-cbx" id="cbx-48" type="checkbox" />
                                    <label className="cbx" htmlFor="cbx-48">
                                        <span>
                                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                        <span className='label'>This Day</span>
                                    </label>    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="Input_Group">
                        <span className='Input_Label'>Search</span>
                        <div className="Custom_Search">
                            <div className="Icon">
                                <IoIcons.IoIosSearch size={'20px'}/>
                            </div>
                            <input className='Input' type="text" placeholder='Search...'/>
                        </div>
                    </div>
                </div>
                <div className="System_Logs_Container">
                    <div className="Logs">
                        <div className="Log">
                            <div className="Icon">
                                <PiIcons.PiDotsNine size={'20px'}/> 
                            </div>
                            <div className="Text">
                                <div className="DateTime">
                                    <p>September 25, 2024 <span className='dot'>·</span> 10:23 AM </p> 
                                </div>
                                <div className="Event">
                                    <p>Jazpher Carpio added an ncoming document.aaaaaaaaa aaaaaaaaaaaaaaaa aaaaaa aa aaaaaaaaaaa aaaaaaa aaaaaaaa aaaaaaaa</p>
                                </div>
                            </div>
                        </div>
                        <div className="Log">
                            <div className="Icon">
                                <PiIcons.PiDotsNine size={'20px'}/> 
                            </div>
                            <div className="Text">
                                <div className="DateTime">
                                    <p>September 25, 2024 <span className='dot'>·</span> 10:23 AM </p> 
                                </div>
                                <div className="Event">
                                    <p>Jazpher Carpio added an ncoming document.aaaaaaaaa aaaaaaaaaaaaaaaa aaaaaa aa aaaaaaaaaaa aaaaaaa aaaaaaaa aaaaaaaa</p>
                                </div>
                            </div>
                        </div>
                        <div className="Log">
                            <div className="Icon">
                                <PiIcons.PiDotsNine size={'20px'}/> 
                            </div>
                            <div className="Text">
                                <div className="DateTime">
                                    <p>September 25, 2024 <span className='dot'>·</span> 10:23 AM </p> 
                                </div>
                                <div className="Event">
                                    <p>Jazpher Carpio added an ncoming document.aaaaaaaaa aaaaaaaaaaaaaaaa aaaaaa aa aaaaaaaaaaa aaaaaaa aaaaaaaa aaaaaaaa</p>
                                </div>
                            </div>
                        </div><div className="Log">
                            <div className="Icon">
                                <PiIcons.PiDotsNine size={'20px'}/> 
                            </div>
                            <div className="Text">
                                <div className="DateTime">
                                    <p>September 25, 2024 <span className='dot'>·</span> 10:23 AM </p> 
                                </div>
                                <div className="Event">
                                    <p>Jazpher Carpio added an ncoming document.aaaaaaaaa aaaaaaaaaaaaaaaa aaaaaa aa aaaaaaaaaaa aaaaaaa aaaaaaaa aaaaaaaa</p>
                                </div>
                            </div>
                        </div>
                        <div className="Log">
                            <div className="Icon">
                                <PiIcons.PiDotsNine size={'20px'}/> 
                            </div>
                            <div className="Text">
                                <div className="DateTime">
                                    <p>September 25, 2024 <span className='dot'>·</span> 10:23 AM </p> 
                                </div>
                                <div className="Event">
                                    <p>Jazpher Carpio added an ncoming document.aaaaaaaaa aaaaaaaaaaaaaaaa aaaaaa aa aaaaaaaaaaa aaaaaaa aaaaaaaa aaaaaaaa</p>
                                </div>
                            </div>
                        </div>
                        <div className="Log">
                            <div className="Icon">
                                <PiIcons.PiDotsNine size={'20px'}/> 
                            </div>
                            <div className="Text">
                                <div className="DateTime">
                                    <p>September 25, 2024 <span className='dot'>·</span> 10:23 AM </p> 
                                </div>
                                <div className="Event">
                                    <p>Jazpher Carpio added an ncoming document.aaaaaaaaa aaaaaaaaaaaaaaaa aaaaaa aa aaaaaaaaaaa aaaaaaa aaaaaaaa aaaaaaaa</p>
                                </div>
                            </div>
                        </div>
                        <div className="Log">
                            <div className="Icon">
                                <PiIcons.PiDotsNine size={'20px'}/> 
                            </div>
                            <div className="Text">
                                <div className="DateTime">
                                    <p>September 25, 2024 <span className='dot'>·</span> 10:23 AM </p> 
                                </div>
                                <div className="Event">
                                    <p>Jazpher Carpio added an ncoming document.aaaaaaaaa aaaaaaaaaaaaaaaa aaaaaa aa aaaaaaaaaaa aaaaaaa aaaaaaaa aaaaaaaa</p>
                                </div>
                            </div>
                        </div>
                        <div className="Log">
                            <div className="Icon">
                                <PiIcons.PiDotsNine size={'20px'}/> 
                            </div>
                            <div className="Text">
                                <div className="DateTime">
                                    <p>September 25, 2024 <span className='dot'>·</span> 10:23 AM </p> 
                                </div>
                                <div className="Event">
                                    <p>Jazpher Carpio added an ncoming document.aaaaaaaaa aaaaaaaaaaaaaaaa aaaaaa aa aaaaaaaaaaa aaaaaaa aaaaaaaa aaaaaaaa</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default System_Logs