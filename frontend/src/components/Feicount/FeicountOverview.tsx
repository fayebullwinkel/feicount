import * as React from 'react';
import {Grid} from "@mui/material";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {NavigateFunction, useNavigate} from 'react-router-dom';

interface FeicountOverviewProps {
    id: string;
    title: string;
    description: string;
}

export default function FeicountOverview({id, title, description}: FeicountOverviewProps) {
    const navigate: NavigateFunction = useNavigate();

    const goToFeicount = () => {
        navigate(`/feicount/${id}`);
    };

    return (
        <>
            <Grid container spacing={2} style={{margin:"10px"}} onClick={goToFeicount}>
                <Grid item xs={8}>
                    <h3>{title}</h3>
                    {description || "keine Beschreibung"}
                </Grid>
                <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Button variant="text">
                        <ArrowForwardIosIcon/>
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};