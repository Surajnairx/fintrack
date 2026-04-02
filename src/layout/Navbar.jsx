import React from "react";

function Navbar() {
  return (
    <div className="bg-blue-400 flex justify-between p-2.5">
      <div className="">
        <h1 className="text-3xl font-bold">Finance Dashboard</h1>
      </div>
      <div className="flex gap-10">
        <div className="">
          <select name="" id="">
            <option value="">Admin</option>
            <option value="">View</option>
          </select>
        </div>
        <div>🌙</div>
        <div>⚙️</div>
      </div>
    </div>
  );
}

export default Navbar;
