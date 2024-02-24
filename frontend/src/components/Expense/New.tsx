import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {Currency, mapToCurrency} from "../../types/Currency";
import DateSelector from "./DateSelector";
import RecipientsSelector from "./RecipientsSelector";
import SpenderSelector from "./SpenderSelector";
import CurrencySelector from "./CurrencySelector";
import FormActions from "../FormActions";
import TricountService, {ExpenseData, UserData} from "../../services/TricountService";
import TitleSelector from "./TitleSelector";
import AmountSelector from "./AmountSelector";

export default function NewExpense() {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [spenderUserId, setSpenderUserId] = useState(0);
    const [recipientIds, setRecipientIds] = useState([0]);
    const [amountError, setAmountError] = useState(false);
    const [users, setUsers] = useState<UserData[]>([]);
    const [currency, setCurrency] = useState(Currency[Currency.EUR]);
    const navigate = useNavigate();

    const handleSelectChange = <T extends string | number>(
        event: React.ChangeEvent<{ value: unknown }>,
        setSpenderUserId: React.Dispatch<React.SetStateAction<T>>,
    ) => {
        setSpenderUserId(event.target.value as T);
    };

    const fetchTricountUsers = async () => {
        try {
            const usersData: UserData[] = await TricountService.fetchUsers(id!);
            const isUsersUpdated = users && users.length > 0;
            const updatedUsers = usersData.map(user => ({
                ...user,
                checked: isUsersUpdated ? users.some(u => u.id === user.id && u.checked) : true
            }));

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setAmountError(false);
        setRecipientIds([]);

        if (amount === 0) {
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
            await TricountService.createExpense(Number(id), postData);
            navigate(`/tricount/${id}`);
        } catch (err: any) {
            console.error(err.message);
        }
    }

    return (
        <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div style={{display: 'flex', justifyContent: 'center', margin: '10px'}}>
                    <h2>Neue Ausgabe</h2>
                </div>
                <TitleSelector title={title} setTitle={setTitle}/>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <AmountSelector amount={amount} setAmount={setAmount} amountError={amountError}/>
                    </Grid>
                    <Grid item xs={4}>
                        <CurrencySelector currency={currency} setCurrency={setCurrency}
                                          handleSelectChange={handleSelectChange}/>
                    </Grid>
                </Grid>
                <DateSelector selectedDate={date} setDate={setDate}/>
                <SpenderSelector users={users} spenderUserId={spenderUserId} setSpenderUserId={setSpenderUserId}
                                 handleSelectChange={handleSelectChange}/>
                <RecipientsSelector users={users} setUsers={setUsers} currency={currency} amount={amount}/>
                <FormActions prevPage={`/tricount/${id}`} navigate={navigate}/>
            </form>
        </React.Fragment>
    );
}