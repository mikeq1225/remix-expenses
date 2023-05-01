import { FaLock, FaUserPlus } from "react-icons/fa";
import { useSearchParams, Link } from "@remix-run/react";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const authMode = searchParams.get("mode") || "login";

  return (
    <form method="post" className="form" id="auth-form">
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
      <div className="form-actions">
        {authMode === "login" ? (
          <>
            <button>Login</button>
            <Link to={"?mode=signup"}>Create a new User</Link>
          </>
        ) : (
          <>
            <button>Create User</button>
            <Link to={"?mode=login"}>Log in with existing user</Link>
          </>
        )}
      </div>
    </form>
  );
}

export default AuthForm;
