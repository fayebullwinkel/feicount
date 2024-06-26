import React, { useEffect, useState } from 'react';
import FeicountOverview from './Feicount/FeicountOverview';
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Currency } from '../types/Currency';
import { Category } from '../types/Category';

export interface FeicountData {
    id: number;
    title: string;
    description?: string;
    currency: Currency;
    category: Category;
    userIds?: number[];
    userNames?: string[];
    expenseIds?: number[];
}

export default function Home() {
    const [feicounts, setFeicounts] = useState<FeicountData[]>([]);
    const navigate: NavigateFunction = useNavigate();
    
    useEffect(() => {
        fetchFeicounts();
    }, []);

    const fetchFeicounts = async () => {
        try {
            const feicountRepsonse: Response = await fetch('/api/Feicount');
            if (!feicountRepsonse.ok) {
                throw new Error('Failed to fetch feicounts');
            }
            
            const feicountData: FeicountData[] = await feicountRepsonse.json();
            setFeicounts(feicountData);
        } catch (error) {
            console.error('Error fetching feicounts:', error);
        }
    };
    
    const addFeicount = async () => {
        navigate('/feicount/new');
    }

    return (
        <>
            {feicounts.map((feicount: FeicountData) => (
                <div key={feicount.id}>
                    <FeicountOverview id={feicount.id.toString()} title={feicount.title}
                                      description={feicount.description ? feicount.description : ''}/>
                </div>
            ))}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Fab color="primary" aria-label="add" onClick={addFeicount}>
                    <AddIcon/>
                </Fab>
            </div>
        </>
    );
}