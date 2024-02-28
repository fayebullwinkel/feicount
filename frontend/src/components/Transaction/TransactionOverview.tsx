import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    Typography
} from '@mui/material';
import { User } from '../Feicount/Feicount';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface OverviewProps {
    feicountId: number;
    users: User[];
}

interface Transaction {
    id: number,
    debtorId: number,
    creditorId: number,
    amount: number
}

const getTransactions = async (feicountId: number): Promise<Transaction[]> => {
    try {
        const transactionsResponse: Response = await fetch(`/api/Feicount/${feicountId}/Transactions`);

        if (!transactionsResponse.ok) {
            throw new Error(`Failed to fetch transactions for feicount ${feicountId}`);
        }

        return await transactionsResponse.json();
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
}

export default function TransactionOverview({ feicountId, users }: OverviewProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const transactionsResponse: Response = await fetch(`/api/Feicount/${feicountId}/Transactions`);

                if (!transactionsResponse.ok) {
                    throw new Error(`Failed to fetch transactions for feicount ${feicountId}`);
                }

                const fetchedTransactions = await transactionsResponse.json();
                setTransactions(fetchedTransactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        if (users.length > 0) {
            setTransactions([]);
            fetchTransactions();
        }
    }, [feicountId, users]);

    return (
        <div>
            {transactions.map((transaction) => {
                return (
                    <Card key={transaction.id} style={{ margin: '10px' }}>
                        <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', width: '100%' }}>
                                <div style={{ flex: 1 }}>
                                    <Typography component="p" variant="h6" style={{ margin: '10px' }}>
                                        {users.find(user => user.id === transaction.debtorId)?.userName}
                                    </Typography>
                                    <Typography color="text-secondary" variant="body2" component="p" style={{ margin: '10px' }}>
                                        schuldet
                                    </Typography>
                                    <Typography variant="h6" style={{ margin: '10px' }} gutterBottom>
                                        {users.find(user => user.id === transaction.creditorId)?.userName}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography component="p" variant="h6">
                                        {(transaction.amount / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                                    </Typography>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                <Button variant="outlined" color="error" onClick={() => navigate(`/feicount/${feicountId}`)}>
                    Zurück
                </Button>
            </div>
        </div>
    );
};