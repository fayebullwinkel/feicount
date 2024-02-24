import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import React from "react";

interface DateComponentProps {
    selectedDate: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function DateSelector({ selectedDate, setDate }: DateComponentProps) {
    return (
        <TextField
            label="Datum"
            onChange={(e) => setDate(new Date(e.target.value))}
            required
            variant="outlined"
            color="secondary"
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            fullWidth
            sx={{ mb: 3 }}
        >
            <DatePicker
                label="Controlled picker"
                value={selectedDate}
                onChange={(newValue) => setDate(newValue || new Date())}
            />
        </TextField>
    );
}