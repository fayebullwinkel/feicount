import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { UserData } from "../../services/TricountService";

interface RecipientsSelectorProps {
    users: UserData[];
    userShares: Record<number, number>;
    setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
    currency: string;
}

const RecipientsSelector = ({
                                users,
                                userShares,
                                setUsers,
                                currency,
                            }: RecipientsSelectorProps) => {
    const parentCheckboxProps = {
        checked: users.every((user) => user.checked),
        indeterminate:
            users.some((user) => user.checked) &&
            users.some((user) => !user.checked),
        onChange: () => {
            const allChecked = users.every((user) => user.checked);
            const updatedUsers = users.map((user) => ({
                ...user,
                checked: !allChecked,
            }));
            setUsers(updatedUsers);
        },
    };

    const handleChangeUser = (userId: number) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, checked: event.target.checked } : user
            )
        );
    };

    return (
        <div>
            <div style={{ backgroundColor: "lightgrey", padding: "10px" }}>
                <FormControlLabel
                    label="Für wen"
                    control={<Checkbox {...parentCheckboxProps} />}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                {users.map((user) => (
                    <div
                        key={user.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <FormControlLabel
                                label={`${user.firstName} ${user.lastName}`}
                                control={
                                    <Checkbox
                                        checked={user.checked}
                                        onChange={handleChangeUser(user.id)}
                                    />
                                }
                            />
                        </div>
                        <div>
                            {userShares[user.id]?.toFixed(2).replace(".", ",") || "0,00"}{" "}
                            {currency}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipientsSelector;