import {Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

interface OverviewProps {
    expense: {
        title?: string;
        amount: number;
        date: string;
    };
    spender: {
        userName: string;
    };
}
export default function Overview({ expense, spender }: OverviewProps) {
    return (
        <Card style={{margin:"10px"}}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography variant="h6">{expense.title}</Typography>
                        <Typography>
                            Bezahlt von <b>{spender.userName}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            {(expense.amount / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                        </Typography>
                        <Typography>{new Date(expense.date).toLocaleDateString('de-DE')}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}