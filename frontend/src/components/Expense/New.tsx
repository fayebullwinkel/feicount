import React, {useEffect, useState} from "react";
import {TextField, Button, MenuItem, FormControlLabel, Checkbox, Grid} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Currency, mapToCurrency } from "../../types/Currency";

interface ExpenseData {
    id: number;
    title: string;
    amount: number;
    currency: Currency;
    date: Date;
    spenderUserId: number;
    recipientIds: number[];
}

interface UserData {
    id: number,
    firstName: string,
    lastName: string,
    tricountIds?: number[];
    expenseIds?: number[];
    checked?: boolean;
}

export default function NewExpense() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [spenderUserId, setSpenderUserId] = useState(0);
    const [recipientIds, setRecipientIds] = useState([0]);
    const [amountError, setAmountError] = useState(false);
    const [users, setUsers] = useState<UserData[]>([]);
    const [currency, setCurrency] = useState(Currency[Currency.EUR]);
    const [userShares, setUserShares] = useState<Record<number, number>>({});
    const navigate = useNavigate();
    
    const handleSelectChange = <T extends string | number>(
        event: React.ChangeEvent<{ value: unknown }>,
        setSpenderUserId: React.Dispatch<React.SetStateAction<T>>,
    ) => {
        setSpenderUserId(event.target.value as T);
    };

    const updateShares = () => { // TODO: Update logic to have recipient pay less if it does not add up correctly
        const checkedUsers = users.filter((user) => user.checked);
        const totalCheckedUsers = checkedUsers.length;

        if (totalCheckedUsers === 0) return;

        const share = amount / totalCheckedUsers;
        const newShares: Record<number, number> = {};
        checkedUsers.forEach((user) => {
            newShares[user.id] = share;
        });

        setUserShares(newShares);
    };

    const fetchTricountUsers = async () => {
        try {
            const tricountUserResponse: Response = await fetch(`/api/Tricount/${id}/Users`);
            if (!tricountUserResponse.ok) {
                throw new Error('Failed to fetch tricounts');
            }

            const usersData: UserData[] = await tricountUserResponse.json();
            const updatedUsers = usersData.map(user => ({ ...user, checked: true }));

            setUsers(updatedUsers);

            if (updatedUsers.length > 0) {
                setSpenderUserId(updatedUsers[0].id);
                setRecipientIds(updatedUsers.map(user => user.id));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchTricountUsers();
    }, [amount]);

    useEffect(() => {
        updateShares();
    }, [users]);

    const handleChangeUser = (userId: number) => (event: { target: { checked: boolean; }; }) => {
        setUsers(prevUsers => prevUsers.map((user) =>
            user.id === userId ? { ...user, checked: event.target.checked } : user
        ));
    };

    const parentCheckboxProps = {
        checked: users.every((user) => user.checked),
        indeterminate: users.some((user) => user.checked) && users.some((user) => !user.checked),
        onChange: () => {
            const allChecked = users.every((user) => user.checked);
            const updatedUsers = users.map((user) => ({ ...user, checked: !allChecked }));
            setUsers(updatedUsers);
        },
    };
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setAmountError(false);
        setRecipientIds([]);

        if (amount == 0) {
            setAmountError(true);
        }

        const recipientIds: number[] = users
            .filter((user) => user.checked)
            .map((user) => user.id);
        
        setRecipientIds(recipientIds);

        const postData: ExpenseData = {
            id: 0,
            title,
            amount,
            currency: mapToCurrency(currency),
            date,
            spenderUserId: spenderUserId,
            recipientIds
        };

        try {
            const postResponse = await fetch('/api/Tricount/{id}/Expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData),
            });

            if (!postResponse.ok) {
                throw new Error('Failed to post data');
            }

            navigate(`/tricount/${id}`);
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const goBackToTricount = async () => {
        navigate(`/tricount/${id}`);
    }

    return (
        <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                    <h2>Neue Ausgabe</h2>
                </div>
                <TextField
                    label="Titel"
                    onChange={e => setTitle(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    type="title"
                    sx={{mb: 3}}
                    fullWidth
                    value={title}
                />
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField
                            label="Betrag"
                            onChange={(e) => {
                                setAmount(Number(e.target.value));
                            }}
                            required
                            variant="outlined"
                            color="secondary"
                            type="amount"
                            value={amount}
                            fullWidth
                            sx={{ mb: 3 }}
                            error={amountError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Währung"
                            onChange={(event) => handleSelectChange(event, setCurrency)}
                            required
                            variant="outlined"
                            color="secondary"
                            type="currency"
                            value={currency}
                            select
                            fullWidth
                            sx={{ mb: 3 }}
                        >
                            {Object.values(Currency)
                                .filter((value) => typeof value === 'string')
                                .map((currencyKey) => (
                                    <MenuItem key={currencyKey} value={currencyKey}>
                                        {currencyKey}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                </Grid>
                <TextField
                    label="Datum"
                    onChange={(e) => setDate(new Date(e.target.value))}
                    required
                    variant="outlined"
                    color="secondary"
                    type="date"
                    value={date.toISOString().split('T')[0]}
                    fullWidth
                    sx={{ mb: 3 }}
                >
                    <DatePicker
                        label="Controlled picker"
                        value={date}
                        onChange={(newValue) => setDate(newValue || new Date())}
                    />
                </TextField>
                <TextField
                    label="Bezahlt von"
                    onChange={(event) => handleSelectChange(event, setSpenderUserId)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="category"
                    select
                    fullWidth
                    sx={{mb: 3}}
                    value={spenderUserId || ''}
                >
                    {users.map((userData: UserData) => (
                        <MenuItem key={userData.id} value={userData.id}>
                            {userData.firstName} {userData.lastName}
                        </MenuItem>
                    ))}
                </TextField>
                <div>
                    <div style={{ backgroundColor: 'lightgrey', padding: '10px' }}>
                        <FormControlLabel label="Für wen" control={<Checkbox {...parentCheckboxProps} />} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                        {users.map((user) => (
                            <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <FormControlLabel
                                        label={`${user.firstName} ${user.lastName}`}
                                        control={<Checkbox checked={user.checked} onChange={handleChangeUser(user.id)} />}
                                    />
                                </div>
                                <div>
                                    {userShares[user.id]?.toFixed(2).replace('.', ',') || '0,00'} {currency}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                    <Button variant="outlined" color="error" onClick={goBackToTricount}>
                        Abbrechen
                    </Button>
                    <Button variant="outlined" color="secondary" type="submit">
                        Sichern
                    </Button>
                </div>
            </form>
        </React.Fragment>
    );
}
