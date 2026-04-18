import React, { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { BacktestDashboard } from '../backtest';

const Layout = lazy(() => import('@layout/Layout'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/backtest/dashboard" replace />,
      },
      {
        path: 'backtest/dashboard',
        element: <BacktestDashboard />,
      },
    ],
  },
];
