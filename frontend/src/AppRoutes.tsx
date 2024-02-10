import React from 'react';
import { ReactElement } from 'react';
import { Counter } from './components/Counter';
import Home from './components/Home';

interface AppRoute {
  index?: boolean;
  path?: string;
  element: ReactElement;
}

const AppRoutes: AppRoute[] = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  }
];

export default AppRoutes;
