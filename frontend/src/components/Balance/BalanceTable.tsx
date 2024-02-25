import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

interface BalanceTableProps {
    tricountId: number;
}

interface User {
    id: number, 
    firstName: string,
    lastName: string,
    expenseIds: number[]
}

interface Balance {
    userId: number,
    amount: number
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
    return userBalance && userBalance.amount < 0 ? 'lightcoral' : 'lightgreen';
};

export default function BalanceTable({ tricountId }: BalanceTableProps) {
    const [userBalances, setUserBalances] = useState<Balance[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        try {
            setUsers([]);
            getTricountUsers(tricountId, setUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [tricountId]);

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
        <TableContainer>
            <Table>
                <TableBody>
                    {userBalances.map((userBalance, index) => {
                        const user = users.find((user) => user.id === userBalance.userId);
                        const displayText = index % 2 === 0 ? `${user?.firstName} ${userBalance.amount}` : `${userBalance.amount} ${user?.firstName}`;
                        const [firstCell, secondCell] = displayText.split(' ');

                        return (
                            <TableRow key={userBalance.userId}>
                                <TableCell style={{ backgroundColor: index % 2 === 0 ? '' : getUserBalanceColor(userBalance.userId, userBalances) }}>
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

