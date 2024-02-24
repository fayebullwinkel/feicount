import React, { ReactNode } from 'react';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import Home from './components/Home';
import NewTricount from './components/Tricount/New';
import NewExpense from './components/Expense/New';
import Tricount from './components/Tricount/Home';

interface AppRoute {
  index?: boolean;
  path?: string;
  element: ReactElement | JSX.Element;
}

const TricountWrapper = () => {
  const { id } = useParams();
  return <Tricount id={id!} />;
};

const AppRoutes: AppRoute[] = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/tricount/:id',
    element: <TricountWrapper />
  },
  {
    path: '/tricount/new',
    element: <NewTricount />
  },
  {
    path: '/tricount/:id/expenses/new',
    element: <NewExpense />
  }
];
export default AppRoutes;
