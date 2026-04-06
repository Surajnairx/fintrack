import React from "react";
import { NavLink } from "react-router-dom";
import { useTransactionsStore } from "../store/appStore";
import { House, Wallet, ChartBarBig } from "lucide-react";
function Sidebar({ isOpen, setIsOpen }) {
  const theme = useTransactionsStore((state) => state.theme);
  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 md:hidden ${
            theme === "dark" ? "bg-black/50" : "bg-white"
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 z-50
           ${theme === "dark" ? "bg-black" : "bg-white"}
          border-r 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          shadow-xl md:shadow-none
        `}
      >
        <div className="md:hidden flex justify-end p-4 ">
          <button onClick={() => setIsOpen(false)} className="text-xl">
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
                   : " hover:bg-gray-300/20  hover:text-gray-400 "
               }`
            }
          >
            <House size={24} /> <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/transactions"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
               ${
                 isActive
                   ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
                   : " hover:bg-gray-300/20  hover:text-gray-400 "
               }`
            }
          >
            <Wallet />
            <span>Transactions</span>
          </NavLink>

          <NavLink
            to="/insights"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
               ${
                 isActive
                   ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
                   : "  hover:bg-gray-300/20  hover:text-gray-400 "
               }`
            }
          >
            <ChartBarBig />
            <span>Insights</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
