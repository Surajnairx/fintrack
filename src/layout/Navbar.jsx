import React from "react";
import logo from "/favicon.ico";

function Navbar() {
  return (
    <div
      className="h-16 flex items-center justify-between pl-6
                    bg-linear-to-r from-[#0f172a] to-[#1e293b]
                    border-b border-white/10 backdrop-blur-md"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 border-r border-white/10 w-58">
          <img src={logo} className="h-9 w-9 rounded-full" alt="logo" />
          <h1 className="text-xl font-semibold tracking-wide text-white">
            FinTrack
          </h1>
        </div>

        <h2 className="text-lg font-medium text-gray-300">Finance Dashboard</h2>
      </div>

      <div className="flex items-center gap-6 py-3 px-8">
        <div className="relative">
          <select
            className="appearance-none bg-black text-white
                       border border-white/10 rounded-lg 
                       px-4 py-1.5 pr-8 text-sm
                       focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option>Admin</option>
            <option>Viewer</option>
          </select>

          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            ▼
          </span>
        </div>

        <button className="text-gray-300 hover:text-white transition">
          🌙
        </button>

        <button className="text-gray-300 hover:text-white transition">
          ⚙️
        </button>
      </div>
    </div>
  );
}

export default Navbar;
