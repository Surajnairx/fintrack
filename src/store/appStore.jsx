import { create } from "zustand";

const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem("transactions");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            category: "Salary",
            amount: 50000,
            type: "Income",
            date: "2026-04-01",
          },
          {
            id: 2,
            category: "Freelance",
            amount: 12000,
            type: "Income",
            date: "2026-04-02",
          },
          {
            id: 3,
            category: "Groceries",
            amount: -2500,
            type: "Expense",
            date: "2026-04-02",
          },
          {
            id: 4,
            category: "Rent",
            amount: -15000,
            type: "Expense",
            date: "2026-04-03",
          },
          {
            id: 5,
            category: "Electricity Bill",
            amount: -1800,
            type: "Expense",
            date: "2026-04-03",
          },
          {
            id: 6,
            category: "Dining Out",
            amount: -1200,
            type: "Expense",
            date: "2026-04-04",
          },
          {
            id: 7,
            category: "Transport",
            amount: -600,
            type: "Expense",
            date: "2026-04-04",
          },
          {
            id: 8,
            category: "Movie",
            amount: -500,
            type: "Expense",
            date: "2026-04-04",
          },
          {
            id: 9,
            category: "Investment Return",
            amount: 3000,
            type: "Income",
            date: "2026-04-05",
          },
          {
            id: 10,
            category: "Shopping",
            amount: -3500,
            type: "Expense",
            date: "2026-04-05",
          },
        ];
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
  theme: localStorage.getItem("theme") || "dark",
  search: "",
  filterType: "All",

  userRole: "admin", // "admin" | "viewer"
  setUserRole: (role) => set({ userRole: role }),

  addOrUpdateTransaction: (txn) => {
    if (get().userRole !== "admin") return; // 🔒 block viewers

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
          id: crypto.randomUUID(), // ✅ better id
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
    if (get().userRole !== "admin") return;

    const updatedTransactions = get().transactions.filter(
      (txn) => String(txn.id) !== String(id),
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
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),
}));
