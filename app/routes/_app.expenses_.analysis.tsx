import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getExpenses } from "~/data/expenses.server";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import ErrorComponent from "~/components/util/ErrorComponent";
import { requireUserSession } from "~/data/auth.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: `Expenses Analysis` }];
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "Could not load expenses for analysis" },
      {
        status: 404,
        statusText: "Expenses not found",
      }
    );
  }

  return json(expenses);
}

export default function AnalysisPage() {
  const expenses = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <ErrorComponent title={error.statusText}>
          <p>
            {error.data?.message ||
              "Something went wrong with expense analysis"}
          </p>
          <p>
            Back To <Link to={"/expenses"}>Expenses</Link>
          </p>
        </ErrorComponent>
      </main>
    );
  }
}
