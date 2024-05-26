import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className="borber-r border-slate-500 p-4 flex flex-col responsiveHone responsiveMobileSidebar">
        <SearchInput/>
        <div className="divider px-3"/>
        <Conversations/>
        <LogoutButton/>
    </div>
  );
};

export default Sidebar;


//STARTER CODE FOR THIS FILE
// import React from "react";
// import SearchInput from "./SearchInput";
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";

// const Sidebar = () => {
//   return (
//     <div className="borber-r border-slate-500 p-4 flex flex-col">
//         <SearchInput/>
//         <div className="divider px-3"></div>
//         <Conversations/>
//         <LogoutButton/> 
//     </div>
//   );
// };

// export default Sidebar;