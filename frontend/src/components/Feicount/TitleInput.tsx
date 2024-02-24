import {MenuItem, TextField} from "@mui/material";
import { Currency } from "../../types/Currency";
import React from "react";

interface TitleSelectorProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    titleError: boolean;
}

export default function TitleInput({ title, setTitle, titleError }: TitleSelectorProps) {
    return (
        <TextField
            label="Titel"
            onChange={e => setTitle(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="title"
            sx={{mb: 3}}
            fullWidth
            value={title}
            error={titleError}
        />
    );
}