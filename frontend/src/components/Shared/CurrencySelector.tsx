import {MenuItem, TextField} from "@mui/material";
import { Currency } from "../../types/Currency";
import React from "react";

interface CurrencySelectorProps {
    currency: string;
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export default function CurrencySelector({ currency, setCurrency }: CurrencySelectorProps) {
    
    return (
        <TextField
            label="Währung"
            onChange={(event) => setCurrency(event.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="currency"
            value={currency}
            select
            fullWidth
            sx={{ mb: 3 }}
        >
            {Object.values(Currency)
                .filter((value) => typeof value === 'string')
                .map((currencyKey) => (
                    <MenuItem key={currencyKey} value={currencyKey}>
                        {currencyKey}
                    </MenuItem>
                ))}
        </TextField>
    );
}