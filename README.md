# FinTrack — Personal Finance Dashboard

A responsive, interactive personal finance dashboard built with **React**, **Vite**, **Zustand**, **GSAP**, **Recharts**, and **Tailwind CSS** — enabling users to **track income & expenses**, **visualize financial data**, and **gain insights** into their spending habits.

---

## 🧠 Features

- Add, edit & delete transactions  
- Search & filter by category & type  
- Dashboard with:
  - Total balance
  - Total income & expenses
  - Line and pie charts
  - Recent transactions
- Dynamic insights based on transaction data  
- Responsive UI with subtle **GSAP animations**  
- Uses **Zustand** for state management

---

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| React | UI Library |
| Vite | Build tool & dev server |
| Zustand | Global state management |
| GSAP | Animations |
| Recharts | Data visualization (charts) |
| Tailwind CSS | Styling |
| Lucide React | Icons |

---

## 🚀 Getting Started
```bash
1. git clone https://github.com/Surajnairx/fintrack.git
2. cd fintrack
3. Install dependencies
4. npm install
5. Start the development server -> npm run dev
```
## 🗂 Project Structure


💡 Highlights
### 🧠 State Management with Zustand
App uses a centralized Zustand store to manage:
Transaction data
Search & filter state
Persisted local storage support 
This provides lightweight, performant global state without boilerplate, and avoids prop drilling.

### 📊 Stylish Charts with Recharts
Line Chart for balance over time (week/month/year)
Pie Chart for category-wise expense breakdown

Recharts components are responsive and data-driven.

### ✨ Animations with GSAP

You implemented GSAP animations using the useGSAP hook from @gsap/react.
These animations improve the user experience while maintaining accessibility.

### 📈 What’s Possible Next
Export transactions as CSV
Monthly budget & goal tracking
Notifications for overspending
Authentication + backend persistence
Dark/light theme toggle
