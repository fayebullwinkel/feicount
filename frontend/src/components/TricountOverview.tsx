import * as React from 'react';
import {Grid} from "@mui/material";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useNavigate} from 'react-router-dom';

interface TricountOverviewProps {
    id: string;
    title: string;
    description: string;
}

const TricountOverview: React.FC<TricountOverviewProps> = ({id, title, description}) => {
    const navigate = useNavigate();

    const goToTricount = () => {
        navigate(`/tricount/${id}`);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <h3>{title}</h3>
                    {description}
                </Grid>
                <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Button variant="text" onClick={goToTricount}>
                        <ArrowForwardIosIcon/>
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default TricountOverview;