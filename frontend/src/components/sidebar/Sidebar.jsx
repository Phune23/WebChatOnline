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
    <div className={`border-r border-slate-500 p-4 flex flex-col h-full ${collapsed ? 'w-16' : 'w-1/4'} backdrop-blur-lg`}>
      <button onClick={() => setCollapsed(!collapsed)} className="mb-4">
        {collapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
      </button>
      <SearchInput />
      <div className="divider px-3" />
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;