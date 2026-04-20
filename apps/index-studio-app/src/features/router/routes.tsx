import React, { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const UniverseSelectionPage = lazy(() => import('@/features/parameters-configuration/pages/UniverseSelectionPage'));
const FilteringPage = lazy(() => import('@/features/parameters-configuration/pages/FilteringPage'));
const CreateFilterSetPage = lazy(() => import('@/features/parameters-configuration/pages/CreateFilterSetPage'));
const GenerateUniversePage = lazy(() => import('@/features/parameters-configuration/pages/GenerateUniversePage'));
const CreateUniverseConfigurationPage = lazy(
  () => import('@/features/parameters-configuration/pages/CreateUniverseConfigurationPage')
);
const UniverseHistoryPage = lazy(() => import('@/features/parameters-configuration/pages/UniverseHistoryPage'));
const FilterSetDetailPage = lazy(() => import('@/features/parameters-configuration/pages/FilterSetDetailPage'));
const PackagesUiPage = lazy(() => import('@/components/PackagesUiPage/PackagesUiPage'));
const Layout = lazy(() => import('@layout/Layout'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/parameters/universe" replace />,
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
