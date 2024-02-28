import {TextField} from "@mui/material";
import React, {useState} from "react";

interface AmountInputProps {
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    amountError: boolean;
}

function parseMonetaryValue(valueString: string) {
    const re = /^(-)?(\d*)(?:[.,](\d{0,2}))?\d*$/
    const match = valueString.replace(/\s/g, "").match(re)

    if (!match || match[2].length + (match[3]?.length ?? 0) == 0)
        return null

    const sign = match[1] ? -1 : 1
    const euros = parseInt(match[2]) || 0
    let cents = parseInt(match[3]) || 0
    return sign * (euros * 100 + cents)
}

function formatPrice(value: number): string {
    return (value / 100 >> 0).toString().padStart(1, "0") + "," + Math.abs(value % 100).toString().padStart(2, "0")
}

export default function AmountInput({ amount, setAmount, amountError }: AmountInputProps) {
    const [amountString, setAmountString] = useState("");
    
    return (
        <TextField
            label="Betrag"
            onChange={(e) => {
                setAmountString(e.target.value);
                const cents = parseMonetaryValue(e.target.value);
                
                if (cents) {
                    setAmount(cents);
                } else {
                    console.log("Unable to parse", e.target.value);
                }
            }}
            onBlur={() => {
                const formatted = formatPrice(amount);
                setAmountString(formatted);
            }}
            required
            variant="outlined"
            color="secondary"
            type="amount"
            value={amountString}
            fullWidth
            sx={{ mb: 3 }}
            error={amountError}
        />
    );
}