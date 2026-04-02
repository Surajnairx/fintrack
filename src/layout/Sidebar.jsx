import React from "react";
import { Link } from "react-router-dom";
import logo from "/favicon.ico";

function Sidebar() {
  return (
    <div className="bg-linear-to-r bg-black to-blue-900 border-r border-gray-500">
      <div className="flex items-center border-b border-gray-500 px-7 py-2 gap-2">
        <img src={logo} className="h-10 rounded-full" alt="" />
        <h1 className="text-3xl font-bold">FinTrack</h1>
      </div>
      <div className=" flex flex-col gap-2 p-5">
        <div className="w-full p-2 bg-gray-600 rounded-full">
          <Link to="/">🛖 Dashboard</Link>
        </div>
        <div className="w-full p-2">
          <Link to="/transactions"> 💸 Transaction</Link>
        </div>
        <div className="w-full p-2">
          <Link to="/insights">📊 Insight</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
