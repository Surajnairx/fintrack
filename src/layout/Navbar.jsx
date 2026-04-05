import React from "react";
import logo from "/favicon.ico";
import { useTransactionsStore } from "../store/appStore";
function Navbar({ setIsOpen }) {
  const userRole = useTransactionsStore((state) => state.userRole);
  const setUserRole = useTransactionsStore((state) => state.setUserRole);
  return (
    <div
      className="h-14 md:h-16 flex items-center justify-between px-3 md:px-6
                 bg-linear-to-r from-[#0f172a] to-[#1e293b]
                 border-b border-white/10 backdrop-blur-md"
    >
      <div className="flex items-center gap-3 md:gap-6">
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
        <div className="flex items-center gap-2 pr-3 md:pr-6 border-r border-white/10">
          <img
            src={logo}
            className="h-7 w-7 md:h-9 md:w-9 rounded-full"
            alt="logo"
          />

          <h1 className="text-sm md:text-xl font-semibold text-white">
            FinTrack
          </h1>
        </div>

        <h2 className="text-xs hidden md:block md:text-lg text-gray-300">
          Finance Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <div className="relative">
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="appearance-none bg-white/5 text-gray-200
             border border-white/10 rounded-md md:rounded-lg
             px-2 md:px-4 py-1 text-xs md:text-sm
             pr-6 md:pr-8
             focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>

          <span className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] md:text-xs">
            ▼
          </span>
        </div>

        <button className="text-gray-400 hover:text-white text-sm md:text-lg">
          🌙
        </button>
      </div>
    </div>
  );
}

export default Navbar;
