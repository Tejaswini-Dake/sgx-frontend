import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
 
import { SidebarProps } from "../types/layout.types";
import {
  MENU_ITEMS,
  SGX_WHITE_LOGO,
  SGX_COMPACT_LOGO,
  LAYOUT_CONFIG,
} from "../config/navigation";
import { getSidebarWidthClass } from "../utils/layout.helpers";
import { SimpleTooltip } from "../utils/SimpleTooltip";
 
export const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  isActive,
}: SidebarProps & { isActive: (path: string) => boolean }) => {
  return (
    <aside
      className={`bg-sgx-blue flex flex-col transition-all duration-300 ${getSidebarWidthClass(
        isCollapsed
      )}`}
    >
      {/* Logo Section */}
      <div className="relative flex items-center h-20 px-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3">
          {isCollapsed ? (
            <img
              src={SGX_COMPACT_LOGO}
              alt="SGX"
              className="h-8 w-auto"
            />
          ) : (
            <img
              src={SGX_WHITE_LOGO}
              alt="SGX Group"
              className="h-8 w-auto"
            />
          )}
        </Link>
 
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow cursor-pointer"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>
 
      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
 
          const linkContent = (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? "bg-white/20 text-white"
                  : "text-blue-200 hover:bg-white/10"
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <Icon className="w-5 h-5 shrink-0" />
 
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.label}</div>
                  {item.subtitle && (
                    <div className="text-xs text-blue-200/70">
                      {item.subtitle}
                    </div>
                  )}
                </div>
              )}
            </Link>
          );
 
          return isCollapsed ? (
            <SimpleTooltip
              key={item.path}
              content={item.label}
              placement="right"
            >
              {linkContent}
            </SimpleTooltip>
          ) : (
            linkContent
          );
        })}
      </nav>
 
      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/10 text-xs text-white/60">
          <div className="font-medium text-white">
            {LAYOUT_CONFIG.APP_NAME}
          </div>
          <div>{LAYOUT_CONFIG.APP_VERSION}</div>
        </div>
      )}
    </aside>
  );
};