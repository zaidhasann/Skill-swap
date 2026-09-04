export default function SkillChip({ label, active = false }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.25rem 0.65rem",
        backgroundColor: active ? "var(--color-brand-primary)" : "var(--color-accent-soft)",
        color: active ? "#FFFFFF" : "var(--color-brand-primary)",
        border: active ? "1px solid var(--color-brand-primary)" : "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-md)",
        fontSize: "0.78rem",
        fontWeight: 500,
        letterSpacing: "0.01em",
        lineHeight: 1.3,
        userSelect: "none",
      }}
    >
      {label}
    </span>
  );
}



