import React, { ReactNode } from 'react';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { Counter } from './components/Counter';
import Home from './components/Home';
import Tricount from './components/Tricount';

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
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/tricount/:id',
    element: <TricountWrapper />
  }
];
export default AppRoutes;
