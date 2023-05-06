import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";
import type { ActionArgs } from "@remix-run/node";

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}

export async function action({ request }: ActionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  // validate user input

  if (authMode === "login") {
    // login logic
  } else {
    // signup logic
  }
}

export default function AuthPage() {
  return <AuthForm />;
}
