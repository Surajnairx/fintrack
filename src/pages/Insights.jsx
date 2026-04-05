import React, { useRef } from "react";
import { useTransactionsStore } from "../store/appStore";
import { ShoppingCart, DollarSign, PiggyBank } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Insights() {
  const transactions = useTransactionsStore((state) => state.transactions);

  const cardsRef = useRef([]);
  const obsRef = useRef();

  // Minimal GSAP animation
  useGSAP(() => {
    if (cardsRef.current.length) {
      gsap.from(cardsRef.current, {
        y: 10,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    if (obsRef.current) {
      gsap.from(obsRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: "power3.out",
      });
    }
  }, [transactions.length]);

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

  const cardData = [
    {
      icon: <ShoppingCart className="text-red-400" size={20} />,
      title: "Top Spending",
      value: highestCategory,
      color: "text-red-400",
      description: "You spent the most here",
    },
    {
      icon: <DollarSign className="text-green-400" size={20} />,
      title: "Total Income",
      value: `₹${totalIncome}`,
      color: "text-green-400",
    },
    {
      icon: <PiggyBank className="text-blue-400" size={20} />,
      title: "Net Savings",
      value: `₹${savings}`,
      color: savings >= 0 ? "text-green-400" : "text-red-400",
    },
  ];

  return (
    <div className="h-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Insights</h1>
        <p className="text-sm text-gray-400">
          Understand your financial behavior
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-2 hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-center gap-2">
              {card.icon}
              <p className="text-gray-400 text-sm font-medium">{card.title}</p>
            </div>
            <h2 className={`text-xl font-semibold ${card.color}`}>
              {card.value}
            </h2>
            {card.description && (
              <p className="text-xs text-gray-500">{card.description}</p>
            )}
          </div>
        ))}
      </div>

      <div
        ref={obsRef}
        className="bg-white/5 border border-white/10 rounded-xl p-5"
      >
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
