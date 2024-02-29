import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from '@mui/material';
import { User } from '../Feicount/Feicount';

interface BalanceTableProps {
    tricountId: number;
    users: User[];
}

interface Balance {
    userId: number,
    amount: number
}

const getUserBalanceColor = (userId: number, userBalances: Balance[]) => {
const userBalance: Balance | undefined = userBalances.find((balance) => balance.userId === userId);
    return userBalance && userBalance.amount < 0 ? '#f2a593' : '#9fd6a5';
};

export default function BalanceTable({ tricountId, users }: BalanceTableProps) {
    const [userBalances, setUserBalances] = useState<Balance[]>([]);
    const [maxBalance, setMaxBalance] = useState<number>(0);
    
    useEffect(() => {
        const fetchUserBalance = async (user: User) => {
            try {
                const userBalanceResponse = await fetch(`/api/Feicount/${tricountId}/Users/${user.id}/Balance`);

                if (!userBalanceResponse.ok) {
                    throw new Error(`Failed to fetch user balance for user ${user.id}`);
                }

                return await userBalanceResponse.json();
            } catch (error) {
                console.error('Error fetching user balance:', error);
                return { userId: user.id, amount: 0 };
            }
        };

        const getUserBalances = async () => {
            try {
                const userBalances: Balance[] = await Promise.all(users.map(fetchUserBalance));
                setUserBalances(userBalances);
                const absoluteMaxBalance: number =  Math.max(
                    ...userBalances.map((balance) => Math.abs(balance.amount))
                )/100;
                console.log(absoluteMaxBalance);
                setMaxBalance(absoluteMaxBalance);
            } catch (error) {
                console.error('Error fetching balances:', error);
            }
        };

        if (users.length > 0) {
            setUserBalances([]);
            getUserBalances();
        }
    }, [tricountId, users]);

    return (
        <TableContainer style={{ width: '100%' }}>
            <Table>
                <TableBody>
                    {userBalances.map((userBalance: Balance, index: number) => {
                        const user: User | undefined = users.find((user) => user.id === userBalance.userId);
                        const formattedAmount = (userBalance.amount / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
                        const displayText: string = userBalance.amount > 0 ? `${user?.userName} | ${formattedAmount}` : `${formattedAmount} | ${user?.userName}`;
                        const [firstCell, secondCell] = displayText.split(' | ');

                        return (
                            <TableRow key={userBalance.userId}>
                                <TableCell
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: userBalance.amount <= 0 ? getUserBalanceColor(userBalance.userId, userBalances) : '',
                                            width: index % 2 !== 0 ? `${Math.abs(userBalance.amount) / maxBalance}%` : 'auto',
                                            height: '100%',
                                            padding: '16px',
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            borderRadius: '5px 0 0 5px'
                                        }}
                                    >
                                        {firstCell}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div
                                        style={{
                                            backgroundColor: userBalance.amount > 0 ? getUserBalanceColor(userBalance.userId, userBalances) : '',
                                            width: index % 2 === 0 ? `${Math.abs(userBalance.amount) / maxBalance}%` : 'auto',
                                            height: '100%',
                                            padding: '16px',
                                            borderRadius: '0 5px 5px 0'
                                        }}
                                    >
                                        {secondCell}
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

