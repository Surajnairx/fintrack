import React, { useState } from "react";
import Card from "../components/Card";
import { useTransactionsStore } from "../store/transactionStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Dashboard() {
  const transactions = useTransactionsStore((state) => state.transactions);
  const [timeline, setTimeline] = useState("Month");

  const totalBalance = transactions.reduce((acc, txn) => acc + txn.amount, 0);
  const totalIncome = transactions
    .filter((txn) => txn.amount > 0)
    .reduce((acc, txn) => acc + txn.amount, 0);
  const totalExpenses = transactions
    .filter((txn) => txn.amount < 0)
    .reduce((acc, txn) => acc + txn.amount, 0);

  const getLineChartData = () => {
    const today = new Date();
    let data = [];

    if (timeline === "Week") {
      for (let i = 6; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        const dateStr = day.toISOString().slice(0, 10);
        const balance = transactions
          .filter((txn) => txn.date === dateStr)
          .reduce((sum, txn) => sum + txn.amount, 0);
        data.push({ label: dateStr.slice(5), balance });
      }
    } else if (timeline === "Month") {
      const monthsSet = new Set(
        transactions.map((txn) => txn.date.slice(0, 7)),
      );
      const months = Array.from(monthsSet).sort();
      months.forEach((month) => {
        const balance = transactions
          .filter((txn) => txn.date.slice(0, 7) === month)
          .reduce((sum, txn) => sum + txn.amount, 0);
        data.push({ label: month, balance });
      });
    } else if (timeline === "Year") {
      const yearsSet = new Set(transactions.map((txn) => txn.date.slice(0, 4)));
      const years = Array.from(yearsSet).sort();
      years.forEach((year) => {
        const balance = transactions
          .filter((txn) => txn.date.slice(0, 4) === year)
          .reduce((sum, txn) => sum + txn.amount, 0);
        data.push({ label: year, balance });
      });
    }

    let cumulative = 0;
    return data.map((d) => {
      cumulative += d.balance;
      return { ...d, balance: cumulative };
    });
  };

  const lineChartData = getLineChartData();

  const today = new Date();
  const filteredTxnsForPie = transactions.filter((txn) => {
    if (txn.amount >= 0) return false;
    const txnDate = new Date(txn.date);
    if (timeline === "Week") {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      return txnDate >= lastWeek;
    } else if (timeline === "Month") {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      return txnDate >= monthStart;
    } else if (timeline === "Year") {
      const yearStart = new Date(today.getFullYear(), 0, 1);
      return txnDate >= yearStart;
    }
    return true;
  });

  const categoryMap = {};
  filteredTxnsForPie.forEach((txn) => {
    categoryMap[txn.category] =
      (categoryMap[txn.category] || 0) + Math.abs(txn.amount);
  });
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28CFE",
    "#FE6C6C",
  ];

  const recentTxns = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <Card title="Total Balance" amount={`₹${totalBalance}`} />
        <Card title="Total Income" amount={`₹${totalIncome}`} positive />
        <Card
          title="Total Expenses"
          amount={`₹${Math.abs(totalExpenses)}`}
          negative
        />
      </div>

      <div className="grid grid-cols-1 justify-center lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 bg-white/5 p-4 sm:p-5 rounded-xl border border-white/10 flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center mb-4 gap-2 sm:gap-0">
            <h2 className="text-lg text-gray-300">Balance Overview</h2>
            <div className="flex gap-2 flex-wrap">
              {["Week", "Month", "Year"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeline(t)}
                  className={`px-3 py-1 rounded text-sm ${
                    timeline === t
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer
            width="100%"
            height={timeline === "Week" ? 200 : 250}
          >
            <LineChart data={lineChartData}>
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="label" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/5 p-4 sm:p-5 rounded-xl border border-white/10">
          <h2 className="text-lg text-gray-300 mb-4">Spending Breakdown</h2>
          <ResponsiveContainer
            width="100%"
            height={timeline === "Week" ? 200 : 250}
          >
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/5 p-4 sm:p-5 rounded-xl border border-white/10 overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-300">Recent Transactions</h2>
        </div>
        <table className="w-full min-w-125 text-sm text-gray-300">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Category</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {recentTxns.map((txn) => (
              <tr key={txn.id} className="border-b border-white/5">
                <td className="py-2">{txn.date}</td>
                <td>{txn.category}</td>
                <td
                  className={txn.amount > 0 ? "text-green-400" : "text-red-400"}
                >
                  {txn.amount > 0 ? "+" : "-"}₹{Math.abs(txn.amount)}
                </td>
                <td>{txn.type}</td>
              </tr>
            ))}
            {recentTxns.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-5 text-gray-500">
                  No transactions yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
