import React, { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const BacktestDashboard = lazy(() => import('@/features/backtest/pages/BacktestDashboard'));
const PackagesUiPage = lazy(() => import('@/components/PackagesUiPage/PackagesUiPage'));
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
      {
        path: 'ui-components',
        element: <PackagesUiPage />,
      },
    ],
  },
];
