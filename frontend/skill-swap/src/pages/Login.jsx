import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      nav("/dashboard");
    } catch (err) {
      setError("Invalid email address or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--header-height) - 180px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "2.5rem 2rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.5rem" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--color-brand-primary)" }}>
              SkillSwap
            </span>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--color-accent-emerald)" }} />
          </div>
          <h1 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>
            Sign in to your account
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
            Continue your collaborative skill exchanges
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              required
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "0.65rem",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--color-danger-bg)",
                border: "1px solid var(--color-danger-border)",
                color: "var(--color-danger-text)",
                fontSize: "0.8125rem",
                marginBottom: "1.25rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: "100%", padding: "0.75rem" }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            fontSize: "0.85rem",
            color: "var(--color-text-secondary)",
          }}
        >
          Do not have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "var(--color-accent-emerald)", fontWeight: 600 }}
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

