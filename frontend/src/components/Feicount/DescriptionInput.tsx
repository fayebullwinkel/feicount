import {MenuItem, TextField} from "@mui/material";
import { Currency } from "../../types/Currency";
import React from "react";

interface DescriptionInputProps {
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default function DescriptionInput({ description, setDescription }: DescriptionInputProps) {
    return (
        <TextField
            label="Beschreibung"
            onChange={e => setDescription(e.target.value)}
            variant="outlined"
            color="secondary"
            type="description"
            value={description}
            fullWidth
            sx={{mb: 3}}
        />
    );
}