export default function SkillChip({ label }) {
  return (
    <span
      style={{
        padding: "6px 12px",
        background: "#eef2ff",
        color: "#3730a3",
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  );
}

