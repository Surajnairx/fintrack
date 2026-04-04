// Modal.js
import React, { useState, forwardRef, useImperativeHandle } from "react";

const Modal = forwardRef(({ onSubmit }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [transaction, setTransaction] = useState({
    id: null,
    date: "",
    category: "",
    amount: "",
    type: "Expense",
  });

  useImperativeHandle(ref, () => ({
    open: (txn = null) => {
      if (txn) {
        // Edit mode
        setTransaction({
          ...txn,
          amount: Math.abs(txn.amount), // +
        });
      } else {
        // Add mode
        setTransaction({
          id: null,
          date: "",
          category: "",
          amount: "",
          type: "Expense",
        });
      }
      setIsOpen(true);
    },
    close: () => setIsOpen(false),
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(transaction);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0a0e23] p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4">
          {transaction.id ? "Edit Transaction" : "Add Transaction"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="date"
            value={transaction.date}
            onChange={(e) =>
              setTransaction({ ...transaction, date: e.target.value })
            }
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-200 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={transaction.category}
            onChange={(e) =>
              setTransaction({ ...transaction, category: e.target.value })
            }
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-200 focus:outline-none"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={transaction.amount}
            onChange={(e) =>
              setTransaction({
                ...transaction,
                amount: e.target.value === "" ? "" : Number(e.target.value),
              })
            }
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-200 focus:outline-none"
            required
          />
          <select
            value={transaction.type}
            onChange={(e) =>
              setTransaction({ ...transaction, type: e.target.value })
            }
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-200 focus:outline-none"
            required
          >
            <option>Income</option>
            <option>Expense</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg border border-white/10 text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {transaction.id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Modal;
