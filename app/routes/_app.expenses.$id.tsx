import ExpensesForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { useNavigate } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
import type { ActionArgs } from "@remix-run/node";

export async function action({ params, request }: ActionArgs) {
  const expenseId = params.id;
  const method = request.method;

  if (method === "PATCH") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }
    await updateExpense(expenseId, expenseData);
    return redirect("/expenses");
  } else if (method === "DELETE") {
    await deleteExpense(expenseId);
    return { deletedId: expenseId };
  }
  return null;
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
