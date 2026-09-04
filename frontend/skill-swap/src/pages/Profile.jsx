import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSkills } from "../api/skillApi";
import Avatar from "../components/Avatar";
import { useAuth } from "../context/AuthContext";
import SkillChip from "../components/SkillChip";

export default function Profile() {
  const { id } = useParams();
  const { user } = useAuth();
  const [mySkills, setMySkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const all = await getSkills();
        const filtered = all.filter(
          (s) => s.owner === id || s.owner?._id === id
        );
        setMySkills(filtered);
      } catch (err) {
        console.error("Failed to load profile skills", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const displayName = user?.name || "Community Member";

  return (
    <div className="page-container" style={{ maxWidth: 900 }}>
      {/* Profile Summary Card */}
      <div
        className="card"
        style={{
          padding: "2rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <Avatar name={displayName} size={68} />

        <div style={{ flex: 1, minWidth: "240px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-text-primary)", margin: 0 }}>
              {displayName}
            </h1>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                padding: "0.2rem 0.55rem",
                borderRadius: "var(--radius-pill)",
                backgroundColor: "var(--color-success-bg)",
                color: "var(--color-success-text)",
                border: "1px solid var(--color-success-border)",
              }}
            >
              Verified Member
            </span>
          </div>

          <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", margin: "0 0 0.75rem 0" }}>
            Member Identifier: <code style={{ color: "var(--color-text-secondary)", fontSize: "0.8rem" }}>{id}</code>
          </p>

          <div style={{ display: "flex", gap: "1rem", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
            <span><strong>{mySkills.length}</strong> Skills Shared</span>
            <span>•</span>
            <span style={{ color: "var(--color-accent-emerald)" }}>Active in Community</span>
          </div>
        </div>
      </div>

      {/* Skills Offered Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
            Skills Offered for Exchange
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
            Competencies available for peer learning barter.
          </p>
        </div>

        {user && (user._id === id || user.id === id) && (
          <Link to="/post" className="btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.85rem" }}>
            + Offer Skill
          </Link>
        )}
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="grid">
          <div style={{ height: "140px" }} className="skeleton" />
          <div style={{ height: "140px" }} className="skeleton" />
        </div>
      ) : mySkills.length > 0 ? (
        <div className="grid">
          {mySkills.map((s) => (
            <div
              key={s._id || s.id}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1.5rem",
              }}
            >
              <div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <SkillChip label={s.category || "Skill"} />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
                  {s.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: "1.25rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--color-border-subtle)",
                  fontSize: "0.78rem",
                  color: "var(--color-accent-emerald)",
                  fontWeight: 600,
                }}
              >
                Available for Barter
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🌱</div>
          <h3 className="empty-state-title">No skill offerings published yet</h3>
          <p className="empty-state-desc">
            This member has not yet published any active skills for reciprocal exchange.
          </p>
          {user && (user._id === id || user.id === id) && (
            <Link to="/post" className="btn-primary">
              Post a Skill Offering
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

