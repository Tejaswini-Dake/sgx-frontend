import React from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutProps } from './types/layout.types';
import { useLayout } from './hooks/useLayout';
import Sidebar from './Sidebar/Sidebar';
import { Header } from './Header/Header';

/**
 * Main Layout Component
 * Provides the application shell with sidebar, header, and content area
 */
export default function Layout({ children }: LayoutProps) {
  const { isCollapsed, setIsCollapsed, searchTerm, setSearchTerm, isActive } = useLayout();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <main className="flex-1 overflow-auto p-4 lg:p-6">{children ? children : <Outlet />}</main>
      </div>
    </div>
  );
}
