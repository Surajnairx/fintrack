import logo from "/favicon.ico";
import { useTransactionsStore } from "../store/appStore";
import { Sun, Moon } from "lucide-react";
function Navbar({ setIsOpen }) {
  const userRole = useTransactionsStore((state) => state.userRole);
  const setUserRole = useTransactionsStore((state) => state.setUserRole);
  const theme = useTransactionsStore((state) => state.theme);
  const toggleTheme = useTransactionsStore((state) => state.toggleTheme);
  return (
    <div
      className="h-14 md:h-16 flex items-center justify-between px-3 md:px-6
  border-b
   transition-colors duration-300"
    >
      <div className="flex items-center gap-3 md:gap-6">
        <button
          className="md:hidden text-dark text-xl"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
        <div className="flex items-center gap-2 pr-3 md:pr-6 border-r ">
          <img
            src={logo}
            className="h-7 w-7 md:h-9 md:w-9 rounded-full"
            alt="logo"
          />

          <h1 className="text-sm md:text-xl font-semibold">FinTrack</h1>
        </div>

        <h2 className="text-xs hidden md:block md:text-lg ">
          Finance Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="relative">
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="appearance-none border
  rounded-md md:rounded-lg
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

        <button
          onClick={toggleTheme}
          className="text-gray-400 hover:text-gray-400/20 text-sm md:text-lg"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
