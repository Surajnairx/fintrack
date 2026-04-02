import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-screen bg-red-400 w-1/8">
      <div>
        <Link to="/">Dashboard</Link>
      </div>
      <div>
        <Link to="/transactions">Transaction</Link>
      </div>
      <div>
        <Link to="/insights">Insight</Link>
      </div>
    </div>
  );
}

export default Sidebar;
