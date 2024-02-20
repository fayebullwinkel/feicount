import React, {useState} from "react";
import {TextField, Button, MenuItem} from "@mui/material";
import { Currency } from "../types/Currency";
import { Category } from "../types/Category";
import { TricountData } from "./Home";
import {useNavigate} from "react-router-dom";

export default function NewTricount() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState(Currency[Currency.EUR]);
    const [category, setCategory] = useState(Category[Category.Reise]);
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const navigate = useNavigate();
    const handleSelectChange = (
        event: React.ChangeEvent<{ value: unknown }>,
        setState: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        const selectedKey = event.target.value as string;
        setState(selectedKey);
    };

    const mapToEnum = (value: string, enumType: any) => {
        return enumType[value];
    };
    
    const handleSubmit = async (event: any) => {
        event.preventDefault()

        setTitleError(false)
        setDescriptionError(false)

        if (title == '') {
            setTitleError(true)
        }
        if (description == '') {
            setDescriptionError(true)
        }

        const postData: TricountData = {
            id: 0,
            title,
            description,
            currency: mapToEnum(currency, Currency),
            category: mapToEnum(category, Category),
            userIds: [],
            userNames: [],
            expenseIds: []
        };

        try {
            const postResponse = await fetch('/api/Tricount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData),
            });

            if (!postResponse.ok) {
                throw new Error('Failed to post data');
            }

            navigate('/');
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const goToHome = async () => {
        navigate('/');
    }

    // TODO: abbrechen button
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" color="error" onClick={goToHome}>
                        Abbrechen
                    </Button>
                    <Button variant="outlined" color="secondary" type="submit">
                        Sichern
                    </Button>
                </div>
            </form>
        </React.Fragment>
    );
}
