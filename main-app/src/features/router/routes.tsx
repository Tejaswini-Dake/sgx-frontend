import React, { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const BacktestDashboard = lazy(() => import('@/features/backtest/pages/BacktestDashboard'));
const UniverseSelectionPage = lazy(() => import('@/features/backtest/pages/UniverseSelectionPage'));
const FilteringPage = lazy(() => import('@/features/backtest/pages/FilteringPage'));
const CreateFilterSetPage = lazy(() => import('@/features/backtest/pages/CreateFilterSetPage'));
const GenerateUniversePage = lazy(() => import('@/features/backtest/pages/GenerateUniversePage'));
const CreateUniverseConfigurationPage = lazy(
  () => import('@/features/backtest/pages/CreateUniverseConfigurationPage')
);
const UniverseHistoryPage = lazy(() => import('@/features/backtest/pages/UniverseHistoryPage'));
const FilterSetDetailPage = lazy(() => import('@/features/backtest/pages/FilterSetDetailPage'));
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
        path: 'parameters/universe',
        element: <UniverseSelectionPage />,
      },
      {
        path: 'parameters/universe/:id/history',
        element: <UniverseHistoryPage />,
      },
      {
        path: 'parameters/filtering',
        element: <FilteringPage />,
      },
      {
        path: 'parameters/filtering/create',
        element: <CreateFilterSetPage />,
      },
      {
        path: 'parameters/filtering/:id/view',
        element: <FilterSetDetailPage />,
      },
      {
        path: 'parameters/configure-universe',
        element: <GenerateUniversePage />,
      },
      {
        path: 'parameters/configure-universe/create',
        element: <CreateUniverseConfigurationPage />,
      },
      {
        path: 'ui-components',
        element: <PackagesUiPage />,
      },
    ],
  },
];
