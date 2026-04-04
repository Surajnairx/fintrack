import React from "react";
import { useTransactionsStore } from "../store/transactionStore";
import { ShoppingCart, DollarSign, PiggyBank } from "lucide-react";

function Insights() {
  const transactions = useTransactionsStore((state) => state.transactions);

  if (transactions.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-10">No transactions yet</p>
    );
  }

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

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const savings = totalIncome - totalExpense;

  return (
    <div className="h-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Insights</h1>
        <p className="text-sm text-gray-400">
          Understand your financial behavior
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-2 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-red-400" size={20} />
            <p className="text-gray-400 text-sm font-medium">Top Spending</p>
          </div>
          <h2 className="text-xl font-semibold text-red-400">
            {highestCategory}
          </h2>
          <p className="text-xs text-gray-500">You spent the most here</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-2 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center gap-2">
            <DollarSign className="text-green-400" size={20} />
            <p className="text-gray-400 text-sm font-medium">Total Income</p>
          </div>
          <h2 className="text-xl font-semibold text-green-400">
            ₹{totalIncome}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-2 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center gap-2">
            <PiggyBank className="text-blue-400" size={20} />
            <p className="text-gray-400 text-sm font-medium">Net Savings</p>
          </div>
          <h2
            className={`text-xl font-semibold ${savings >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            ₹{savings}
          </h2>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h2 className="text-lg text-gray-300 mb-4">Observations</h2>
        <ul className="space-y-3 text-sm text-gray-400">
          <li>
            • Your highest spending category is{" "}
            <span className="text-white">{highestCategory}</span>
          </li>
          <li>
            • Your total expenses are{" "}
            <span className="text-red-400">₹{totalExpense}</span>
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
