import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Cost, Transfer } from "../Icons";
import { Fab } from "@mui/material";
import { useEffect, useState } from "react";
import ExpenseOverview from "../Expense/Overview";
import {useNavigate, useParams} from "react-router-dom";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className?: string;
}

interface Expense {
    id: number;
    spenderUserId: number;
    recipientIds: number;
    amount: number;
    date: string;
    title: string;
}

interface Spender {
    id: number;
    firstName: string;
    lastName: string;
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

interface FeicountProps {
    id: string;
}

const Feicount: React.FC<FeicountProps> = ({ id }) => {
    const [value, setValue] = useState(0);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [spender, setSpender] = useState<Spender[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchTriountOverviewData = async () => {
            try {
                const expenseResponse = await fetch(`/api/Feicount/${id}/Expenses`);
                if (!expenseResponse.ok) {
                    throw new Error('Failed to fetch expenses');
                }
                const expenseData = await expenseResponse.json();
                setExpenses(expenseData);

                const spenderResponse = await fetch(`api/User/`);
                if (!spenderResponse.ok) {
                    throw new Error(`Failed to fetch users`);
                }
                const spenderData = await spenderResponse.json();
                setSpender(spenderData || []);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchTriountOverviewData();
    }, [id]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function addExpense() {
        navigate(`/feicount/${id}/expenses/new`);
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
                <div>
                    {expenses.map((expense) => {
                        const currentSpender = spender.find((sp: Spender) => sp.id === expense.spenderUserId);

                        return (
                            <div key={expense.id}>
                                {currentSpender && (
                                    <ExpenseOverview expense={expense} spender={currentSpender} />
                                )}
                            </div>
                        );
                    })}
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Fab color="primary" aria-label="add" onClick={addExpense}>
                            <AddIcon />
                        </Fab>
                    </div>
                </div>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1} className="center">
                Hier Daten zur großen Abrechnung einfügen
            </CustomTabPanel>
        </Box>
    );
};

export default Feicount;