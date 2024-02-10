import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Cost, Transfer } from "./Icons";
import { Fab } from "@mui/material";
import { useEffect, useState } from "react";
import ExpenseOverview from "../ExpenseOverview";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className?: string;
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
                    {Array.isArray(children) ? (
                        children.map((child, idx) => (
                            <div key={idx} style={{ display: idx === 0 ? 'block' : 'none' }}>
                                {child}
                            </div>
                        ))
                    ) : (
                        <div style={{ display: 'block' }}>{children}</div>
                    )}
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

interface TricountProps {
    id: string;
}

const Tricount: React.FC<TricountProps> = ({ id }) => {
    const [value, setValue] = useState(0);
    const [expenses, setExpenses] = useState<any[]>([]);
    const [spender, setSpender] = useState<any | null>(null);

    useEffect(() => {
        const fetchTriountOverviewData = async () => {
            try {
                const expenseResponse = await fetch(`/api/Tricount/${id}/expenses`);
                if (!expenseResponse.ok) {
                    throw new Error('Failed to fetch expenses');
                }
                const expenseData = await expenseResponse.json();
                setExpenses(expenseData);

                const spenderId = expenseData[0].spenderUserId;
                const spenderResponse = await fetch(`api/User/${spenderId}`);
                if (!spenderResponse.ok) {
                    throw new Error(`Failed to fetch User ${spenderId}`);
                }
                const spenderData = await spenderResponse.json();
                setSpender(spenderData);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchTriountOverviewData();
    }, [id]);

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
                    <Tab icon={<Cost />} label="AUSGABEN" {...a11yProps(0)} />
                    <Tab icon={<Transfer />} label="SALDEN" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} className="center">
                {expenses.map((expense) => (
                    <div key={expense.id}>
                        {spender !== null && (
                            <ExpenseOverview expense={expense} spender={spender} />
                        )}
                    </div>
                ))}
                <Fab color="primary" aria-label="add" onClick={addTricount}>
                    <AddIcon />
                </Fab>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1} className="center">
                Hier Daten zur großen Abrechnung einfügen
            </CustomTabPanel>
        </Box>
    );
};

export default Tricount;