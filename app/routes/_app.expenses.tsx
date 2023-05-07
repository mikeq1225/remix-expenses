import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import { FaDownload, FaPlus } from "react-icons/fa";
import { getExpenses } from "~/data/expenses.server";
import type { LoaderArgs } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request);

  return await getExpenses(userId);
}

export default function ExpensesPage() {
  const expenses = useLoaderData();
  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section id={"expenses-actions"}>
          <Link to={"add"}>
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href={"/expenses/raw"}>
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses ? (
          <ExpensesList expenses={expenses} />
        ) : (
          <section id={"no-expenses"}>
            <h1>No expenses found</h1>
            <p>
              Start <Link to={"add"}>adding some</Link> today
            </p>
          </section>
        )}
      </main>
    </>
  );
}
