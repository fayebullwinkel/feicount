import { TextField } from "@mui/material";
import React from "react";

interface TitleInputProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export default function TitleInput({ title, setTitle }: TitleInputProps) {
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