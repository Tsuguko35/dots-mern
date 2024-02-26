import React, { useEffect } from 'react'
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

function System_Settings() {
    useEffect(() => {
        document.title = `System Settings`
    }, [])

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
                        <TabPanel value="1" className='Tab_Panel'><Setting_Accounts /></TabPanel>
                        <TabPanel value="2" className='Tab_Panel'><Setting_Dropdowns /></TabPanel>
                        <TabPanel value="3" className='Tab_Panel'><Setting_Printing /></TabPanel>
                        <TabPanel value="4" className='Tab_Panel'><System_Logs /></TabPanel>
                    </TabContext>
                </div>
            </div>
        </section>
    )
}

export default System_Settings