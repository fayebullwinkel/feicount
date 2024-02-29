import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {UserData} from "../../services/FeicountService";

interface RecipientsSelectorProps {
    users: UserData[];
    setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
    currency: string;
    amount: number;
}

const RecipientsSelector = ({ users, setUsers, currency, amount }: RecipientsSelectorProps) => {
    const [userShares, setUserShares] = useState<Record<number, number>>({});
    const atLeastOneChecked = users.some((user) => user.checked);
    
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
                user.id === userId ? {...user, checked: event.target.checked} : user
            )
        );
    };

    const updateShares = () => { // TODO: Update logic to have recipient pay less if it does not add up correctly
        const checkedUsers: UserData[] = users.filter((user) => user.checked);
        const totalCheckedUsers = checkedUsers.length;

        if (totalCheckedUsers === 0) return;

        const share = amount / 100 / totalCheckedUsers;
        const newShares: Record<number, number> = {};
        checkedUsers.forEach((user) => {
            newShares[user.id] = share;
        });

        setUserShares(newShares);
    };

    useEffect(() => {
        updateShares();
    }, [users]);

    return (
        <div>
            <div style={{backgroundColor: "lightgrey", padding: "10px"}}>
                <FormControlLabel
                    label="Für wen"
                    control={<Checkbox {...parentCheckboxProps} />}
                />
            </div>
            <div style={{display: "flex", flexDirection: "column", padding: "10px"}}>
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
                                label={`${user.userName}`}
                                control={
                                    <Checkbox
                                        checked={user.checked}
                                        onChange={handleChangeUser(user.id)}
                                    />
                                }
                            />
                        </div>
                        <div>
                            {atLeastOneChecked ? (
                                `${userShares[user.id]?.toFixed(2).replace(".", ",") || "0,00"} ${currency}`
                            ) : (
                                `0,00 ${currency}`
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipientsSelector;