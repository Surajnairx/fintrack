import React, { useState, useRef, useEffect } from "react";
import Card from "../components/Card";
import { useTransactionsStore } from "../store/appStore";
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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Dashboard() {
  const transactions = useTransactionsStore((state) => state.transactions);
  const [timeline, setTimeline] = useState("Month");

  const totalBalance = transactions.reduce((acc, txn) => acc + txn.amount, 0);
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, txn) => acc + txn.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, txn) => acc + txn.amount, 0);

  const headerRef = useRef();
  const buttonsRef = useRef([]);
  const cardsRef = useRef([]);
  const chartsRef = useRef([]);
  const tableRef = useRef([]);
  const pieSlicesRef = useRef([]);

  useGSAP(() => {
    // Header animation
    gsap.from(headerRef.current, { y: -20, opacity: 0, duration: 1 });

    // Timeline buttons stagger
    gsap.from(buttonsRef.current, {
      y: 10,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
    });

    // Cards stagger
    gsap.from(cardsRef.current, {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });

    // Charts stagger
    gsap.from(chartsRef.current, {
      y: 30,
      opacity: 0,
      stagger: 0.3,
      duration: 0.8,
      ease: "power3.out",
    });

    // Table rows stagger
    gsap.from(tableRef.current, {
      y: 10,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
    });

    // Pie slices animation
    gsap.from(pieSlicesRef.current, {
      scale: 0,
      transformOrigin: "50% 50%",
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.7)",
    });
  }, [timeline]); // re-run animation when timeline changes

  // Prepare charts data
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
      Array.from(monthsSet)
        .sort()
        .forEach((month) => {
          const balance = transactions
            .filter((txn) => txn.date.slice(0, 7) === month)
            .reduce((sum, txn) => sum + txn.amount, 0);
          data.push({ label: month, balance });
        });
    } else if (timeline === "Year") {
      const yearsSet = new Set(transactions.map((txn) => txn.date.slice(0, 4)));
      Array.from(yearsSet)
        .sort()
        .forEach((year) => {
          const balance = transactions
            .filter((txn) => txn.date.slice(0, 4) === year)
            .reduce((sum, txn) => sum + txn.amount, 0);
          data.push({ label: year, balance });
        });
    }

    let cumulative = 0;
    return data.map((d) => ({ ...d, balance: (cumulative += d.balance) }));
  };

  const lineChartData = getLineChartData();
  const today = new Date();
  const filteredTxnsForPie = transactions.filter((txn) => {
    if (txn.amount >= 0) return false;
    const txnDate = new Date(txn.date);
    if (timeline === "Week")
      return (
        txnDate >=
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
      );
    if (timeline === "Month")
      return txnDate >= new Date(today.getFullYear(), today.getMonth(), 1);
    if (timeline === "Year")
      return txnDate >= new Date(today.getFullYear(), 0, 1);
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
      <div
        ref={headerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
      >
        {[totalBalance, totalIncome, totalExpenses].map((amt, idx) => (
          <div key={idx} ref={(el) => (cardsRef.current[idx] = el)}>
            <Card
              title={
                idx === 0
                  ? "Total Balance"
                  : idx === 1
                    ? "Total Income"
                    : "Total Expenses"
              }
              amount={`₹${amt}`}
              positive={idx === 1}
              negative={idx === 2}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 justify-center lg:grid-cols-3 gap-4 lg:gap-6">
        <div
          ref={(el) => (chartsRef.current[0] = el)}
          className="lg:col-span-2 bg-white/5 p-4 sm:p-5 rounded-xl border border-white/10 flex flex-col"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center mb-4 gap-2 sm:gap-0">
            <h2 className="text-lg text-gray-300">Balance Overview</h2>
            <div className="flex gap-2 flex-wrap">
              {["Week", "Month", "Year"].map((t, idx) => (
                <button
                  key={t}
                  ref={(el) => (buttonsRef.current[idx] = el)}
                  onClick={() => setTimeline(t)}
                  className={`px-3 py-1 rounded text-sm ${timeline === t ? "bg-blue-600 text-white" : "bg-white/10 text-gray-200"}`}
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

        <div
          ref={(el) => (chartsRef.current[1] = el)}
          className="bg-white/5 p-4 sm:p-5 rounded-xl border border-white/10"
        >
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
                    ref={(el) => (pieSlicesRef.current[index] = el)}
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
        <h2 className="text-lg text-gray-300 mb-4">Recent Transactions</h2>
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
            {recentTxns.map((txn, idx) => (
              <tr
                key={txn.id}
                ref={(el) => (tableRef.current[idx] = el)}
                className="border-b border-white/5"
              >
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
