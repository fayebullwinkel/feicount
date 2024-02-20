import React, {useState} from "react";
import {TextField, Button, MenuItem} from "@mui/material";
import { Currency } from "../types/Currency";
import { Category } from "../types/Category";

export default function NewTricount() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState(Currency[Currency.EUR]);
    const [category, setCategory] = useState(Category[Category.Reise]);
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const handleSelectChange = (
        event: React.ChangeEvent<{ value: unknown }>,
        setState: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        const selectedKey = event.target.value as string;
        setState(selectedKey);
    };
    
    const handleSubmit = (event: any) => { // TODO check type any
        event.preventDefault()

        setTitleError(false)
        setDescriptionError(false)

        if (title == '') {
            setTitleError(true)
        }
        if (description == '') {
            setDescriptionError(true)
        }

        /*const postData: TricountData = {
            id: 0,
            title,
            description,
            currency,
            category,
            userIds: [],
            userNames: [],
            expenseIds: []
        };*/

    }

    // TODO: abbrechen und sichern button?
    return (
        <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <h2>Neuer Tricount</h2> 
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
                <TextField
                    label="Description"
                    onChange={e => setDescription(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="description"
                    value={description}
                    error={descriptionError}
                    fullWidth
                    sx={{mb: 3}}
                />
                <TextField
                    label="Currency"
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
                <TextField
                    label="Category"
                    onChange={(event) => handleSelectChange(event, setCategory)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="category"
                    value={category}
                    select
                    fullWidth
                    sx={{ mb: 3 }}
                >
                    {Object.values(Category)
                        .filter((value) => typeof value === 'string')
                        .map((categoryKey) => (
                            <MenuItem key={categoryKey} value={categoryKey}>
                                {categoryKey}
                            </MenuItem>
                        ))}
                </TextField>
                <Button variant="outlined" color="secondary" type="submit">Sichern</Button>

            </form>
        </React.Fragment>
    );
}
