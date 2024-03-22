import React, { useEffect, useState } from 'react'

import '../styles/system_logs.css'

import * as PiIcons from 'react-icons/pi'
import * as IoIcons from 'react-icons/io'
import * as MdIcons from 'react-icons/md'
import { getLogs } from '../utils'
import noResult from '../assets/images/noResult.png'
import toast from 'react-hot-toast'
import { LoadingInfinite } from '../assets/svg'

function System_Logs() {
    const [logs, setLogs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [logsToFilter, setLogsToFilter] = useState([])
    const [filters, setFilters] = useState({
        date: '',
        range: '',
        search: ''
    })

    const getLogsData = async() => {
        setIsLoading(true)
        const res = await getLogs()

        if(res?.status === 200){
            setIsLoading(false)
            setLogsToFilter(res.data?.logs)
        }
        else{
            toast.error('Failed fetching system logs.')
        }
    }

    useEffect(() => {
        if(logsToFilter){
            const filteredLogs = logsToFilter.filter(log => 
                log.log.toLowerCase().includes(filters.search.toLowerCase())
            )
            .filter(log =>
                filters.date !== '' ? new Date(log.datetime).getDate() === new Date(filters.date).getDate() : true
            )
            .filter(log => {
                const logDate = new Date(log.datetime);
                const filterDate = new Date()
                switch (filters.range) {
                    case 'Year':
                        return logDate.getFullYear() === filterDate.getFullYear();
                    case 'Month':
                        return logDate.getMonth() === filterDate.getMonth() &&
                                logDate.getFullYear() === filterDate.getFullYear();
                    case 'Day':
                        return logDate.getDate() === filterDate.getDate() &&
                                logDate.getMonth() === filterDate.getMonth() &&
                                logDate.getFullYear() === filterDate.getFullYear();
                    default:
                        return true; // Include all logs if range is not specified or invalid
                }
            })
    
            const sortedFilteredLogs = filteredLogs.sort((a, b) => {
                const dateA = new Date(a.datetime);
                const dateB = new Date(b.datetime);
            
                // Compare the dates
                if (dateA > dateB) return -1; // Sort in descending order
                if (dateA < dateB) return 1; // Sort in descending order
            
                // If dates are equal, compare the times
                const timeA = new Date(a.log.datetime).getTime();
                const timeB = new Date(b.log.datetime).getTime();
            
                return timeB - timeA; // Sort in descending order
            });
        
            setLogs(sortedFilteredLogs);
        }
        else{
            setLogs(logsToFilter);
        }

    }, [filters, logsToFilter])

    useEffect(() => {
        getLogsData()
    }, [])

    const changeRange = (range) => {
        if(filters.range === range){
            setFilters({...filters, range: '', date: ''})
        }
        else{
            setFilters({...filters, range: range, date: ''})
        }
    }

    return (
        <section id='System_Logs' className='System_Logs'>
            <div className="wrapper">
                <div className="Top_Side">
                    <div className="Input_Group">
                        <span className='Input_Label'>Date</span>
                        <input className='Input' type="date" value={filters.date} onChange={(e) => setFilters({...filters, date: e.target.value, range: ''})}/>
                    </div>
                    <div className="Input_Group">
                        <div className="Checkboxes">
                            <div className="Label">
                                <span>Range</span>
                            </div>
                            <div className="CheckBox">
                                <div className="checkbox-wrapper-46">
                                    <input className="inp-cbx" id="cbx-46" type="checkbox" checked={filters.range === 'Year'} onChange={() => changeRange('Year')}/>
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
                                    <input className="inp-cbx" id="cbx-47" type="checkbox" checked={filters.range === 'Month'} onChange={() => changeRange('Month')}/>
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
                                    <input className="inp-cbx" id="cbx-48" type="checkbox" checked={filters.range === 'Day'} onChange={() => changeRange('Day')}/>
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
                            <input className='Input' type="text" placeholder='Search...' value={filters.search} onChange={(e) => setFilters({...filters, search: e.target.value})}/>
                            <div className={`Close_Icon ${filters.search && 'visible'}`}>
                                <MdIcons.MdOutlineClose size={'25px'} onClick={(e) => setFilters({...filters, search: ''})}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="System_Logs_Container">
                    {isLoading && (
                        <div className="Loader">
                            <LoadingInfinite width='150px' height='150px'/>
                        </div>
                    )}
                    {(!isLoading && logs.length === 0) && (
                        <div className="Table_Empty">
                            <div className="Empty_Image">
                                <img src={noResult} alt="No Result" />
                            </div>
                            <div className="Empty_Labels">
                                <span className="Main_Label">NO LOGS FOUND!</span>
                                <span className="Sub_Label">Click the add new staff button to add staff users.</span>
                            </div>
                        </div>
                    )}
                    {!isLoading && (
                        <div className="Logs">
                            {logs.length > 0 && logs.map((log) => (
                                <div className="Log" key={log.log_id}>
                                    <div className="Icon">
                                        <PiIcons.PiDotsNine size={'20px'}/> 
                                    </div>
                                    <div className="Text">
                                        <div className="DateTime">
                                            <p>{new Date(log.datetime).toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric'})} <span className='dot'>·</span> {new Date(log.datetime).toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true})} </p> 
                                        </div>
                                        <div className="Event">
                                            <p>{log.log}</p>
                                        </div>
                                    </div>
                                </div>   
                            ))}
                            
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default System_Logs