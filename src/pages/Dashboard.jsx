import React from "react";
import Card from "../components/Card";
function Dashboard() {
  return (
    <div className="space-y-6 w-full">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Balance" amount="$12,500" />
        <Card title="Total Income" amount="$8,000" positive />
        <Card title="Total Expenses" amount="$3,200" negative />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white/5 p-5 rounded-xl border border-white/10">
          <h2 className="text-lg text-gray-300 mb-4">
            Monthly Balance Overview
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart here 📈
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          <h2 className="text-lg text-gray-300 mb-4">Spending Breakdown</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Pie Chart 🍩
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/5 p-5 rounded-xl border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-300">Recent Transactions</h2>
          <button className="text-sm text-blue-400 hover:underline">
            View All
          </button>
        </div>

        <table className="w-full text-sm text-gray-300">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Category</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Type</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-white/5">
              <td className="py-2">04/01/2026</td>
              <td>Food</td>
              <td className="text-red-400">-$50</td>
              <td>Expense</td>
            </tr>

            <tr>
              <td className="py-2">03/28/2026</td>
              <td>Salary</td>
              <td className="text-green-400">+$2,500</td>
              <td>Income</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
