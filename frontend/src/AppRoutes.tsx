import React from 'react';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import Home from './components/Home';
import NewFeicount from './components/Feicount/NewFeicount';
import NewExpense from './components/Expense/NewExpense';
import Feicount from './components/Feicount/Feicount';
import Overview from './components/Transaction/TransactionOverview';

interface AppRoute {
  index?: boolean;
  path?: string;
  element: ReactElement | JSX.Element;
}

const FeicountWrapper = () => {
  const { id } = useParams();
  return <Feicount id={id!} />;
};

const AppRoutes: AppRoute[] = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/feicount/:id',
    element: <FeicountWrapper />
  },
  {
    path: '/feicount/new',
    element: <NewFeicount />
  },
  {
    path: '/feicount/:id/expenses/new',
    element: <NewExpense />
  }
];
export default AppRoutes;
