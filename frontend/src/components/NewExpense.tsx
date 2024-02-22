import React, {useEffect, useState} from "react";
import {TextField, Button, MenuItem} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface ExpenseData {
    id: number;
    title: string;
    amount: number;
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
}

export default function NewExpense() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [spenderUserId, setSpenderUserId] = useState(1); // TODO: initial spender and recipients logic
    const [recipientIds, setRecipientIds] = useState(2);
    const [amountError, setAmountError] = useState(false);
    const [users, setUsers] = useState<UserData[]>([]);
    const [user, setUser] = useState<UserData>({id: 0, firstName: "", lastName: ""});
    const navigate = useNavigate();
    const handleSelectChange = (
        event: React.ChangeEvent<{ value: unknown }>,
        setUser: React.Dispatch<React.SetStateAction<UserData>>,
    ) => {
        const selectedUserId = event.target.value;
        const selectedUser: UserData | undefined = users.find(user => user.id === selectedUserId);

        if (selectedUser) {
            setUser(selectedUser);
        }
    };

    useEffect(() => {
        fetchTricountUsers();
    }, []);

    const fetchTricountUsers = async () => {
        try {
            const tricountUserResponse: Response = await fetch(`/api/Tricount/${id}/Users`);
            if (!tricountUserResponse.ok) {
                throw new Error('Failed to fetch tricounts');
            }

            const usersData: UserData[] = await tricountUserResponse.json();
            setUsers(usersData);

            if (usersData.length > 0) {
                setUser(usersData[0]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setAmountError(false);

        if (title == '') {
            setAmountError(true);
        }

        const postData: ExpenseData = {
            id: 0,
            title,
            amount,
            date,
            spenderUserId: 1, // TODO: fill with values
            recipientIds: [2]
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
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                    <Button variant="outlined" color="error" onClick={goBackToTricount}>
                        Abbrechen
                    </Button>
                    <h2>Neue Ausgabe</h2>
                    <Button variant="outlined" color="secondary" type="submit">
                        Sichern
                    </Button>
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
                <TextField
                    label="Betrag"
                    onChange={e => setAmount(Number(e.target.value))}
                    required
                    variant="outlined"
                    color="secondary"
                    type="amount"
                    value={amount} // TODO do calculation between cents and euros
                    fullWidth
                    sx={{mb: 3}}
                    error={amountError}
                />
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
                    onChange={(event) => handleSelectChange(event, setUser)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="category"
                    select
                    fullWidth
                    sx={{mb: 3}}
                    value={user.id || ''}
                >
                    {users.map((user: UserData) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.firstName} {user.lastName}
                        </MenuItem>
                    ))}
                </TextField>
            </form>
        </React.Fragment>
    );
}
