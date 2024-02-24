import {MenuItem, TextField} from "@mui/material";
import { UserData } from "../../services/FeicountService";

interface SpenderSelectorProps {
    users: UserData[];
    spenderUserId: number;
    setSpenderUserId: React.Dispatch<React.SetStateAction<number>>;
}

export default function SpenderSelector({ users, spenderUserId, setSpenderUserId }: SpenderSelectorProps) {
    return (
        <TextField
            label="Bezahlt von"
            onChange={(event) => setSpenderUserId(Number(event.target.value))}
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