import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
function Layout() {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="p-6 overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
