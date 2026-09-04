export default function Avatar({ name, size = 44 }) {
  const initials = name
    ?.split(" ")
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "var(--color-accent-soft)",
        color: "var(--color-brand-primary)",
        border: "1px solid var(--color-accent-border)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: Math.max(12, Math.round(size / 2.6)),
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

