import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMySkills, deleteSkill } from "../api/skillApi";
import {
  getMyRequests,
  getMySentRequests,
  updateRequestStatus,
} from "../api/requestApi";
import {
  getMyContracts,
  completeContract,
} from "../api/contractApi";
import { useNavigate } from "react-router-dom";
import bgDash from "../assets/bgdash.png";
import ContractCard from "../components/ContractCard";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mySkills, setMySkills] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD DASHBOARD DATA ================= */
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const skills = await getMySkills();
        const incoming = await getMyRequests();
        const sent = await getMySentRequests();
        const activeContracts = await getMyContracts();

        setMySkills(skills);
        setIncomingRequests(incoming);
        setSentRequests(sent);
        setContracts(activeContracts);
      } catch (err) {
        console.error("Dashboard load error", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  /* ================= ACCEPT / REJECT REQUEST ================= */
  const handleDecision = async (id, status) => {
    try {
      await updateRequestStatus(id, status);
      setIncomingRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status } : r
        )
      );
    } catch {
      alert("Action failed");
    }
  };

  /* ================= DELETE SKILL ================= */
  const handleDeleteSkill = async (id) => {
    try {
      await deleteSkill(id);
      setMySkills((prev) =>
        prev.filter((s) => s._id !== id)
      );
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= COMPLETE CONTRACT ================= */
  const handleComplete = async (id) => {
    try {
      await completeContract(id);
      setContracts((prev) =>
        prev.filter((c) => c._id !== id)
      );
    } catch {
      alert("Failed to complete contract");
    }
  };

  if (!user) return <p>Please login</p>;
  if (loading) return <p>Loading dashboard...</p>;

  return (
    <section
      style={{
        padding: 20,
        minHeight: "100vh",
        backgroundImage: `url(${bgDash})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2>{user.name}'s Dashboard</h2>

      <button
        onClick={() => navigate("/post")}
        style={{
          marginBottom: 20,
          padding: "8px 14px",
          background: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        + Post Skill
      </button>

      {/* ================= MY SKILLS ================= */}
      <h3>My Skills</h3>
      {mySkills.length ? (
        <div className="grid">
          {mySkills.map((s) => (
            <div className="card" key={s._id}>
              <h4>{s.title}</h4>
              <button
                onClick={() => handleDeleteSkill(s._id)}
                style={{
                  marginTop: 8,
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: 4,
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No skills posted yet.</p>
      )}

      {/* ================= INCOMING REQUESTS ================= */}
      <h3 style={{ marginTop: 32 }}>Incoming Requests</h3>
      {incomingRequests.length ? (
        <div className="grid">
          {incomingRequests.map((r) => (
            <div className="card" key={r._id}>
              <h4>{r.skill?.title}</h4>
              <p>Requested by: <strong>{r.requester?.name}</strong></p>

              <p>
                Status:{" "}
                <strong style={{
                  color:
                    r.status === "accepted"
                      ? "green"
                      : r.status === "rejected"
                      ? "red"
                      : "#555",
                }}>
                  {r.status}
                </strong>
              </p>

              {r.status === "pending" && (
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => handleDecision(r._id, "accepted")}
                    style={{ background: "#22c55e", color: "#fff", padding: "6px 12px" }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision(r._id, "rejected")}
                    style={{ background: "#ef4444", color: "#fff", padding: "6px 12px" }}
                  >
                    Reject
                  </button>
                </div>
              )}

              {r.status === "accepted" && (
                <button
                  onClick={() => navigate(`/chat/${r._id}`)}
                  style={{
                    marginTop: 10,
                    background: "#4f46e5",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: 4,
                  }}
                >
                  Open Chat
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No incoming requests.</p>
      )}

      {/* ================= MY REQUESTED SKILLS ================= */}
      <h3 style={{ marginTop: 32 }}>My Requested Skills</h3>
      {sentRequests.length ? (
        <div className="grid">
          {sentRequests.map((r) => (
            <div className="card" key={r._id}>
              <h4>{r.skill?.title}</h4>
              <p>Owner: <strong>{r.owner?.name}</strong></p>
              <p>Status: <strong>{r.status}</strong></p>

              {r.status === "accepted" && (
                <button
                  onClick={() => navigate(`/chat/${r._id}`)}
                  style={{
                    marginTop: 10,
                    background: "#4f46e5",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: 4,
                  }}
                >
                  Open Chat
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>You haven’t requested any skills yet.</p>
      )}

      {/* ================= ACTIVE CONTRACTS ================= */}
      <h3 style={{ marginTop: 32 }}>Active Skill Contracts</h3>
      {contracts.length ? (
        <div className="grid">
          {contracts.map((c) => (
            <ContractCard
              key={c._id}
              contract={c}
              onComplete={handleComplete}
            />
          ))}
        </div>
      ) : (
        <p>No active contracts.</p>
      )}
    </section>
  );
}
