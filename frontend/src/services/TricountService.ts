import { Currency } from "../types/Currency";

export interface ExpenseData {
    id: number;
    title: string;
    amount: number;
    currency: Currency;
    date: Date;
    spenderUserId: number;
    recipientIds: number[];
}

export interface UserData {
    id: number,
    firstName: string,
    lastName: string,
    tricountIds?: number[];
    expenseIds?: number[];
    checked?: boolean;
}
const BASE_URL = '/api/Tricount';

const TricountService = {
    fetchUsers: async (tricountId: string): Promise<UserData[]> => {
        try {
            const response = await fetch(`${BASE_URL}/${tricountId}/Users`);
            if (!response.ok) {
                throw new Error('Failed to fetch Tricount users');
            }

            return response.json();
        } catch (error) {
            console.error('TricountService - fetchUsers:', error);
            throw error;
        }
    },

    createExpense: async (tricountId: number, expenseData: ExpenseData): Promise<any> => {
        try {
            const response = await fetch(`${BASE_URL}/${tricountId}/Expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenseData),
            });

            if (!response.ok) {
                throw new Error('Failed to create Tricount expense');
            }

            return response.json();
        } catch (error) {
            console.error('TricountService - createExpense:', error);
            throw error;
        }
    },
};

export default TricountService;
