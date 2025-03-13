import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 480 && !collapsed) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, [collapsed]);

  return (
    <div className={`border-r border-slate-500 p-4 flex flex-col h-full ${collapsed ? 'w-24' : 'w-1/4'} backdrop-blur-lg transition-all duration-300`}>
      <button onClick={() => setCollapsed(!collapsed)} className="mb-4 text-white hover:text-violet-400 transition-colors">
        {collapsed ? <RiMenuUnfoldLine size={20} /> : <RiMenuFoldLine size={20} />}
      </button>
      <SearchInput collapsed={collapsed} />
      <div className="divider px-3" />
      <Conversations collapsed={collapsed} />
      <LogoutButton collapsed={collapsed} />
    </div>
  );
};

export default Sidebar;