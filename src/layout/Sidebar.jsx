import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-full bg-linear-to-b from-[#0f172a] to-[#020617] border-r border-white/10">
      <div className="flex flex-col gap-2 p-4 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition 
             ${
               isActive
                 ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
                 : "text-gray-300 hover:bg-white/5 hover:text-white"
             }`
          }
        >
          🏠 <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition 
             ${
               isActive
                 ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
                 : "text-gray-300 hover:bg-white/5 hover:text-white"
             }`
          }
        >
          💸 <span>Transactions</span>
        </NavLink>

        <NavLink
          to="/insights"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition 
             ${
               isActive
                 ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
                 : "text-gray-300 hover:bg-white/5 hover:text-white"
             }`
          }
        >
          📊 <span>Insights</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
