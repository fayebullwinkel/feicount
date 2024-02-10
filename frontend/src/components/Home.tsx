import React, { useEffect, useState } from 'react';
import Tricount from './Tricount';
interface TricountData {
    id: number;
    // Add other properties if needed
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

    return (
        <>
            {tricounts.map((tricount) => (
                <div key={tricount.id}>
                    <Tricount id={tricount.id.toString()} />
                </div>
            ))}
        </>
    );
}