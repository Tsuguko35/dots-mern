import React, { useEffect, useState } from 'react'
import { PageHeader, Setting_Accounts, Setting_Dropdowns, Setting_Printing, System_Logs } from '../../components'
import '../../styles/system_settings.css'

import {
    Box,
    Tab,
    Tabs,
    ThemeProvider,
    createTheme
} from '@mui/material'

import {
    TabContext,
    TabPanel,
    TabList
} from '@mui/lab'
import getDropdownsData from '../../utils/getDropdownsData'
import toast from 'react-hot-toast'
import { LoadingInfinite } from '../../assets/svg'
import { SettingsContext } from '../../context'

function System_Settings() {
    useEffect(() => {
        document.title = `System Settings`
        getDropdowns()
    }, [])

    const [isLoading, setIsLoading] = useState(false)
    const [dropdowns, setDropdowns] = useState([])

    const getDropdowns = async() => {
        setIsLoading(true)
        const res = await getDropdownsData()
        
        if(res?.status === 200){
            setIsLoading(false)
            setDropdowns(res.data?.dropdowns)
        }
        else(
            toast.error('An error occured while fetching data.')
        )
    }

    const getAccounts = () => {
        
    }

    const getLogs = () => {
        
    }

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <section id='System_Settings' className='System_Settings'>
            <div className="wrapper">
                <PageHeader page={"System Settings"} />
                <div className="Settings_Container">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList variant='scrollable' scrollButtons allowScrollButtonsMobile onChange={handleChange}>
                            <Tab label="Accounts" value="1" />
                            <Tab label="Dropdowns" value="2" />
                            <Tab label="Printing" value="3" />
                            <Tab label="System Logs" value="4" />
                        </TabList>
                        </Box>
                        <SettingsContext.Provider value={{ dropdowns, setDropdowns }}>
                            <TabPanel value="1" className='Tab_Panel'><Setting_Accounts /></TabPanel>
                            <TabPanel value="2" className='Tab_Panel'>{isLoading ? (<div className="Loader"><LoadingInfinite width='150px' height='150px'/></div>) : <Setting_Dropdowns />}</TabPanel>
                            <TabPanel value="3" className='Tab_Panel'><Setting_Printing /></TabPanel>
                            <TabPanel value="4" className='Tab_Panel'><System_Logs /></TabPanel>
                        </SettingsContext.Provider>
                    </TabContext>
                </div>
            </div>
        </section>
    )
}

export default System_Settings