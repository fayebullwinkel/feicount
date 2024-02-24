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
    feicountIds?: number[];
    expenseIds?: number[];
    checked?: boolean;
}
const BASE_URL = '/api/Feicount';

const FeicountService = {
    fetchUsers: async (feicountId: string): Promise<UserData[]> => {
        try {
            const response = await fetch(`${BASE_URL}/${feicountId}/Users`);
            if (!response.ok) {
                throw new Error('Failed to fetch Feicount users');
            }

            return response.json();
        } catch (error) {
            console.error('FeicountService - fetchUsers:', error);
            throw error;
        }
    },

    createExpense: async (feicountId: number, expenseData: ExpenseData): Promise<void> => {
        try {
            const response = await fetch(`${BASE_URL}/${feicountId}/Expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenseData),
            });

            if (!response.ok) {
                throw new Error('Failed to create Feicount expense');
            }
        } catch (error) {
            console.error('feicountService - createExpense:', error);
            throw error;
        }
    },
};

export default FeicountService;
