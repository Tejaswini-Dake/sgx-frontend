import React from 'react';
 
export interface MenuItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  subtitle?: string;
}
 
export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}
 
export interface LayoutProps {
  children?: React.ReactNode;
}
 
export interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}
 