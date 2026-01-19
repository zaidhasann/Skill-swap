import { useState } from "react";
import { postSkill } from "../api/skillApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bgPost from "../assets/bgpost.png"; 

export default function PostSkill() {
  const { user } = useAuth();          // ✅ auth check
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

    if (!title || !description || !category) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await postSkill({ title, description, category });
      nav("/browse");
    } catch (err) {
      setError("Failed to post skill. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        
                    backgroundImage: `url(${bgPost})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 500,
          background: "#ffffff",
          padding: "2rem",
          borderRadius: 14,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Post a New Skill ✨
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Skill Title */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: 500 }}>Skill Title</label>
            <input
              type="text"
              placeholder="e.g. Web Development"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: 500 }}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select category</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Content">Content</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ fontWeight: 500 }}>Description</label>
            <textarea
              placeholder="Describe your skill in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              style={{ ...inputStyle, resize: "none" }}
            />
          </div>

          {/* Error */}
          {error && (
            <p style={{ color: "red", fontSize: 13, marginBottom: 10 }}>
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: 8,
              border: "none",
              background: loading ? "#9ca3af" : "#4f46e5",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Posting..." : "Post Skill"}
          </button>
        </form>
      </div>
    </section>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: 6,
  padding: "10px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: 14,
};
