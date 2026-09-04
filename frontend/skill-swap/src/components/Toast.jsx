export default function Toast({ message, type }) {
  const isError = type === "error";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        padding: "0.75rem 1.25rem",
        backgroundColor: isError ? "var(--color-danger-bg)" : "var(--color-success-bg)",
        color: isError ? "var(--color-danger-text)" : "var(--color-success-text)",
        border: `1px solid ${isError ? "var(--color-danger-border)" : "var(--color-success-border)"}`,
        borderRadius: "var(--radius-md)",
        fontSize: "0.875rem",
        fontWeight: 500,
        boxShadow: "var(--shadow-md)",
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <span>{isError ? "✕" : "✓"}</span>
      <span>{message}</span>
    </div>
  );
}

