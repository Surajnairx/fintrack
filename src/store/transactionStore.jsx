import { create } from "zustand";

const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (transactions) => {
  try {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  } catch {}
};

export const useTransactionsStore = create((set, get) => ({
  transactions: loadFromLocalStorage(),

  search: "",
  filterType: "All",

  addOrUpdateTransaction: (txn) => {
    let updatedTransactions;
    if (txn.id) {
      updatedTransactions = get().transactions.map((t) =>
        Number(t.id) === Number(txn.id)
          ? {
              ...txn,
              amount:
                txn.type === "Expense"
                  ? -Math.abs(txn.amount)
                  : Math.abs(txn.amount),
            }
          : t,
      );
    } else {
      updatedTransactions = [
        {
          ...txn,
          id: Date.now(),
          amount:
            txn.type === "Expense"
              ? -Math.abs(txn.amount)
              : Math.abs(txn.amount),
        },
        ...get().transactions,
      ];
    }

    set({ transactions: updatedTransactions });
    saveToLocalStorage(updatedTransactions);
  },

  deleteTransaction: (id) => {
    const updatedTransactions = get().transactions.filter(
      (txn) => Number(txn.id) !== Number(id),
    );
    set({ transactions: updatedTransactions });
    saveToLocalStorage(updatedTransactions);
  },

  setSearch: (value) => set({ search: value }),
  setFilterType: (value) => set({ filterType: value }),

  filteredTransactions: () => {
    const { transactions, search, filterType } = get();
    return transactions.filter(
      (txn) =>
        txn.category.toLowerCase().includes(search.toLowerCase()) &&
        (filterType === "All" || txn.type === filterType),
    );
  },
}));
