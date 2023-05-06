import ExpensesForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { useNavigate } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { getExpenseById } from "~/data/expenses.server";
import { json } from "@remix-run/node";

export async function loader({ params }: LoaderArgs) {
  const expenseId = params.id;
  const expense = await getExpenseById(expenseId);
  return json(expense);
}

export default function UpdateExpense() {
  const navigate = useNavigate();
  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpensesForm />
    </Modal>
  );
}
