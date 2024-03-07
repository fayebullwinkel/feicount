import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import {User} from '../Feicount/Feicount';
import {NavigateFunction, useNavigate} from 'react-router-dom';

interface OverviewProps {
    feicountId: number;
    users: User[];
}

interface Transaction {
    id: number;
    debtorId: number;
    creditorId: number;
    amount: number;
}

export default function TransactionOverview({feicountId, users}: OverviewProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
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

    const handleOpenDialog = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedTransaction(null);
        setOpenDialog(false);
    };

    const handleConfirmPayment = async () => {
        if (selectedTransaction) {
            try {
                // Call your payTransaction function or any other logic here
                await payTransaction(selectedTransaction);
                setOpenDialog(false);
            } catch (error) {
                console.error('Error confirming payment:', error);
            }
        }
    };

    const payTransaction = async (transaction: Transaction) => {
        const postResponse = await fetch(`api/Feicount/${feicountId}/Transactions/${transaction.id}/Pay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });

        if (!postResponse.ok) {
            throw new Error('Failed to post data');
        }

        navigate(`/feicount/${feicountId}`);
    };

    return (
        <div>
            {transactions.map((transaction) => {
                return (
                    <Card key={transaction.id} style={{margin: '10px', position: 'relative'}}>
                        <CardContent style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '10px',
                                width: '100%'
                            }}>
                                <div style={{flex: 1}}>
                                    <Typography component="p" variant="h6" style={{margin: '10px'}}>
                                        {users.find(user => user.id === transaction.debtorId)?.userName}
                                    </Typography>
                                    <Typography color="text-secondary" variant="body2" component="p"
                                                style={{margin: '10px'}}>
                                        schuldet
                                    </Typography>
                                    <Typography variant="h6" style={{margin: '10px'}} gutterBottom>
                                        {users.find(user => user.id === transaction.creditorId)?.userName}
                                    </Typography>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Typography component="p" variant="h6">
                                        {(transaction.amount / 100).toLocaleString('de-DE', {
                                            style: 'currency',
                                            currency: 'EUR'
                                        })}
                                    </Typography>
                                </div>
                            </div>
                            <Button
                                variant="outlined"
                                color="info"
                                onClick={() => handleOpenDialog(transaction)}
                                style={{position: 'absolute', bottom: '10px', right: '10px'}}
                            >
                                Bezahlen
                            </Button>
                        </CardContent>
                    </Card>
                );
            })}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Bezahlung bestätigen</DialogTitle>
                <DialogContent>
                    <Typography>
                        {`Wurden die ${((selectedTransaction?.amount || 0) / 100).toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR'
                        })} von ${
                            users.find((user) => user.id === selectedTransaction?.debtorId)?.userName
                        } an ${
                            users.find((user) => user.id === selectedTransaction?.creditorId)?.userName
                        } zurückgezahlt?`}
                    </Typography>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-between', padding: '16px' }}>
                    <Button onClick={handleCloseDialog} color="error">
                        Abbrechen
                    </Button>
                    <Button onClick={handleConfirmPayment} color="info">
                        Bestätigen
                    </Button>
                </DialogActions>
            </Dialog>
            <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px'}}>
                <Button variant="outlined" color="error" onClick={() => navigate(`/feicount/${feicountId}`)}>
                    Zurück
                </Button>
            </div>
        </div>
    );
}
