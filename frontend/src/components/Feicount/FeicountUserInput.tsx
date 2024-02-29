import {Button, List, ListItem, ListItemText, MenuItem, TextField} from "@mui/material";
import {Category} from "../../types/Category";
import React, {useState} from "react";
import {User} from "./Feicount";

interface FeicountUserInputProps {
    userNames: string[];
    setUserNames: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function FeicountUserInput({userNames, setUserNames}: FeicountUserInputProps) {
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [currentUser, setCurrentUser] = useState<string>('');
    const handleUserInputKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSaveInput();
        }
    };

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

    return (
        <div>
            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                        label="Teilnehmer:innen"
                        value={currentUser}
                        onChange={(e) => setCurrentUser(e.target.value)}
                        fullWidth
                        sx={{marginRight: '8px'}}
                        onKeyPress={handleUserInputKeyPress}
                    />
                    <Button variant="outlined" color="primary" onClick={handleSaveInput}>
                        {editIndex !== null ? 'Speichern' : 'Hinzufügen'}
                    </Button>
                </div>
            </div>
            {userNames.length > 0 && (
                <List>
                    {userNames.map((input, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={input}/>
                            <div style={{display: 'flex', gap: '8px'}}>
                                <Button variant="outlined" color="primary"
                                        onClick={() => handleEditInput(index)}>
                                    Ändern
                                </Button>
                                <Button variant="outlined" color="error"
                                        onClick={() => handleDeleteInput(index)}>
                                    Löschen
                                </Button>
                            </div>
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
}