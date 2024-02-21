import React, { useEffect } from 'react'
import { PageHeader } from '../../components'
import '../../styles/system_settings.css'

import {
    Box,
    Tab,
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
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Item One" value="1" />
                            <Tab label="Item Two" value="2" />
                            <Tab label="Item Three" value="3" />
                        </TabList>
                        </Box>
                        <TabPanel value="1">Item One</TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>
                </div>
            </div>
        </section>
    )
}

export default System_Settings