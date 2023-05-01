export function loader() {
  return [
    {
      id: "e1",
      title: "First Expense",
      amount: 12.99,
      date: new Date().toISOString(),
    },
    {
      id: "e2",
      title: "Second Expense",
      amount: 16.99,
      date: new Date().toISOString(),
    },
  ];
}
