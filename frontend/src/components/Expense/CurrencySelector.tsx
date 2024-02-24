import {MenuItem, TextField} from "@mui/material";
import { Currency } from "../../types/Currency";

interface CurrencySelectorProps {
    currency: string;
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
    handleSelectChange: <T extends string | number>(
        event: React.ChangeEvent<{ value: unknown }>,
        setSpenderUserId: React.Dispatch<React.SetStateAction<T>>,
    ) => void;
}

export default function CurrencySelector({ currency, setCurrency, handleSelectChange }: CurrencySelectorProps) {
    return (
        <TextField
            label="Währung"
            onChange={(event) => handleSelectChange(event, setCurrency)}
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