import { Outlet } from "@remix-run/react";

export default function ExpensesPage() {
  return (
    <main>
      <p>Shared Element</p>
      <Outlet />
    </main>
  );
}
