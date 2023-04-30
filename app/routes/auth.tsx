import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}

export default function AuthPage() {
  return <AuthForm />;
}
