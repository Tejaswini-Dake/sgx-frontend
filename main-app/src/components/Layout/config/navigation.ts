import { LayoutDashboard, BarChart3 } from 'lucide-react';
import { MenuItem } from '../types/layout.types';
 
export const MENU_ITEMS: MenuItem[] = [
  {
    path: '/',
    icon: LayoutDashboard,
    label: 'SLA Dashboard',
    subtitle: 'Monitor service agreements',
  },
  {
    path: '/analytics',
    icon: BarChart3,
    label: 'Analytics Hub',
    subtitle: 'Index Analytics',
  },
];
 
export const SGX_WHITE_LOGO =
  'data:image/svg+xml;base64,PHN2Ym3aWR0aD0MTAwIDQwIGJoxwxsawxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0K...'; // Truncated for brevity
 
export const SGX_COMPACT_LOGO =
  'data:image/svg+xml;base64,PHN2Ym3aWR0aD0MNDAgNDAgYmoxwxsawxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0K...'; // Truncated for brevity
 
export const LAYOUT_CONFIG = {
  SIDEBAR_WIDTH_EXPANDED: 'w-64',
  SIDEBAR_WIDTH_COLLAPSED: 'w-20',
  APP_NAME: 'Index Automation Studio',
  APP_VERSION: 'v2.1.0',
};
 