import { useRef, useState } from "react";
import { useTransactionsStore } from "../store/appStore";
import { ShoppingCart, DollarSign, PiggyBank } from "lucide-react";
import { useGSAP } from "@gsap/react";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import gsap from "gsap";

function Insights() {
  const transactions = useTransactionsStore((state) => state.transactions);
  const cardsRef = useRef([]);
  const chartsRef = useRef([]);
  const obsRef = useRef();

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5,
    });

    gsap.from(chartsRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
    });

    gsap.from(obsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.3,
    });
  }, [transactions.length]);

  if (transactions.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
        No transactions yet
      </p>
    );
  }

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const savings = totalIncome - totalExpense;

  const savingsRate =
    totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : 0;

  const categoryTotals = {};
  transactions.forEach((txn) => {
    if (txn.type === "Expense") {
      categoryTotals[txn.category] =
        (categoryTotals[txn.category] || 0) + Math.abs(txn.amount);
    }
  });

  const highestCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
          categoryTotals[a] > categoryTotals[b] ? a : b,
        )
      : "N/A";

  // ---- Pie Data ----
  const categoryData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  const isDark = document.documentElement.classList.contains("dark");

  const COLORS = isDark
    ? ["#60A5FA", "#34D399", "#FBBF24", "#F87171"]
    : ["#2563EB", "#059669", "#D97706", "#DC2626"];

  // ---- Cards ----
  const cardData = [
    {
      icon: <ShoppingCart className="text-red-400" size={20} />,
      title: "Top Spending",
      value: highestCategory,
      color: "text-red-500 dark:text-red-400",
      description: "You spent the most here",
    },
    {
      icon: <DollarSign className="text-green-400" size={20} />,
      title: "Total Income",
      value: `₹${totalIncome}`,
      color: "text-green-500 dark:text-green-400",
    },
    {
      icon: <PiggyBank className="text-blue-400" size={20} />,
      title: "Net Savings",
      value: `₹${savings}`,
      color:
        savings >= 0
          ? "text-green-500 dark:text-green-400"
          : "text-red-500 dark:text-red-400",
      description: `${savingsRate}% of income saved`,
    },
  ];

  return (
    <div className="h-full flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold ">Insights</h1>
        <p className="text-sm ">Understand your financial behavior</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="
              p-5 rounded-2xl 
              border shadow-sm dark:shadow-none
              hover:shadow-lg dark:hover:shadow-xl
              hover:-translate-y-1
              transition-all duration-300
              flex flex-col gap-3
            "
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              {card.icon}
              <p className="text-sm font-medium">{card.title}</p>
            </div>

            <h2 className={`text-2xl font-semibold ${card.color}`}>
              {card.value}
            </h2>

            {card.description && <p className="text-xs ">{card.description}</p>}
          </div>
        ))}
      </div>

      <div
        ref={(el) => (chartsRef.current[0] = el)}
        className="
          p-5 rounded-2xl
          border 
        "
      >
        <h2 className="text-lg mb-4 ">Spending Breakdown</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1e293b" : "#ffffff",
                border: "none",
                borderRadius: "8px",
              }}
            />

            <Legend
              wrapperStyle={{
                marginTop: "0px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div
        ref={obsRef}
        className="
          p-9 rounded-2xl
          border 
        "
      >
        <h2 className="text-lg font-semibold mb-4">Observations</h2>

        <ul className="space-y-3 text-sm">
          <li>
            • Your highest spending category is{" "}
            <span className="text-red-500 dark:text-red-400 font-medium">
              {highestCategory}
            </span>
          </li>

          <li>
            • Your total expenses are{" "}
            <span className="text-red-500 dark:text-red-400 font-medium">
              ₹{totalExpense}
            </span>
          </li>

          <li>
            • You are currently{" "}
            <span
              className={`font-medium ${
                savings >= 0
                  ? "text-green-500 dark:text-green-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              {savings >= 0 ? "saving money 💰" : "overspending ⚠️"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Insights;
