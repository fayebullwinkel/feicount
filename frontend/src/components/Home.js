import React, { useEffect, useState } from 'react';
import Tricount from './Tricount';

export default function Home() {
    const [tricounts, setTricounts] = useState([]);

    useEffect(() => {
        const fetchTriountOverviewData = async () => {
            try {
                const response = await fetch('/api/Tricount');
                if (!response.ok) {
                    throw new Error('Failed to fetch tricounts');
                }
                const tricountData = await response.json();
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
                    <Tricount id={tricount.id} />
                </div>
            ))}
        </>
    );
};
