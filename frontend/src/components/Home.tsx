import React, { useEffect, useState } from 'react';
import TricountOverview from './TricountOverview';
import AddIcon from "@mui/icons-material/Add";
import {Fab} from "@mui/material";
interface TricountData {
    id: number;
    title: string;
    description?: string;
}

export default function Home() {
    const [tricounts, setTricounts] = useState<TricountData[]>([]);

    useEffect(() => {
        const fetchTriountOverviewData = async () => {
            try {
                const response = await fetch('/api/Tricount');
                if (!response.ok) {
                    throw new Error('Failed to fetch tricounts');
                }
                
                const tricountData: TricountData[] = await response.json();
                setTricounts(tricountData);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchTriountOverviewData();
    }, []);

    function addTricount() {
        console.log("You should implement this...");
    }

    return (
        <>
            {tricounts.map((tricount) => (
                <div key={tricount.id}>
                    <TricountOverview id={tricount.id.toString()} title={tricount.title} description={tricount.description ? tricount.description : ''} />
                </div>
            ))}
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Fab color="primary" aria-label="add" onClick={addTricount}>
                    <AddIcon />
                </Fab>
            </div>
        </>
    );
}