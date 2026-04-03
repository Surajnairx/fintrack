import React from "react";

const transactions = [
  { date: "2026-04-01", category: "Food", amount: -50, type: "Expense" },
  { date: "2026-03-28", category: "Salary", amount: 2500, type: "Income" },
  { date: "2026-03-25", category: "Shopping", amount: -200, type: "Expense" },
  { date: "2026-03-10", category: "Food", amount: -100, type: "Expense" },
];

function Insights() {
  // 🔥 Highest Spending Category
  const categoryTotals = {};

  transactions.forEach((txn) => {
    if (txn.type === "Expense") {
      categoryTotals[txn.category] =
        (categoryTotals[txn.category] || 0) + Math.abs(txn.amount);
    }
  });

  const highestCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b,
  );

  // 🔥 Total Income vs Expense
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const savings = totalIncome - totalExpense;

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">Insights</h1>
        <p className="text-sm text-gray-400">
          Understand your financial behavior
        </p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Highest Spending */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Top Spending Category</p>
          <h2 className="text-xl font-semibold text-red-400 mt-2">
            {highestCategory}
          </h2>
          <p className="text-xs text-gray-500 mt-1">You spend the most here</p>
        </div>

        {/* Income */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Total Income</p>
          <h2 className="text-xl font-semibold text-green-400 mt-2">
            ${totalIncome}
          </h2>
        </div>

        {/* Savings */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Net Savings</p>
          <h2
            className={`text-xl font-semibold mt-2 ${
              savings >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            ${savings}
          </h2>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h2 className="text-lg text-gray-300 mb-4">Observations</h2>

        <ul className="space-y-3 text-sm text-gray-400">
          <li>
            • Your highest spending category is{" "}
            <span className="text-white">{highestCategory}</span>
          </li>

          <li>
            • Your total expenses are{" "}
            <span className="text-red-400">${totalExpense}</span>
          </li>

          <li>
            • You are currently{" "}
            <span className={savings >= 0 ? "text-green-400" : "text-red-400"}>
              {savings >= 0 ? "saving money 💰" : "overspending ⚠️"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Insights;
