import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 z-50
          bg-linear-to-b from-[#0f172a] to-[#020617]
          border-r border-white/10
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          shadow-xl md:shadow-none
        `}
      >
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-300 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-2 p-4 text-sm">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
    </>
  );
}

export default Sidebar;
