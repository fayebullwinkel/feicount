import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
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

const getUserBalances = async (tricountId: number, users: User[], setUserBalances: React.Dispatch<React.SetStateAction<Balance[]>>) => {
    try {
        const fetchUserBalance = async (user: User) => {
            const userBalanceResponse = await fetch(`/api/Feicount/${tricountId}/Users/${user.id}/Balance`);

            if (!userBalanceResponse.ok) {
                throw new Error(`Failed to fetch user balance for user ${user.id}`);
            }
            return userBalanceResponse.json();
        };

        const userBalances = await Promise.all(users.map(fetchUserBalance));

        setUserBalances(userBalances);
    } catch (error) {
        console.error('Error fetching user balance:', error);
    }
};


const getUserBalanceColor = (userId: number, userBalances: Balance[]) => {
const userBalance: Balance | undefined = userBalances.find((balance) => balance.userId === userId);
    return userBalance && userBalance.amount < 0 ? '#f2a593' : '#9fd6a5';
};

export default function BalanceTable({ tricountId, users }: BalanceTableProps) {
    const [userBalances, setUserBalances] = useState<Balance[]>([]);

    useEffect(() => {
        if (users.length > 0) {
            try {
                setUserBalances([])
                getUserBalances(tricountId, users, setUserBalances);
            } catch (error) {
                console.error('Error fetching balances:', error);
            }
        }
    }, [tricountId, users]);

    return (
        <TableContainer style={{ width: '100%' }}>
            <Table>
                <TableBody>
                    {userBalances.map((userBalance: Balance, index: number) => {
                        const user: User | undefined = users.find((user) => user.id === userBalance.userId);
                        const formattedAmount = (userBalance.amount / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
                        const displayText: string = index % 2 === 0 ? `${user?.firstName} ${formattedAmount}` : `${formattedAmount} ${user?.firstName}`;
                        const [firstCell, secondCell] = displayText.split(' ');

                        return (
                            <TableRow key={userBalance.userId}>
                                <TableCell style={{ backgroundColor: index % 2 === 0 ? '' : getUserBalanceColor(userBalance.userId, userBalances), textAlign: 'right' }}>
                                    {firstCell}
                                </TableCell>
                                <TableCell style={{ backgroundColor: index % 2 === 0 ? getUserBalanceColor(userBalance.userId, userBalances) : '' }}>
                                    {secondCell}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
