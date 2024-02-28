import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Cost, Transfer } from "../Icons";
import { Button, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import ExpenseOverview from "../Expense/ExpenseOverview";
import { useNavigate } from "react-router-dom";
import BalanceTable from '../Balance/BalanceTable';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className?: string;
}

interface Expense {
    id: number;
    spenderUserId: number;
    recipientIds: number[];
    amount: number;
    date: string;
    title?: string;
}

interface Spender {
    id: number;
    userName: string;
}

export interface User {
    id: number,
    userName: string;
    expenseIds: number[]
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, className, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, width:'100%' }}>
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

const getTricountUsers = async (feicountId: number, setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
    try {
        const usersResponse: Response = await fetch(`/api/Feicount/${feicountId}/Users`);
        if (!usersResponse.ok) {
            throw new Error(`Failed to fetch users for feicount ${feicountId}`);
        }

        const usersData: User[] = await usersResponse.json();
        setUsers((prevUsers) => [...prevUsers, ...usersData]);
    } catch (error) {
        console.error('Error fetching feicount users:', error);
    }
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

export default function Feicount({ id }: FeicountProps) {
    const [value, setValue] = useState(0);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [spender, setSpender] = useState<Spender[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            setUsers([]);
            getTricountUsers(Number(id), setUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [Number(id)]);
    
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
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', margin:"10px"}}>
                        <Fab color="primary" aria-label="add" onClick={addExpense}>
                            <AddIcon />
                        </Fab>
                    </div>
                </div>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1} className="center">
                <BalanceTable tricountId={Number(id)} users={users}/>
            </CustomTabPanel>


            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                <Button variant="outlined" color="error" onClick={() => navigate("/")}>
                    Zurück
                </Button>
                {value === 1 && (
                    <Button variant="outlined" color="secondary" onClick={() => navigate(`/feicount/${id}/transactions`, { state: { users } })}>
                        Zur Abrechnung
                    </Button>
                )}
            </div>
        </Box>
    );
};