import ExpensesForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { useNavigate } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = ({ params, matches }) => {
  const { id } = params;
  // come back to figure out matches type
  return [
    { title: `Expense: ${id}` },
    { name: "description", content: `Update details of expense ${id}` },
  ];
};

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
