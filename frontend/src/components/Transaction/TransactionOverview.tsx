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
                    <Card key={transaction.id}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Creditor: {users.find(user => user.id === transaction.creditorId)?.firstName}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Debtor: {users.find(user => user.id === transaction.debtorId)?.firstName}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Amount: {(transaction.amount / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                            </Typography>
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