import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { useAuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const { authUser } = useAuthContext();

  // Auto-collapse/expand based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className={`flex flex-col h-full bg-gray-900/50 backdrop-blur-lg transition-all duration-300 
                 border-r border-slate-500/10 shadow-lg
                 ${collapsed ? 'w-16 sm:w-20' : 'w-64 sm:w-72'}`}
    >
      {/* Header with user info - Simplified and cleaner */}
      <div className="flex items-center p-3 border-b border-slate-700/20 shrink-0 bg-gradient-to-r from-violet-900/40 to-violet-800/20">
        <div className={`flex items-center ${collapsed ? 'justify-center w-full' : 'ml-2'} overflow-hidden`}>
          <div className="relative">
            <img 
              src={authUser.profilePic} 
              alt="Profile" 
              className={`rounded-full border-2 border-violet-500/70 object-cover shadow-md ${collapsed ? 'w-10 h-10' : 'w-10 h-10'}`}
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
          </div>
          
          {!collapsed && (
            <div className="ml-3 overflow-hidden">
              <span className="block text-white font-medium truncate text-sm">
                {authUser.fullName}
              </span>
              <span className="block text-green-400 text-xs truncate">
                Online
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Search input - Simplified with proper spacing */}
      <div className={`${collapsed ? 'px-2' : 'px-3'} pt-3 pb-2 shrink-0`}>
        <SearchInput collapsed={collapsed} />
      </div>

      {/* Divider and Chats label */}
      {!collapsed && (
        <div className="px-3 mb-2">
          <div className="flex items-center">
            <div className="h-px bg-gray-700/30 flex-grow"></div>
            <span className="px-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
              Conversations
            </span>
            <div className="h-px bg-gray-700/30 flex-grow"></div>
          </div>
        </div>
      )}
      
      {/* Conversations list - Properly contained with scroll */}
      <div className="overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
        <div className={`${collapsed ? 'px-2' : 'px-3'} py-1`}>
          <Conversations collapsed={collapsed} />
        </div>
      </div>

      {/* Footer with logout - Fixed at bottom */}
      <div className={`${collapsed ? 'p-2' : 'p-3'} mt-auto shrink-0 border-t border-slate-700/20 bg-gray-900/20`}>
        <LogoutButton collapsed={collapsed} />
      </div>
    </div>
  );
};

export default Sidebar;