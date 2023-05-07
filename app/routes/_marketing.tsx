import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import marketingStyles from "~/styles/marketing.css";
import type { LoaderArgs } from "@remix-run/node";
import { getUserFromSession } from "~/data/auth.server";

export function links() {
  return [{ rel: "stylesheet", href: marketingStyles }];
}

export function loader({ request }: LoaderArgs) {
  return getUserFromSession(request);
}

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}
