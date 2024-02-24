import {MenuItem, TextField} from "@mui/material";
import { Currency } from "../../types/Currency";
import React from "react";

interface TitleSelectorProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export default function TitleSelector({ title, setTitle }: TitleSelectorProps) {
    return (
        <TextField
            label="Titel"
            onChange={e => setTitle(e.target.value)}
            variant="outlined"
            color="secondary"
            type="title"
            sx={{mb: 3}}
            fullWidth
            value={title}
        />
    );
}