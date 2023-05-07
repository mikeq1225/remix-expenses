import { prisma } from "./database.server";

export async function addExpense(expenseData, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: Number(expenseData.amount),
        date: new Date(expenseData.date),
        User: { connect: { id: userId } },
      },
    });
  } catch (e) {
    throw new Error("Failed to add expense");
  }
}

export async function getExpenses(userId) {
  if (!userId) {
    throw new Error("Failed to get expenses");
  }
  try {
    return await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
  } catch (error) {
    throw new Error("Failed to get expenses");
  }
}

// no longer used because we are getting the data from parent loader
// if I want, should change this to accept userId
export async function getExpenseById(id) {
  try {
    return await prisma.expense.findUnique({ where: { id } });
  } catch (error) {
    throw new Error("Failed to get expense");
  }
}

export async function updateExpense(id, expenseData) {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: Number(expenseData.amount),
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    throw new Error("Failed to update expense");
  }
}

export async function deleteExpense(id) {
  try {
    return await prisma.expense.delete({ where: { id } });
  } catch (error) {
    throw new Error("Failed to delete expense");
  }
}
