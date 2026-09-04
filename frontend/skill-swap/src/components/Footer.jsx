import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-surface)",
        borderTop: "1px solid var(--color-border-subtle)",
        padding: "3.5rem 1.5rem 2.5rem",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.15rem",
              fontWeight: 800,
              color: "var(--color-brand-primary)",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            SkillSwap
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--color-accent-emerald)",
                display: "inline-block",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-text-secondary)",
              margin: 0,
            }}
          >
            Peer-to-peer barter knowledge exchange.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem", flexWrap: "wrap" }}>
          <Link
            to="/browse"
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.15s ease",
            }}
          >
            Browse Skills
          </Link>
          <Link
            to="/signup"
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.15s ease",
            }}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.15s ease",
            }}
          >
            Sign In
          </Link>
        </div>

        <div style={{ width: "100%", borderTop: "1px solid var(--color-border-subtle)", paddingTop: "1.5rem", marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <small style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} SkillSwap. All rights reserved.
          </small>
          <small style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
            Built for reciprocal collaborative learning
          </small>
        </div>
      </div>
    </footer>
  );
}
