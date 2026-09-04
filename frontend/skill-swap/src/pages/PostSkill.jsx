import { useState } from "react";
import { postSkill } from "../api/skillApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PostSkill() {
  const { user } = useAuth();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("Please login to post a skill.");
      return;
    }

    if (!title.trim() || !description.trim() || !category) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await postSkill({ title: title.trim(), description: description.trim(), category });
      nav("/browse");
    } catch (err) {
      setError("Failed to publish skill offering. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: 640 }}>
      <div className="page-header" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-accent-emerald)",
            display: "block",
            marginBottom: "0.25rem",
          }}
        >
          Knowledge Barter
        </span>
        <h1 className="page-title">Offer a Skill to the Community</h1>
        <p className="page-subtitle">
          Describe what you can teach. You will be matched with learners offering reciprocal skills.
        </p>
      </div>

      <div className="card" style={{ padding: "2.25rem" }}>
        <form onSubmit={handleSubmit}>
          {/* Skill Title */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="skill-title">Skill Headline / Title</label>
            <input
              id="skill-title"
              type="text"
              placeholder="e.g. Practical UI Systems & Design Architecture"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="skill-category">Field / Category</label>
            <select
              id="skill-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a primary domain</option>
              <option value="Programming">Programming & Software</option>
              <option value="Design">Product Design & UI/UX</option>
              <option value="Marketing">Growth & Marketing</option>
              <option value="Content">Writing & Content Strategy</option>
              <option value="Other">Other Specialized Discipline</option>
            </select>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="skill-description">Exchange Description</label>
            <textarea
              id="skill-description"
              placeholder="Provide context on your depth of experience, what formats you prefer (e.g. code reviews, paired sessions), and what topics you can cover in depth..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              style={{ resize: "vertical" }}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "0.75rem",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--color-danger-bg)",
                border: "1px solid var(--color-danger-border)",
                color: "var(--color-danger-text)",
                fontSize: "0.875rem",
                marginBottom: "1.25rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ flex: 1, padding: "0.75rem" }}
            >
              {loading ? "Publishing Offering..." : "Publish Skill Offering"}
            </button>
            <button
              type="button"
              onClick={() => nav(-1)}
              className="btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

