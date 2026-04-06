import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useTransactionsStore } from "../store/appStore";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTransactionsStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);
  return (
    <div className="flex flex-col h-screen ">
      {console.log(theme)}
      <Navbar setIsOpen={setIsOpen} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
