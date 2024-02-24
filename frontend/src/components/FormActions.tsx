import { Button } from "@mui/material";
import { NavigateFunction } from "react-router-dom";

interface FormActionsProps {
    prevPage: string;
    navigate: NavigateFunction;
}

const goBack = (prevPage: string, navigate: NavigateFunction) => {
    navigate(prevPage);
};

export default function FormActions({ prevPage, navigate }: FormActionsProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
            <Button variant="outlined" color="error" onClick={() => goBack(prevPage, navigate)}>
                Abbrechen
            </Button>
            <Button variant="outlined" color="secondary" type="submit">
                Sichern
            </Button>
        </div>
    );
}