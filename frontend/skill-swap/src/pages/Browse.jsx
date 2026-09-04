import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SkillCard from "../components/SkillCard";
import { getSkills } from "../api/skillApi";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";
import { sendSkillRequest } from "../api/requestApi";

export default function Browse() {
  const [skills, setSkills] = useState([]);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    (async () => {
      try {
        const data = await getSkills(search);
        setSkills(data);
      } catch {
        setToast({ type: "error", message: "Failed to load skills" });
      }
    })();
  }, [search]);

  const requestSkill = (skill) => {
    if (!user) {
      setToast({ type: "error", message: "Please login to request a skill exchange." });
      return;
    }
    setSelected(skill);
  };

  const sendRequest = async () => {
    try {
      await sendSkillRequest(selected._id);
      setToast({ type: "success", message: "Exchange request sent successfully!" });
      setSelected(null);
    } catch (err) {
      const msg = err.response?.data?.message || "Request submission failed";
      setToast({ type: "error", message: msg });
    }
  };

  // Filter skills by category client-side if selected
  const categories = ["All", "Programming", "Design", "Marketing", "Content", "Other"];
  const filteredSkills = selectedCategory === "All"
    ? skills
    : skills.filter(s => s.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 className="page-title">
            {search ? `Results for "${search}"` : "Discover Skill Offerings"}
          </h1>
          <p className="page-subtitle">
            Find peers with complementary expertise ready for structured skill trades.
          </p>
        </div>

        <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
          {filteredSkills.length} {filteredSkills.length === 1 ? "offering" : "offerings"} available
        </span>
      </div>

      {/* Category Pills */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "0.5rem",
          marginBottom: "1.75rem",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "var(--radius-pill)",
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              border: `1px solid ${selectedCategory === cat ? "var(--color-brand-primary)" : "var(--color-border-subtle)"}`,
              backgroundColor: selectedCategory === cat ? "var(--color-brand-primary)" : "var(--color-surface)",
              color: selectedCategory === cat ? "#ffffff" : "var(--color-text-secondary)",
              transition: "all var(--transition-fast)",
              whiteSpace: "nowrap",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill Cards Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid">
          {filteredSkills.map((s) => (
            <SkillCard key={s._id} skill={s} onRequest={requestSkill} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">No matching skills found</h3>
          <p className="empty-state-desc">
            Try adjusting your search query or explore a different category.
          </p>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="btn-secondary"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      {/* Request Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)}>
        <div style={{ marginBottom: "1.25rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--color-accent-emerald)",
            }}
          >
            Skill Swap Proposal
          </span>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)", marginTop: "0.25rem" }}>
            {selected?.title}
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "0.5rem", lineHeight: 1.5 }}>
            {selected?.description}
          </p>
        </div>

        <div
          style={{
            padding: "1rem",
            backgroundColor: "var(--color-bg-page)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border-subtle)",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginBottom: "0.25rem" }}>
            Offering Partner
          </div>
          <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
            {selected?.owner?.name || "Community Member"}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <button
            onClick={() => setSelected(null)}
            className="btn-ghost"
          >
            Cancel
          </button>
          <button
            onClick={sendRequest}
            className="btn-primary"
          >
            Send Swap Proposal
          </button>
        </div>
      </Modal>

      {/* Notification Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

