import { useNavigate } from "@remix-run/react";
import ExpensesForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { validateExpenseInput } from "~/data/validation.server";
import { requireUserSession } from "~/data/auth.server";

export async function action({ request }: ActionArgs) {
  const userId = await requireUserSession(request);
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);

  return redirect("/expenses");
}

export default function AddExpenses() {
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
