import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSkills } from "../api/skillApi";
import Avatar from "../components/Avatar";
import { useAuth } from "../context/AuthContext";
import bgProfile from "../assets/bgprofile.png"; 

export default function Profile() {
  const { id } = useParams();           // userId from URL
  const { user } = useAuth();           // logged-in user
  const [mySkills, setMySkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const all = await getSkills();

        // ✅ filter skills by owner
        const filtered = all.filter(
          (s) => s.owner === id || s.owner?._id === id
        );

        setMySkills(filtered);
      } catch (err) {
        console.error("Failed to load skills");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url(${bgProfile})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
        
      }}
    >
      <div style={{ width: "100%", maxWidth: 900 }}>
        {/* Profile Header */}
        <div
          style={{
            background: "#ffffff",
            padding: "1.5rem",
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* Avatar */}
          <Avatar name={user?.name || "User"} />

          <div>
            <h2 style={{ marginBottom: "0.25rem" }}>
              {user?.name || "User Profile"}
            </h2>
            <p style={{ color: "#666", fontSize: 14 }}>
              User ID: <strong>{id}</strong>
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div
          style={{
            background: "#ffffff",
            padding: "1.5rem",
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>Skills Offered</h3>

          {loading ? (
            <p>Loading skills...</p>
          ) : mySkills.length ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1rem",
              }}
            >
              {mySkills.map((s) => (
                <div
                  key={s._id || s.id}
                  style={{
                    padding: "1rem",
                    borderRadius: 10,
                    border: "1px solid #e5e7eb",
                    background: "#fafafa",
                  }}
                >
                  <h4 style={{ marginBottom: "0.5rem" }}>{s.title}</h4>
                  <p style={{ fontSize: 14, color: "#555" }}>
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#777", fontSize: 14 }}>
              No skills added yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
