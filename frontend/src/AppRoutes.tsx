import React from 'react';
import {ReactElement} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import Home from './components/Home';
import NewFeicount from './components/Feicount/NewFeicount';
import NewExpense from './components/Expense/NewExpense';
import Feicount from './components/Feicount/Feicount';
import TransactionOverview from './components/Transaction/TransactionOverview';

interface AppRoute {
    index?: boolean;
    path?: string;
    element: ReactElement | JSX.Element;
}

const FeicountWrapper = () => {
    const {id} = useParams();
    return <Feicount id={id!}/>;
};

const TransactionWrapper = () => {
    const {id} = useParams();
    const location = useLocation();
    const {users} = location.state || {};

    return <TransactionOverview feicountId={Number(id)} users={users}/>;
};

const UpdateWrapper = () => {
    const {id} = useParams();
    return <NewFeicount id={id!}/>
}

const AppRoutes: AppRoute[] = [
    {
        index: true,
        element: <Home/>
    },
    {
        path: '/feicount/:id',
        element: <FeicountWrapper/>
    },
    {
        path: '/feicount/new',
        element: <NewFeicount/>
    },
    {
        path: '/feicount/:id/expenses/new',
        element: <NewExpense/>
    },
    {
        path: '/feicount/:id/transactions',
        element: <TransactionWrapper/>
    },
    {
        path: '/feicount/:id/udpate',
        element: <UpdateWrapper/>
    }
];
export default AppRoutes;
