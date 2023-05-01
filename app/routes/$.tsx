import type { LoaderArgs } from "@remix-run/node";
import { redirect, Response } from "@remix-run/node";

export function loader({ params }: LoaderArgs) {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }
  throw new Response("Not Found", { status: 404 });
}
