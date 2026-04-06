import React, { useRef } from "react";
import Modal from "../components/Modal";
import { useTransactionsStore } from "../store/appStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Transactions() {
  const transactions = useTransactionsStore((state) => state.transactions);
  const search = useTransactionsStore((state) => state.search);
  const filterType = useTransactionsStore((state) => state.filterType);
  const addOrUpdateTransaction = useTransactionsStore(
    (state) => state.addOrUpdateTransaction,
  );
  const deleteTransaction = useTransactionsStore(
    (state) => state.deleteTransaction,
  );
  const setSearch = useTransactionsStore((state) => state.setSearch);
  const setFilterType = useTransactionsStore((state) => state.setFilterType);
  const userRole = useTransactionsStore((state) => state.userRole);
  const modalRef = useRef();
  const headerRef = useRef();
  const controlsRef = useRef();
  const tableRef = useRef();

  const filteredData = transactions.filter(
    (txn) =>
      txn.category.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "All" || txn.type === filterType),
  );

  // Minimal animation
  useGSAP(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, { y: -10, opacity: 0, duration: 0.5 });
    }

    if (controlsRef.current) {
      gsap.from(controlsRef.current.childrens, {
        y: 5,
        stagger: 0.05,
        duration: 0.3,
      });
    }

    if (tableRef.current) {
      gsap.from(tableRef.current.children, {
        y: 5,
        opacity: 0,
        stagger: 0.5,
        duration: 0.3,
      });
    }
  }, []);

  return (
    <div className="h-full flex flex-col gap-6">
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <p className="text-sm">Manage and track your financial activity</p>
        </div>

        <div ref={controlsRef} className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" border rounded-lg px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className=" border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option>All</option>
            <option>Income</option>
            <option>Expense</option>
          </select>

          {userRole === "admin" && (
            <button
              onClick={() => modalRef.current.open()}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              + Add Transaction
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 border  rounded-xl p-4 flex flex-col overflow-x-auto">
        <table ref={tableRef} className="w-full text-sm ">
          <thead className="border-b p-5">
            <tr>
              <th className="text-left py-3 px-2">Date</th>
              <th className="text-left py-3 px-2">Category</th>
              <th className="text-left py-3 px-2">Amount</th>
              <th className="text-left py-3 px-2">Type</th>
              {userRole === "admin" ? (
                <th className="text-left py-3 px-2">Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((txn) => (
              <tr key={txn.id} className="border-b hover:bg-white/5 transition">
                <td className="py-3 px-2">{txn.date}</td>
                <td className="px-2">
                  <span className="px-2 py-1 rounded-md bg-white/10 text-xs">
                    {txn.category}
                  </span>
                </td>
                <td
                  className={`px-2 font-medium shrink-0 ${txn.amount > 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {txn.amount > 0 ? "+" : ""}₹{txn.amount}
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

                <td className="px-2">
                  {userRole === "admin" ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => modalRef.current.open(txn)}
                        className="text-blue-400 hover:text-blue-300 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTransaction(txn.id)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}

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

      <Modal ref={modalRef} onSubmit={addOrUpdateTransaction} />
    </div>
  );
}

export default Transactions;
