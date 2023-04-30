import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";
import ExpensesList from "~/components/expenses/ExpensesList";
export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}

const DummyExpenses = [
  {
    id: "e1",
    title: "First Expense",
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: "e1",
    title: "Second Expense",
    amount: 16.99,
    date: new Date().toISOString(),
  },
];

export default function ExpensesPage() {
  return (
    <>
      <Outlet />
      <main>
        <ExpensesList expenses={DummyExpenses} />
      </main>
    </>
  );
}
