import { prisma } from "./database.server";

export async function addExpense(expenseDate) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseDate.title,
        amount: Number(expenseDate.amount),
        date: new Date(expenseDate.date),
      },
    });
  } catch (e) {
    console.log({ e });
    throw e;
  }
}

export async function getExpenses() {
  try {
    return await prisma.expense.findMany({ orderBy: { date: "desc" } });
  } catch (error) {
    throw error;
  }
}

export async function getExpenseById(id) {
  try {
    return await prisma.expense.findUnique({ where: { id } });
  } catch (error) {
    throw error;
  }
}
