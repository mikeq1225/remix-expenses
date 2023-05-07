import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";
import type { ActionArgs } from "@remix-run/node";
import { validateCredentials } from "~/data/validation.server";
import { login, signup } from "~/data/auth.server";

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}

export async function action({ request }: ActionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  // validate user input
  try {
    validateCredentials({ email, password });
  } catch (error) {
    return error;
  }

  try {
    if (authMode === "login") {
      return await login({ email, password });
    } else {
      console.log("sign up");
      return await signup({ email, password });
    }
  } catch (error) {
    // @ts-ignore
    if (error.status === 422) {
      // @ts-ignore
      return { credentials: error.message };
    }
  }
}

export default function AuthPage() {
  return <AuthForm />;
}
