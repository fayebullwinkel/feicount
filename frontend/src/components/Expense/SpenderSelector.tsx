import {MenuItem, TextField} from "@mui/material";
import { UserData } from "../../services/TricountService";

interface SpenderSelectorProps {
    users: UserData[];
    spenderUserId: number;
    setSpenderUserId: React.Dispatch<React.SetStateAction<number>>;
    handleSelectChange: <T extends string | number>(
        event: React.ChangeEvent<{ value: unknown }>,
        setSpenderUserId: React.Dispatch<React.SetStateAction<T>>,
    ) => void;
}

export default function SpenderSelector({ users, spenderUserId, setSpenderUserId, handleSelectChange }: SpenderSelectorProps) {
    return (
        <TextField
            label="Bezahlt von"
            onChange={(event) => handleSelectChange(event, setSpenderUserId)}
            required
            variant="outlined"
            color="secondary"
            type="category"
            select
            fullWidth
            sx={{mb: 3}}
            value={spenderUserId || ''}
        >
            {users.map((userData: UserData) => (
                <MenuItem key={userData.id} value={userData.id}>
                    {userData.firstName} {userData.lastName}
                </MenuItem>
            ))}
        </TextField>
    );
}