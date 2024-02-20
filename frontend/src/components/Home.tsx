import React, {useEffect, useState} from 'react';
import TricountOverview from './TricountOverview';
import AddIcon from "@mui/icons-material/Add";
import {Fab} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import { Currency } from '../types/Currency';
import { Category } from '../types/Category';

export interface TricountData {
    id: number;
    title: string;
    description?: string;
    currency: Currency;
    category: Category;
    userIds?: number[];
    userNames?: { firstName: string, lastName: string }[];
    expenseIds?: number[];
}

export default function Home() {
    const [tricounts, setTricounts] = useState<TricountData[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchTricounts();
    }, []);

    const fetchTricounts = async () => {
        try {
            const tricountRepsonse: Response = await fetch('/api/Tricount');
            if (!tricountRepsonse.ok) {
                throw new Error('Failed to fetch tricounts');
            }
            
            const tricountData: TricountData[] = await tricountRepsonse.json();
            setTricounts(tricountData);
        } catch (error) {
            console.error('Error fetching tricounts:', error);
        }
    };
    
    const addTricount = async () => {
        // TODO: redirect to NewTricount
        navigate('/tricount/new');
        // TODO: fetch data from form submit 
        // TODO: use post logic to add tricount
        /*try {
            const postData: TricountData = {
                // TODO: implement user input
                "id": 0,
                "title": "Mein zweiter Tricount",
                "description": "Dies ist ein zweiter Test",
                "currency": 0,
                "category": 0,
                "userIds": [],
                "userNames": [
                    {
                        "firstName": "Jannis",
                        "lastName": "Harling"
                    },
                    {
                        "firstName": "Heidelies",
                        "lastName": "Bullwinkel"
                    }
                ],
                "expenseIds": []

            }
            const postResponse = await fetch('/api/Tricount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData),
            });

            if (!postResponse.ok) {
                throw new Error('Failed to post data');
            }
            fetchTricounts();
        } catch (err: any) {
            console.log(err.message)
        }*/
    }

    return (
        <>
            {tricounts.map((tricount) => (
                <div key={tricount.id}>
                    <TricountOverview id={tricount.id.toString()} title={tricount.title}
                                      description={tricount.description ? tricount.description : ''}/>
                </div>
            ))}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Fab color="primary" aria-label="add" onClick={addTricount}>
                    <AddIcon/>
                </Fab>
            </div>
        </>
    );
}