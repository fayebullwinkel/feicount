import { Grid } from "@mui/material";
import React from "react";

interface ExpenseOverviewProps {
    expense: {
        title: string;
        amount: number;
        date: string;
    };
    spender: {
        firstName: string;
    };
}

const ExpenseOverview: React.FC<ExpenseOverviewProps> = ({ expense, spender }) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <div>{expense.title}</div>
                    <div>
                        Bezahlt von <b>{spender.firstName}</b>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div>
                        {(expense.amount / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </div>
                    <div>{new Date(expense.date).toLocaleDateString('de-DE')}</div>
                </Grid>
            </Grid>
        </>
    );
};

export default ExpenseOverview;