import {MenuItem, TextField} from "@mui/material";
import {Category} from "../../types/Category";
import React from "react";

interface CategorySelectorProps {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function CategorySelector({category, setCategory}: CategorySelectorProps) {

    return (
        <TextField
            label="Kategorie"
            onChange={(event) => setCategory(event.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="category"
            value={category}
            select
            fullWidth
            sx={{mb: 3}}
        >
            {Object.values(Category)
                .filter((value) => typeof value === 'string')
                .map((categoryKey) => (
                    <MenuItem key={categoryKey} value={categoryKey}>
                        {categoryKey}
                    </MenuItem>
                ))}
        </TextField>
    );
}