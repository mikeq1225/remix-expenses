import { FaLock, FaUserPlus } from "react-icons/fa";
import {
  useSearchParams,
  Link,
  Form,
  useNavigation,
  useActionData,
} from "@remix-run/react";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const validationErrors = useActionData();
  const isSubmitting = navigation.state !== "idle";
  const authMode = searchParams.get("mode") || "login";

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === "login" ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        {authMode === "login" ? (
          <>
            <button disabled={isSubmitting}>
              {isSubmitting ? "Authenticating..." : "Login"}
            </button>
            <Link to={"?mode=signup"}>Create a new User</Link>
          </>
        ) : (
          <>
            <button disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create User"}
            </button>
            <Link to={"?mode=login"}>Log in with existing user</Link>
          </>
        )}
      </div>
    </Form>
  );
}

export default AuthForm;
