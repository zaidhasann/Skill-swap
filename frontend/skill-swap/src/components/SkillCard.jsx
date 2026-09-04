import SkillChip from "./SkillChip";
import Avatar from "./Avatar";

// Category-specific visual ecosystem configurations
function SkillNetworkVisual({ category, skillTitle = "" }) {
  const cat = (category || "").toLowerCase();

  // PROGRAMMING: Connected syntax nodes, abstract brackets, terminal grid, exchange connector
  if (cat.includes("program") || cat.includes("code") || cat.includes("dev") || cat.includes("web") || cat.includes("software")) {
    return (
      <svg className="skill-card-bg-graphic" viewBox="0 0 320 200" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="progShapeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8F3EC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FAF9F5" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Large partial circle extending beyond top-right corner */}
        <circle cx="280" cy="20" r="85" fill="url(#progShapeGrad)" />
        <circle cx="280" cy="20" r="105" stroke="#DDE6DF" strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.7" />

        {/* Abstract code syntax / bracket motif */}
        <path d="M 215 35 L 205 45 L 215 55" stroke="#238B57" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
        <path d="M 230 35 L 240 45 L 230 55" stroke="#238B57" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
        <line x1="225" y1="33" x2="220" y2="57" stroke="#14532D" strokeWidth="1.2" strokeOpacity="0.3" />

        {/* Small terminal grid in top-right whitespace */}
        <circle cx="255" cy="40" r="1.5" fill="#DDE6DF" />
        <circle cx="265" cy="40" r="1.5" fill="#DDE6DF" />
        <circle cx="255" cy="50" r="1.5" fill="#DDE6DF" />
        <circle cx="265" cy="50" r="1.5" fill="#DDE6DF" />

        {/* SkillSwap "Two Skills Connecting" Motif (Right flank whitespace) */}
        <g className="card-exchange-motif" transform="translate(180, 85)">
          {/* Connecting arc */}
          <path d="M 15 25 C 45 5, 65 45, 95 25" stroke="#14532D" strokeWidth="1.2" strokeDasharray="3 4" strokeOpacity="0.45" />
          {/* Skill A node */}
          <circle cx="15" cy="25" r="4" fill="#E8F3EC" stroke="#14532D" strokeWidth="1.5" />
          {/* Skill B node */}
          <circle cx="95" cy="25" r="4" fill="#E8F3EC" stroke="#238B57" strokeWidth="1.5" />
          {/* Small exchange bidirectional arrows in the nexus */}
          <path d="M 52 18 L 55 15 L 58 18" stroke="#238B57" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
          <path d="M 58 32 L 55 35 L 52 32" stroke="#14532D" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
          <circle cx="55" cy="25" r="2" fill="#238B57" fillOpacity="0.6" />
        </g>

        {/* Soft curved organic shape entering from bottom-right */}
        <path d="M 230 200 C 230 160, 270 140, 320 150 L 320 200 Z" fill="#EEF5EF" fillOpacity="0.6" />
      </svg>
    );
  }

  // DESIGN: Geometric wireframes, cursor anchor, layered intersecting circles, symmetry
  if (cat.includes("design") || cat.includes("ui") || cat.includes("ux") || cat.includes("art") || cat.includes("creative")) {
    return (
      <svg className="skill-card-bg-graphic" viewBox="0 0 320 200" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="designShapeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EEF5EF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E8F3EC" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Overlapping pair of concentric geometric rings (top right) */}
        <circle cx="270" cy="30" r="75" fill="url(#designShapeGrad)" />
        <circle cx="270" cy="30" r="95" stroke="#DDE6DF" strokeWidth="1" strokeOpacity="0.75" />
        <circle cx="240" cy="45" r="35" stroke="#238B57" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.35" />

        {/* Small designer cursor motif */}
        <path d="M 215 32 L 222 45 L 219 46 L 223 53 L 220 54 L 216 47 L 212 50 Z" fill="#14532D" fillOpacity="0.25" />

        {/* Wireframe geometric alignment guides */}
        <line x1="190" y1="20" x2="310" y2="20" stroke="#DDE6DF" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.6" />
        <line x1="285" y1="5" x2="285" y2="95" stroke="#DDE6DF" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.6" />

        {/* SkillSwap "Two Skills Connecting" Motif */}
        <g className="card-exchange-motif" transform="translate(190, 85)">
          <path d="M 10 20 C 35 40, 55 0, 80 20" stroke="#238B57" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.5" />
          <circle cx="10" cy="20" r="4.5" fill="#E8F3EC" stroke="#14532D" strokeWidth="1.2" />
          <circle cx="80" cy="20" r="4.5" fill="#E8F3EC" stroke="#238B57" strokeWidth="1.2" />
          <circle cx="45" cy="20" r="8" stroke="#14532D" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.3" />
          <circle cx="45" cy="20" r="2.5" fill="#14532D" fillOpacity="0.5" />
        </g>

        {/* Bottom right cropped curve */}
        <path d="M 250 200 C 250 165, 280 150, 320 160 L 320 200 Z" fill="#E8F3EC" fillOpacity="0.5" />
      </svg>
    );
  }

  // CONTENT & WRITING: Flowing curves, quill / quotation motifs, document lines, connected dialogue
  if (cat.includes("content") || cat.includes("write") || cat.includes("copy") || cat.includes("blog") || cat.includes("media")) {
    return (
      <svg className="skill-card-bg-graphic" viewBox="0 0 320 200" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="contentShapeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8F3EC" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FAF9F5" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Soft flowing editorial curve extending across top right */}
        <path d="M 180 0 C 230 40, 270 10, 320 50 L 320 0 Z" fill="url(#contentShapeGrad)" />
        <circle cx="285" cy="35" r="60" stroke="#DDE6DF" strokeWidth="1" strokeOpacity="0.65" />

        {/* Abstract editorial quotation / dialogue mark */}
        <path d="M 218 36 C 218 30, 224 28, 228 32 C 228 38, 222 42, 220 46 M 234 36 C 234 30, 240 28, 244 32 C 244 38, 238 42, 236 46" stroke="#14532D" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.35" />

        {/* Editorial document line guides */}
        <line x1="250" y1="35" x2="285" y2="35" stroke="#DDE6DF" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
        <line x1="250" y1="42" x2="278" y2="42" stroke="#DDE6DF" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />

        {/* SkillSwap "Two Skills Connecting" Motif */}
        <g className="card-exchange-motif" transform="translate(185, 80)">
          <path d="M 15 30 C 35 15, 65 40, 85 20" stroke="#14532D" strokeWidth="1.2" strokeDasharray="3 4" strokeOpacity="0.45" />
          <circle cx="15" cy="30" r="4" fill="#FFFFFF" stroke="#238B57" strokeWidth="1.5" />
          <circle cx="85" cy="20" r="4" fill="#FFFFFF" stroke="#14532D" strokeWidth="1.5" />
          {/* Dialogue node connector */}
          <circle cx="50" cy="26" r="2.5" fill="#238B57" fillOpacity="0.6" />
        </g>

        {/* Gentle bottom-right cropped organic wave */}
        <path d="M 220 200 C 240 170, 280 160, 320 175 L 320 200 Z" fill="#EEF5EF" fillOpacity="0.6" />
      </svg>
    );
  }

  // DEFAULT / MARKETING / OTHER: Dynamic growth trajectory, exchange network, layered arcs
  return (
    <svg className="skill-card-bg-graphic" viewBox="0 0 320 200" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="defaultShapeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8F3EC" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EEF5EF" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Partial circle extending beyond corner */}
      <circle cx="280" cy="25" r="80" fill="url(#defaultShapeGrad)" />
      <circle cx="280" cy="25" r="100" stroke="#DDE6DF" strokeWidth="1" strokeDasharray="4 5" strokeOpacity="0.7" />

      {/* Upward exchange/growth trajectory arrow */}
      <path d="M 215 50 L 235 30 M 235 30 L 225 30 M 235 30 L 235 40" stroke="#238B57" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" />

      {/* Faint micro dots cluster */}
      <circle cx="250" cy="32" r="1.5" fill="#DDE6DF" />
      <circle cx="260" cy="32" r="1.5" fill="#DDE6DF" />
      <circle cx="255" cy="42" r="1.5" fill="#DDE6DF" />

      {/* SkillSwap "Two Skills Connecting" Motif */}
      <g className="card-exchange-motif" transform="translate(185, 80)">
        <path d="M 10 25 C 40 10, 60 40, 90 25" stroke="#14532D" strokeWidth="1.2" strokeDasharray="3 4" strokeOpacity="0.45" />
        <circle cx="10" cy="25" r="4" fill="#E8F3EC" stroke="#14532D" strokeWidth="1.4" />
        <circle cx="90" cy="25" r="4" fill="#E8F3EC" stroke="#238B57" strokeWidth="1.4" />
        <circle cx="50" cy="25" r="2.5" fill="#238B57" fillOpacity="0.6" />
        <circle cx="50" cy="25" r="7" stroke="#238B57" strokeWidth="0.8" strokeOpacity="0.25" />
      </g>

      {/* Soft cropped corner shape */}
      <path d="M 240 200 C 240 165, 275 145, 320 155 L 320 200 Z" fill="#EEF5EF" fillOpacity="0.6" />
    </svg>
  );
}

