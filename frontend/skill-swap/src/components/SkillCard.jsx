import SkillChip from "./SkillChip";

export default function SkillCard({ skill, onRequest }) {
  const chips =
    skill.tags?.length > 0
      ? skill.tags
      : skill.category
      ? [skill.category]
      : [];

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "1rem",
        borderRadius: 10,
        border: "1px solid #e5e7eb",
      }}
    >
      <h3>{skill.title}</h3>

      <p style={{ fontSize: 14, color: "#555" }}>
        {skill.description}
      </p>

      {/* ✅ SKILL CHIPS */}
      {chips.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "8px",
          }}
        >
          {chips.map((tag) => (
            <SkillChip key={tag} label={tag} />
          ))}
        </div>
      )}

      {/* Button */}
      {onRequest && (
        <button
          style={{ marginTop: "12px" }}
          onClick={() => onRequest(skill)}
        >
          Request Skill
        </button>
      )}
    </div>
  );
}
