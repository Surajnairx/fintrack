import React, { useState } from "react";

const mockData = [
  { id: 1, date: "2026-04-01", category: "Food", amount: -50, type: "Expense" },
  {
    id: 2,
    date: "2026-03-28",
    category: "Salary",
    amount: 2500,
    type: "Income",
  },
  {
    id: 3,
    date: "2026-03-25",
    category: "Shopping",
    amount: -200,
    type: "Expense",
  },
  {
    id: 3,
    date: "2026-03-25",
    category: "Shopping",
    amount: -200,
    type: "Expense",
  },
  {
    id: 3,
    date: "2026-03-25",
    category: "Shopping",
    amount: -200,
    type: "Expense",
  },
  {
    id: 3,
    date: "2026-03-25",
    category: "Shopping",
    amount: -200,
    type: "Expense",
  },
  {
    id: 3,
    date: "2026-03-25",
    category: "Shopping",
    amount: -200,
    type: "Expense",
  },
  {
    id: 3,
    date: "2026-03-25",
    category: "Shopping",
    amount: -200,
    type: "Expense",
  },
  {
    id: 3,
    date: "2026-03-25",
    category: "Shopping",
    amount: -200,
    type: "Expense",
  },
  {
    id: 3,
    date: "2026-03-25",
    category: "Shopping",
    amount: -200,
    type: "Expense",
  },
  {
    id: 3,
    date: "2026-03-25",
    category: "Shopping",
    amount: -200,
    type: "Expense",
  },
  {
    id: 3,
    date: "2026-03-25",
    category: "Shopping",
    amount: -200,
    type: "Expense",
  },
  {
    id: 3,
    date: "2026-03-25",
    category: "Shopping",
    amount: -200,
    type: "Expense",
  },
];

function Transactions({ role = "Admin" }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredData = mockData.filter((txn) => {
    return (
      txn.category.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "All" || txn.type === filterType)
    );
  });

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Transactions</h1>
          <p className="text-sm text-gray-400">
            Manage and track your financial activity
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search category..."
            className="bg-white/5 border border-white/10 
                       rounded-lg px-4 py-2 text-sm text-gray-200
                       placeholder-gray-500
                       focus:outline-none focus:ring-1 focus:ring-blue-500
                       transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Filter */}
          <select
            className="bg-white/5 border border-white/10 
                       rounded-lg px-4 py-2 text-sm text-gray-200
                       focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option>All</option>
            <option>Income</option>
            <option>Expense</option>
          </select>

          {/* Admin Button */}
          {role === "Admin" && (
            <button
              className="bg-blue-600 hover:bg-blue-700 
                               px-4 py-2 rounded-lg text-sm 
                               font-medium transition"
            >
              + Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div
        className="flex-1 min-h-0 
                      bg-white/5 border border-white/10 
                      rounded-xl p-4 flex flex-col"
      >
        <div className="overflow-y-auto">
          <table className="w-full text-sm text-gray-300">
            {/* Head */}
            <thead className="sticky top-0 bg-[#020617] text-gray-400 border-b border-white/10">
              <tr>
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3 px-2">Category</th>
                <th className="text-left py-3 px-2">Amount</th>
                <th className="text-left py-3 px-2">Type</th>
                {role === "Admin" && (
                  <th className="text-left py-3 px-2">Actions</th>
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filteredData.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-b border-white/5 
                             hover:bg-white/5 transition"
                >
                  <td className="py-3 px-2">{txn.date}</td>

                  <td className="px-2">
                    <span className="px-2 py-1 rounded-md bg-white/10 text-xs">
                      {txn.category}
                    </span>
                  </td>

                  <td
                    className={`px-2 font-medium ${
                      txn.amount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {txn.amount > 0 ? "+" : ""}${txn.amount}
                  </td>

                  <td className="px-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        txn.type === "Income"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {txn.type}
                    </span>
                  </td>

                  {role === "Admin" && (
                    <td className="px-2">
                      <div className="flex gap-3">
                        <button className="text-blue-400 hover:text-blue-300 text-xs">
                          Edit
                        </button>
                        <button className="text-red-400 hover:text-red-300 text-xs">
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}

              {/* Empty State */}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
