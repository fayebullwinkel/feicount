import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import {Cost, Transfer} from "./Icons";
import {Fab} from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Tricount() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    
    function addTricount() {
        console.log("Button clicked");
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="tabs"
                    centered
                >
                    <Tab icon=<Cost /> label="AUSGABEN" {...a11yProps(0)} />
                    <Tab icon=<Transfer /> label="SALDEN" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} className="center">
                <div>
                    <Fab color="primary" aria-label="add" onClick={addTricount}>
                        <AddIcon />
                    </Fab>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1} className="center">
                <div>
                    Item Two
                </div>
            </CustomTabPanel>
        </Box>
    );
}