export default function SkillCard({ skill, onRequest }) {
  const chips =
    skill.tags?.length > 0
      ? skill.tags
      : skill.category
      ? [skill.category]
      : [];

  const ownerName = skill.owner?.name || skill.ownerName || "Community Member";

  return (
    <div
      className="card skill-card-enhanced"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        padding: "1.35rem",
        overflow: "hidden",
      }}
    >
      {/* Category-Specific Abstract Background Ecosystem */}
      <SkillNetworkVisual category={skill.category} skillTitle={skill.title} />

      {/* Foreground Content Layer */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Category / Meta Pill */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          {(() => {
            const cat = (skill.category || "General").toLowerCase();
            const isWarm = cat === "marketing" || cat === "other" || cat === "general" || cat === "business";
            return (
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: isWarm ? "#925C08" : "var(--color-brand-primary)",
                  backgroundColor: isWarm ? "#FBF5E8" : "var(--color-accent-soft)",
                  padding: "0.2rem 0.55rem",
                  borderRadius: "var(--radius-xs)",
                  border: `1px solid ${isWarm ? "#EDD89A" : "var(--color-border-subtle)"}`,
                }}
              >
                {skill.category || "General"}
              </span>
            );
          })()}
          {skill.level && (
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
              {skill.level}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="card-title"
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "0.5rem",
            lineHeight: 1.35,
          }}
        >
          {skill.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.55,
            marginBottom: "1rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {skill.description}
        </p>

        {/* Tags */}
        {chips.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              marginBottom: "1.25rem",
            }}
          >
            {chips.map((tag) => (
              <SkillChip key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>

      {/* Footer: User & Action */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid var(--color-border-subtle)",
          paddingTop: "0.875rem",
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", minWidth: 0 }}>
          <Avatar name={ownerName} size={30} />
          <span
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {ownerName}
          </span>
        </div>

        {onRequest && (
          <button
            className="btn-primary"
            style={{
              padding: "0.45rem 0.9rem",
              fontSize: "0.8125rem",
              flexShrink: 0,
            }}
            onClick={() => onRequest(skill)}
          >
            Request Swap
          </button>
        )}
      </div>
    </div>
  );
}


