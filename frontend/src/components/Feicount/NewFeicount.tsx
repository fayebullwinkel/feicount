import React, {useState} from "react";
import {TextField, Button, MenuItem, Box, List, ListItem, ListItemText} from "@mui/material";
import {Currency, mapToCurrency} from "../../types/Currency";
import {Category, mapToCategory} from "../../types/Category";
import {FeicountData} from "../Home";
import {useNavigate} from "react-router-dom";
import FormActions from "../FormActions";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import CurrencySelector from "../Shared/CurrencySelector";

export default function NewFeicount() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState(Currency[Currency.EUR]);
    const [category, setCategory] = useState(Category[Category.Reise]);
    const [titleError, setTitleError] = useState(false);
    const [currentUser, setCurrentUser] = useState<string>('');
    const [userNames, setUserNames] = useState<string[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleSaveInput = () => {
        if (currentUser.trim() !== '') {
            if (editIndex !== null) {
                const updatedInputs = [...userNames];
                updatedInputs[editIndex] = currentUser;
                setUserNames(updatedInputs);
                setEditIndex(null);
            } else {
                setUserNames([...userNames, currentUser]);
            }

            setCurrentUser('');
        }
    };


    const handleEditInput = (index: number | null) => {
        if (index !== null) {
            setEditIndex(index);
            setCurrentUser(userNames[index] || '');
        }
    };


    const handleDeleteInput = (index: number) => {
        const updatedInputs = [...userNames];
        updatedInputs.splice(index, 1);
        setUserNames(updatedInputs);
        setEditIndex(null);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setTitleError(false);

        if (title == '') {
            setTitleError(true);
        }

        const postData: FeicountData = {
            id: 0,
            title,
            description,
            currency: mapToCurrency(currency),
            category: mapToCategory(category),
            userIds: [], // TODO: fill with actual values
            userNames,
            expenseIds: [] // TODO: fill with actual values
        };

        try {
            const postResponse = await fetch('/api/Feicount', {
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

    return (
        <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                    <h2>Neuer Feicount</h2>
                </div>
                <TitleInput title={title} setTitle={setTitle} titleError={titleError}/>
                <DescriptionInput description={description} setDescription={setDescription}/>
                <CurrencySelector currency={currency} setCurrency={setCurrency}/>
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
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            label="Teilnehmer:innen"
                            value={currentUser}
                            onChange={(e) => setCurrentUser(e.target.value)}
                            fullWidth
                            sx={{ marginRight: '8px' }}
                        />
                        <Button variant="outlined" color="primary" onClick={handleSaveInput}>
                            {editIndex !== null ? 'Speichern' : 'Hinzufügen'}
                        </Button>
                    </div>
                    {userNames.length > 0 && (
                        <List>
                            {userNames.map((input, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={input} />
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Button variant="outlined" color="primary" onClick={() => handleEditInput(index)}>
                                            Ändern
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={() => handleDeleteInput(index)}>
                                            Löschen
                                        </Button>
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </div>
                <FormActions prevPage={'/'} navigate={navigate}/>
            </form>
        </React.Fragment>
    );
}
