import React, {useEffect, useState} from "react";
import {TextField, Button, MenuItem, Box, List, ListItem, ListItemText} from "@mui/material";
import {Currency, mapToCurrency} from "../../types/Currency";
import {Category, mapToCategory} from "../../types/Category";
import {FeicountData} from "../Home";
import {useNavigate} from "react-router-dom";
import {User} from "./Feicount";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import CurrencySelector from "../Shared/CurrencySelector";
import CategorySelector from "./CategorySelector";
import FeicountUserInput from "./FeicountUserInput";
import FormActions from "../FormActions";

export default function NewFeicount({id}: { id?: string }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState(Currency[Currency.EUR]);
    const [category, setCategory] = useState(Category[Category.Reise]);
    const [titleError, setTitleError] = useState(false);
    const [userNames, setUserNames] = useState<string[]>([]);
    const [feicount, setFeicount] = useState<FeicountData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeicount = async () => {
            const feicountResponse = await fetch(`/api/Feicount/${id}`);

            if (!feicountResponse.ok) {
                throw new Error(`Failed to fetch feicount with id ${id}`);
            }

            const feicountData = await feicountResponse.json();
            setFeicount(feicountData);
        };

        if (id) {
            fetchFeicount();
        }
    }, [id]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersResponse = await fetch(`/api/Feicount/${id}/Users`);

            if (!usersResponse.ok) {
                throw new Error(`Failed to fetch feicount with id ${id}`);
            }

            const usersData = await usersResponse.json();
            setUserNames(usersData.map((userData: User) => userData.userName));
        };

        if (id) {
            fetchUsers();
        }
    }, [id]);

    useEffect(() => {
        if (feicount) {
            setTitle(feicount.title || "");
            setDescription(feicount.description || "");
            setCurrency(Currency[feicount.currency] || Currency[Currency.EUR]);
            setCategory(Category[feicount.category] || Category[Category.Reise]);
            console.log(feicount.userNames);
        }
    }, [feicount]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setTitleError(false);

        if (title == '') {
            setTitleError(true);
        }

        const postData: FeicountData = {
            id: 0,
            title,
            description,
            currency: mapToCurrency(currency),
            category: mapToCategory(category),
            userIds: [],
            userNames,
            expenseIds: []
        };

        try {
            const postResponse = await fetch('/api/Feicount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData),
            });

            if (!postResponse.ok) {
                throw new Error('Failed to post data');
            }

            navigate('/');
        } catch (err: any) {
            console.log(err.message)
        }
    }

    return (
        <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div style={{display: 'flex', justifyContent: 'center', margin: '10px'}}>
                    <h2>{id ? `${feicount?.title || 'Feicount'}` : 'Neuer Feicount'}</h2>
                </div>
                <TitleInput title={title} setTitle={setTitle} titleError={titleError}/>
                <DescriptionInput description={description} setDescription={setDescription}/>
                <CurrencySelector currency={currency} setCurrency={setCurrency}/>
                <CategorySelector category={category} setCategory={setCategory}/>
                <FeicountUserInput userNames={userNames} setUserNames={setUserNames}/>
                <FormActions prevPage={'/'} navigate={navigate}/>
            </form>
        </React.Fragment>
    );
}
