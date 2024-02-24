import {MenuItem, TextField} from "@mui/material";
import { Currency } from "../../types/Currency";
import React from "react";

interface AmountSelectorProps {
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    amountError: boolean;
}

export default function AmountSelector({ amount, setAmount, amountError }: AmountSelectorProps) {
    return (
        <TextField
            label="Betrag"
            onChange={(e) => {
                setAmount(Number(e.target.value));
            }}
            required
            variant="outlined"
            color="secondary"
            type="amount"
            value={amount}
            fullWidth
            sx={{ mb: 3 }}
            error={amountError}
        />
    );
}